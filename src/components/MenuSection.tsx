import { useState } from "react";
import { T, CATS, ITEMS, CUSTOMISABLE, type Item, type CartEntry } from "../data";
import ItemCard from "./ItemCard";
import CustomiseSheet from "./CustomiseSheet";
import type { Addon } from "../data";

interface Props {
  cart: CartEntry[];
  onAdd: (item: Item) => void;
  onRemoveOne: (item: Item) => void;
  onAddWithExtras: (item: Item, addons: Addon[]) => void;
}

export default function MenuSection({ cart, onAdd, onRemoveOne, onAddWithExtras }: Props) {
  const [cat, setCat]         = useState("all");
  const [custom, setCustom]   = useState<Item | null>(null);

  const items       = cat === "all" ? ITEMS : ITEMS.filter(i => i.cat === cat);
  const totalQtyFor = (item: Item) => cart.filter(e => e.item.id === item.id).reduce((s,e) => s + e.qty, 0);

  function handleAdd(item: Item) {
    if (CUSTOMISABLE.has(item.cat)) setCustom(item);
    else onAdd(item);
  }

  return (
    <section id="menu" className="py-16 md:py-20 px-5 md:px-8">
      <div className="max-w-[1120px] mx-auto">

        {/* heading */}
        <p className="text-[11px] font-extrabold tracking-[3px] uppercase mb-2" style={{ color:T.brand }}>Our Menu</p>
        <h2 className="font-extrabold tracking-tight mb-1" style={{ fontSize:"clamp(26px,3.5vw,42px)", color:T.ink }}>
          What are you craving?
        </h2>
        <p className="text-[15px] mb-8" style={{ color:T.subtle }}>
          Tap <strong style={{ color:T.ink }}>Choose &amp; Add</strong> on any dish to customise with extras.
        </p>

        {/* category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-6">
          {CATS.map(({ id, label, Icon }) => {
            const active = cat === id;
            return (
              <button key={id} onClick={() => setCat(id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all border"
                style={{ background:active?T.brand:"white", color:active?"white":T.mid, borderColor:active?T.brand:T.line }}>
                <Icon size={14} strokeWidth={active?2.5:2} />
                {label}
              </button>
            );
          })}
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <ItemCard key={item.id} item={item}
              totalQty={totalQtyFor(item)}
              onAdd={() => handleAdd(item)}
              onRemoveOne={() => onRemoveOne(item)} />
          ))}
        </div>
      </div>

      {/* customise sheet */}
      {custom && (
        <CustomiseSheet
          item={custom}
          onConfirm={addons => { onAddWithExtras(custom, addons); setCustom(null); }}
          onClose={() => setCustom(null)} />
      )}
    </section>
  );
}
