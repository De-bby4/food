import { ShoppingCart } from "lucide-react";
import { T, fmt, entryTotal, type CartEntry } from "../data";

interface Props { cart: CartEntry[]; onClick: () => void }

export default function FloatingBar({ cart, onClick }: Props) {
  const count = cart.reduce((s, e) => s + e.qty, 0);
  const total = cart.reduce((s, e) => s + entryTotal(e), 0);
  if (!count) return null;

  return (
    /* Hidden on desktop — sidebar cart is always visible there */
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl text-white font-bold text-[14px] transition-all hover:-translate-y-0.5 animate-pop"
      style={{ background: T.brand, boxShadow: "0 8px 32px rgba(232,29,99,0.35)" }}
    >
      <ShoppingCart size={18} strokeWidth={2.5} />
      <span>{count} item{count > 1 ? "s" : ""}</span>
      <span className="w-px h-4 bg-white/30" />
      <span>{fmt(total)}</span>
    </button>
  );
}