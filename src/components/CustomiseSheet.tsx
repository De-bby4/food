import { useState } from "react";
import { X, Check } from "lucide-react";
import { T, ADDONS, CAT_STYLE, fmt, type Item, type Addon } from "../data";

interface Props {
  item: Item;
  onConfirm: (addons: Addon[]) => void;
  onClose: () => void;
}

export default function CustomiseSheet({ item, onConfirm, onClose }: Props) {
  const [sel, setSel] = useState<Set<string>>(new Set());

  const toggle = (a: Addon) => setSel(p => {
    const n = new Set(p);
    n.has(a.id) ? n.delete(a.id) : n.add(a.id);
    return n;
  });

  const chosen = ADDONS.filter(a => sel.has(a.id));
  const total  = item.price + chosen.reduce((s,a) => s + a.price, 0);
  const cs     = CAT_STYLE[item.cat] ?? CAT_STYLE.extras;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[80]" onClick={onClose} />
      <div className="fixed bottom-0 inset-x-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px] bg-white rounded-t-3xl md:rounded-2xl z-[90] shadow-2xl flex flex-col max-h-[85vh] animate-slideIn">

        {/* drag handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background:T.line }} />
        </div>

        {/* header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b" style={{ borderColor:T.line }}>
          <div>
            <h3 className="font-extrabold text-[17px]" style={{ color:T.ink }}>Customise Your Order</h3>
            <p className="text-[12px] mt-0.5" style={{ color:T.subtle }}>Add extras before adding to cart</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:T.surface }}>
            <X size={16} style={{ color:T.mid }} />
          </button>
        </div>

        {/* selected item */}
        <div className="mx-5 mt-4 flex items-center gap-3 p-3.5 rounded-xl" style={{ background:T.surface, border:`1px solid ${T.line}` }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:cs.bg }}>
            <cs.Icon size={20} style={{ color:cs.iconColor }} strokeWidth={1.6} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[13px] truncate" style={{ color:T.ink }}>{item.name}</p>
            <p className="font-extrabold text-[13px]" style={{ color:T.brand }}>{fmt(item.price)}</p>
          </div>
        </div>

        {/* add-ons */}
        <div className="px-5 flex-1 overflow-y-auto pb-2">
          <p className="text-[11px] font-extrabold tracking-[2px] uppercase mt-4 mb-3" style={{ color:T.mid }}>
            Add Extras <span className="font-semibold normal-case tracking-normal" style={{ color:T.subtle }}>(optional)</span>
          </p>
          <div className="space-y-2">
            {ADDONS.map(addon => {
              const on = sel.has(addon.id);
              return (
                <button key={addon.id} onClick={() => toggle(addon)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left"
                  style={{ borderColor:on?T.brand:T.line, background:on?`${T.brand}05`:"white" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                      style={{ background:on?T.brand:"white", borderColor:on?T.brand:T.line }}>
                      {on && <Check size={11} color="white" strokeWidth={3.5} />}
                    </div>
                    <span className="font-semibold text-[14px]" style={{ color:T.ink }}>{addon.name}</span>
                  </div>
                  <span className="font-extrabold text-[14px]" style={{ color:on?T.brand:T.mid }}>+{fmt(addon.price)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div className="px-5 py-4 border-t" style={{ borderColor:T.line }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-bold" style={{ color:T.subtle }}>Item total</span>
            <span className="font-extrabold text-[18px]" style={{ color:T.ink }}>{fmt(total)}</span>
          </div>
          <button onClick={() => onConfirm(chosen)}
            className="w-full py-3.5 rounded-xl text-white font-bold text-[14px] transition-all hover:-translate-y-0.5 shadow-pink"
            style={{ background:T.brand }}>
            Add to Cart — {fmt(total)}
          </button>
        </div>
      </div>
    </>
  );
}
