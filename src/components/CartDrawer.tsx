import { ShoppingCart, X, Minus, Plus, Phone } from "lucide-react";
import { T, CAT_STYLE, fmt, entryTotal, type CartEntry } from "../data";

interface Props {
  cart: CartEntry[];
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  onRemove: (key: string) => void;
  onUp: (key: string) => void;
  onDown: (key: string) => void;
}

export default function CartDrawer({ cart, open, onClose, onCheckout, onRemove, onUp, onDown }: Props) {
  const total = cart.reduce((s,e) => s + entryTotal(e), 0);
  const count = cart.reduce((s,e) => s + e.qty, 0);
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[60]" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-[420px] max-w-[92vw] bg-white z-[70] flex flex-col animate-slideIn"
        style={{ boxShadow:"0 0 60px rgba(0,0,0,0.15)" }}>

        {/* header */}
        <div className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0" style={{ borderColor:T.line }}>
          <div>
            <h2 className="font-extrabold text-[17px]" style={{ color:T.ink }}>Your Cart</h2>
            <p className="text-[11px]" style={{ color:T.subtle }}>{count} item{count !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:T.surface }}>
            <X size={15} style={{ color:T.mid }} />
          </button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background:T.surface }}>
                <ShoppingCart size={26} style={{ color:T.subtle }} strokeWidth={1.5} />
              </div>
              <p className="font-bold" style={{ color:T.ink }}>Your cart is empty</p>
              <p className="text-sm" style={{ color:T.subtle }}>Add items from the menu to get started</p>
            </div>
          ) : cart.map(e => {
            const { Icon } = CAT_STYLE[e.item.cat] ?? CAT_STYLE.extras;
            const unitPrice = e.item.price + e.addons.reduce((s,a) => s+a.price, 0);
            return (
              <div key={e.key} className="p-4 rounded-xl border" style={{ borderColor:T.line }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:CAT_STYLE[e.item.cat]?.bg }}>
                    <Icon size={18} style={{ color:CAT_STYLE[e.item.cat]?.iconColor }} strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[13px] leading-snug" style={{ color:T.ink }}>{e.item.name}</p>
                    {e.addons.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {e.addons.map(a => (
                          <span key={a.id} className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                            style={{ background:`${T.brand}10`, color:T.brand }}>+{a.name}</span>
                        ))}
                      </div>
                    )}
                    <p className="font-extrabold text-[14px] mt-1" style={{ color:T.brand }}>{fmt(entryTotal(e))}</p>
                  </div>
                  <button onClick={() => onRemove(e.key)} style={{ color:T.subtle }}>
                    <X size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor:T.line }}>
                  <span className="text-[12px]" style={{ color:T.subtle }}>{fmt(unitPrice)} × {e.qty}</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => onDown(e.key)} className="w-7 h-7 rounded-lg bg-white border flex items-center justify-center" style={{ borderColor:T.line }}>
                      <Minus size={12} strokeWidth={2.5} style={{ color:T.ink }} />
                    </button>
                    <span className="w-6 text-center text-[13px] font-extrabold" style={{ color:T.ink }}>{e.qty}</span>
                    <button onClick={() => onUp(e.key)} className="w-7 h-7 rounded-lg text-white flex items-center justify-center" style={{ background:T.brand }}>
                      <Plus size={12} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t flex-shrink-0" style={{ borderColor:T.line }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold" style={{ color:T.subtle }}>Order Total</span>
              <span className="font-extrabold text-[22px]" style={{ color:T.ink }}>{fmt(total)}</span>
            </div>
            <button onClick={() => { onClose(); onCheckout(); }}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-white font-bold text-[14px] transition-all hover:-translate-y-0.5 shadow-pink"
              style={{ background:T.brand }}>
              <Phone size={16} /> Place Order
            </button>
            <p className="text-center text-[11px] mt-2.5" style={{ color:T.subtle }}>
              You'll enter your delivery details on the next step.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
