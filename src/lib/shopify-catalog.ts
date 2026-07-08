import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest } from "@/lib/shopify";

export type ShopifyImage = { url: string; altText: string | null };
export type ShopifyVariantLite = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
};
export type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  description: string;
  productType: string;
  featuredImage: ShopifyImage | null;
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariantLite }> };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

const PRODUCTS_QUERY = `
  query GummiesDuo($first: Int!, $query: String) {
    products(first: $first, query: $query, sortKey: TITLE) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          description
          productType
          featuredImage { url altText }
          images(first: 6) { edges { node { url altText } } }
          variants(first: 3) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
              }
            }
          }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      description
      productType
      featuredImage { url altText }
      images(first: 8) { edges { node { url altText } } }
      variants(first: 5) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
          }
        }
      }
      priceRange { minVariantPrice { amount currencyCode } }
    }
  }
`;

// Sanitiza el título de Shopify quitando el prefijo "S-π-C" y sufijo "· Gummies Duo"
export function cleanTitle(raw: string): string {
  return raw
    .replace(/^S-π-C\s*/i, "")
    .replace(/\s*·\s*Gummies Duo\s*$/i, "")
    .trim();
}

async function fetchGummiesDuo(): Promise<ShopifyProductNode[]> {
  const res = await storefrontApiRequest<{
    products: { edges: Array<{ node: ShopifyProductNode }> };
  }>(PRODUCTS_QUERY, { first: 20, query: "product_type:'Gummies Duo'" });
  return res?.data?.products?.edges.map((e) => e.node) ?? [];
}

async function fetchByHandle(handle: string): Promise<ShopifyProductNode | null> {
  const res = await storefrontApiRequest<{ product: ShopifyProductNode | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  return res?.data?.product ?? null;
}

export function useShopifyProducts() {
  return useQuery({
    queryKey: ["shopify-products", "gummies-duo"],
    queryFn: fetchGummiesDuo,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: () => fetchByHandle(handle),
    staleTime: 1000 * 60 * 5,
    enabled: !!handle,
    refetchOnWindowFocus: false,
  });
}

export function formatPrice(p: { amount: string; currencyCode: string }): string {
  const n = parseFloat(p.amount);
  const symbol = p.currencyCode === "MXN" || p.currencyCode === "USD" ? "$" : "";
  return `${symbol}${n.toFixed(2)} ${p.currencyCode}`;
}
