import { Leaf, Zap, BadgeDollarSign, MapPin } from "lucide-react";
import { T } from "../data";

export default function TrustStrip() {
  const items = [
    { Icon: Leaf,            label: "Fresh to Order"  },
    { Icon: Zap,             label: "Fast Service"    },
    { Icon: BadgeDollarSign, label: "Student Prices"  },
    { Icon: MapPin,          label: "Campus Delivery" },
  ];
  return (
    <div className="border-y" style={{ background: T.surface, borderColor: T.line }}>
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 py-4 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {items.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon size={14} style={{ color: T.brand }} strokeWidth={2.5} />
            <span className="text-[13px] font-bold" style={{ color: T.mid }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
