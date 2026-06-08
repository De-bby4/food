import { Minus, Plus } from "lucide-react";
import { T, CAT_STYLE, CUSTOMISABLE, fmt, type Item } from "../data";

interface Props {
  item: Item;
  totalQty: number;
  onAdd: () => void;
  onRemoveOne: () => void;
}

export default function ItemCard({ item, totalQty, onAdd, onRemoveOne }: Props) {
  const cs = CAT_STYLE[item.cat] ?? CAT_STYLE.extras;
  return (
    <div className="bg-white flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{ border:`1px solid ${T.line}` }}>

      {/* image / icon area */}
      <div className="relative aspect-[4/3] flex flex-col items-center justify-center gap-2"
        style={{ background:cs.bg }}>
        <cs.Icon size={44} style={{ color:cs.iconColor }} strokeWidth={1.4} />
        <span className="text-[11px] font-bold tracking-wide"
          style={{ color:cs.iconColor, opacity:0.7 }}>
          {item.cat.charAt(0).toUpperCase() + item.cat.slice(1)}
        </span>
        {item.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-white text-[10px] font-extrabold tracking-wide"
            style={{ background:T.brand }}>{item.tag}</span>
        )}
        {CUSTOMISABLE.has(item.cat) && (
          <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold border"
            style={{ background:"rgba(255,255,255,0.85)", color:T.mid, borderColor:"rgba(255,255,255,0.6)" }}>
            + Extras
          </span>
        )}
      </div>

      {/* details */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-[14px] font-bold leading-snug mb-1" style={{ color:T.ink }}>{item.name}</p>
        <p className="text-[18px] font-extrabold mb-4" style={{ color:T.brand }}>{fmt(item.price)}</p>
        <div className="mt-auto">
          {totalQty === 0 ? (
            <button onClick={onAdd}
              className="w-full py-2.5 rounded-xl text-white text-[13px] font-bold transition-colors hover:opacity-90"
              style={{ background:T.brand }}>
              {CUSTOMISABLE.has(item.cat) ? "Choose & Add" : "+ Add to Cart"}
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-xl p-1"
              style={{ background:`${T.brand}10` }}>
              <button onClick={onRemoveOne}
                className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border transition-colors"
                style={{ borderColor:T.line }}>
                <Minus size={14} style={{ color:T.ink }} strokeWidth={2.5} />
              </button>
              <span className="font-extrabold text-[16px]" style={{ color:T.brand }}>{totalQty}</span>
              <button onClick={onAdd}
                className="w-9 h-9 rounded-lg text-white flex items-center justify-center transition-colors hover:opacity-90"
                style={{ background:T.brand }}>
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
