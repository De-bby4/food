import { Utensils } from "lucide-react";
import { T } from "../data";

export default function Splash({ exiting }: { exiting: boolean }) {
  return (
    <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white transition-all duration-500 ${exiting ? "opacity-0 scale-[1.02]" : ""}`}>
      <div className="animate-scaleIn flex flex-col items-center gap-4" style={{ animationDelay:"0.2s" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-pink" style={{ background:T.brand }}>
          <Utensils size={32} color="white" strokeWidth={2} />
        </div>
        <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:28, color:T.ink, letterSpacing:1 }}>
          Crave<span style={{ color:T.brand }}>4</span>More
        </span>
      </div>
      <p className="mt-3 text-sm italic animate-fadeIn" style={{ color:T.subtle, animationDelay:"1s" }}>
        Can't get enough of it's goodness...
      </p>
      <div className="absolute bottom-0 inset-x-0 h-0.5" style={{ background:T.line }}>
        <div className="h-full animate-fillBar" style={{ background:T.brand, animationDelay:"0.8s" }} />
      </div>
    </div>
  );
}
