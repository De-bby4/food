import { Utensils } from "lucide-react";
import { T } from "../data";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
      <div className="rounded-xl flex items-center justify-center"
        style={{ width:compact?32:36, height:compact?32:36, background:T.brand }}>
        <Utensils size={compact?16:18} color="white" strokeWidth={2.5} />
      </div>
      <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:compact?14:16, color:T.ink, letterSpacing:0.5 }}>
        Crave<span style={{ color:T.brand }}>4</span>More
      </span>
    </a>
  );
}
