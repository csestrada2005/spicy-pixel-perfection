import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "iutpgz-pp.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "a9e300d3633fd3947d22525df7e43fad";

export type ShopifyMoney = { amount: string; currencyCode: string };

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: Array<{ name: string; value: string }>;
  image?: { url: string; altText: string | null } | null;
  product: {
    id: string;
    title: string;
    handle: string;
    featuredImage?: { url: string; altText: string | null } | null;
  };
};

export async function storefrontApiRequest<T = any>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<{ data?: T; errors?: Array<{ message: string }> } | undefined> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Se requiere plan de pago", {
      description:
        "El acceso a Shopify requiere un plan activo. Visita https://admin.shopify.com para actualizar.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`Shopify HTTP ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(
      `Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`,
    );
  }
  return data;
}

// ── Product variant lookup by handle ────────────────────────────────
const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      featuredImage { url altText }
      variants(first: 1) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
            image { url altText }
          }
        }
      }
    }
  }
`;

export async function fetchFirstVariantByHandle(handle: string): Promise<ShopifyVariant | null> {
  const res = await storefrontApiRequest<{
    product: {
      id: string;
      title: string;
      handle: string;
      featuredImage: { url: string; altText: string | null } | null;
      variants: { edges: Array<{ node: Omit<ShopifyVariant, "product"> }> };
    } | null;
  }>(PRODUCT_BY_HANDLE_QUERY, { handle });

  const product = res?.data?.product;
  if (!product) return null;
  const node = product.variants.edges[0]?.node;
  if (!node) return null;
  return {
    ...node,
    product: {
      id: product.id,
      title: product.title,
      handle: product.handle,
      featuredImage: product.featuredImage,
    },
  };
}

// ── Cart mutations ──────────────────────────────────────────────────
const CART_QUERY = `
  query cart($id: ID!) { cart(id: $id) { id totalQuantity } }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

type UserErr = { field: string[] | null; message: string };
function isCartNotFoundError(userErrors: UserErr[]): boolean {
  return userErrors.some(
    (e) =>
      e.message.toLowerCase().includes("cart not found") ||
      e.message.toLowerCase().includes("does not exist"),
  );
}

export async function createShopifyCart(
  variantId: string,
  quantity: number,
): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest<any>(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });
  const errs = data?.data?.cartCreate?.userErrors || [];
  if (errs.length > 0) {
    console.error("Cart creation failed:", errs);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  const lineId = cart?.lines?.edges?.[0]?.node?.id;
  if (!cart?.checkoutUrl || !lineId) return null;
  return {
    cartId: cart.id,
    checkoutUrl: formatCheckoutUrl(cart.checkoutUrl),
    lineId,
  };
}

export async function addLineToShopifyCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<any>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });
  const errs: UserErr[] = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length > 0) {
    console.error("Add line failed:", errs);
    return { success: false };
  }
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find(
    (l: { node: { id: string; merchandise: { id: string } } }) =>
      l.node.merchandise.id === variantId,
  );
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<any>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const errs: UserErr[] = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length > 0) {
    console.error("Update line failed:", errs);
    return { success: false };
  }
  return { success: true };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<any>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });
  const errs: UserErr[] = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length > 0) {
    console.error("Remove line failed:", errs);
    return { success: false };
  }
  return { success: true };
}

export async function fetchCartStatus(
  cartId: string,
): Promise<{ exists: boolean; totalQuantity: number } | null> {
  const data = await storefrontApiRequest<any>(CART_QUERY, { id: cartId });
  if (!data) return null;
  const cart = data?.data?.cart;
  if (!cart) return { exists: false, totalQuantity: 0 };
  return { exists: true, totalQuantity: cart.totalQuantity };
}
