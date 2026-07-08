import { useEffect } from "react";
import { X, Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useCartStore((s) => s.items);
  const isLoading = useCartStore((s) => s.isLoading);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const syncCart = useCartStore((s) => s.syncCart);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce(
    (s, i) => s + parseFloat(i.price.amount) * i.quantity,
    0,
  );
  const currency = items[0]?.price.currencyCode || "MXN";

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col bg-amarillo-suave text-negro shadow-[-8px_0_24px_rgba(0,0,0,0.4)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b-2 border-negro/10 px-5 py-4">
          <div>
            <h2 className="font-display text-2xl tracking-wider">TU CARRITO</h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-negro/60">
              {totalItems === 0
                ? "Vacío"
                : `${totalItems} artículo${totalItems !== 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="rounded-full p-2 transition hover:bg-negro/10"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-3 h-12 w-12 text-negro/40" />
              <p className="font-semibold text-negro/70">Tu carrito está vacío.</p>
              <p className="mt-1 text-sm text-negro/50">Añade algo picante 🌶️</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-3 rounded-xl bg-white/70 p-3 shadow-[3px_3px_0_#CA8A04]"
                >
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-white">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display truncate text-base tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-xs text-negro/60">{item.variantTitle}</p>
                    <p className="mt-1 font-bold">
                      {item.price.currencyCode}{" "}
                      {parseFloat(item.price.amount).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => removeItem(item.variantId)}
                      aria-label={`Quitar ${item.title}`}
                      className="rounded p-1 text-negro/60 transition hover:bg-negro/10 hover:text-negro"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        aria-label="Disminuir"
                        className="grid h-6 w-6 place-items-center rounded border border-negro/20 hover:bg-negro/10"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        aria-label="Aumentar"
                        className="grid h-6 w-6 place-items-center rounded border border-negro/20 hover:bg-negro/10"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t-2 border-negro/10 bg-amarillo-suave px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-xl tracking-wide">TOTAL</span>
              <span className="text-xl font-black">
                {currency} {totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="font-display flex w-full items-center justify-center gap-2 rounded-full bg-negro py-3 text-lg tracking-widest text-amarillo shadow-[4px_4px_0_#CA8A04] transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <ExternalLink className="h-4 w-4" />
                  IR AL CHECKOUT
                </>
              )}
            </button>
            <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-negro/50">
              Pago seguro en Shopify
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}
