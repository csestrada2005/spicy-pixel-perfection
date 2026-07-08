import { toast } from "sonner";
import { Check, X } from "lucide-react";

export function showCartToast({
  title,
  image,
  onView,
}: {
  title: string;
  image?: string;
  onView: () => void;
}) {
  toast.custom(
    (id) => (
      <div
        className="flex w-[340px] max-w-[92vw] items-center gap-3 rounded-2xl border-2 border-negro bg-amarillo p-3 shadow-[6px_6px_0_#000]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-negro text-amarillo">
          <Check className="h-5 w-5" />
        </div>
        {image ? (
          <img
            src={image}
            alt=""
            className="h-12 w-12 shrink-0 rounded-md bg-white object-contain p-1"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm uppercase tracking-widest text-negro/70">
            Añadido al carrito
          </p>
          <p className="truncate font-display text-base tracking-wide text-negro">
            {title}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <button
            type="button"
            onClick={() => {
              toast.dismiss(id);
              onView();
            }}
            className="rounded-full bg-negro px-3 py-1 font-display text-xs tracking-widest text-amarillo hover:-translate-y-0.5 transition"
          >
            VER
          </button>
          <button
            type="button"
            onClick={() => toast.dismiss(id)}
            aria-label="Cerrar"
            className="text-negro/60 hover:text-negro"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    ),
    { duration: 3500 },
  );
}

// Bus simple para abrir el drawer desde cualquier lado (toast, add-to-cart en cards, etc.)
type Listener = () => void;
const listeners = new Set<Listener>();
export const cartUI = {
  open: () => listeners.forEach((l) => l()),
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};
