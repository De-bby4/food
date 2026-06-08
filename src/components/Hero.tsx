import { MapPin, Phone, ArrowRight, ImageIcon } from "lucide-react";
import { T, WA_NUMBER } from "../data";

export default function Hero() {
  return (
    <section className="pt-[88px] pb-10 md:pt-28 md:pb-16 px-5 md:px-8">
      <div className="max-w-[1120px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* image placeholder */}
        <div className="order-first lg:order-last animate-fadeUp" style={{ animationDelay:"0.15s" }}>
          <div className="w-full rounded-3xl flex flex-col items-center justify-center gap-5 border overflow-hidden"
            style={{ background:T.surface, borderColor:T.line, minHeight:420, padding:"48px 32px" }}>
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{ background:`${T.brand}12` }}>
              <ImageIcon size={44} style={{ color:T.brand }} strokeWidth={1.2} />
            </div>
            <div className="text-center max-w-xs">
              <p className="font-extrabold text-[18px] mb-2" style={{ color:T.ink }}>Add your food photo here</p>
              <p className="text-[14px] leading-relaxed" style={{ color:T.subtle }}>
                Drop in a great shot of your best dish and watch the orders come in
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full max-w-[240px] opacity-25">
              {[...Array(6)].map((_,i) => (
                <div key={i} className="aspect-square rounded-lg" style={{ background:T.line }} />
              ))}
            </div>
          </div>
        </div>

        {/* text */}
        <div className="animate-fadeUp" style={{ animationDelay:"0.05s" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-[1.5px] uppercase mb-6"
            style={{ background:`${T.brand}10`, color:T.brand, border:`1px solid ${T.brand}20` }}>
            <MapPin size={11} strokeWidth={3} /> Futo Campus, Owerri
          </div>
          <h1 className="font-extrabold leading-[1.08] tracking-tight mb-5"
            style={{ fontSize:"clamp(38px,5.5vw,64px)", color:T.ink }}>
            Fresh Food,<br /><span style={{ color:T.brand }}>Made for You.</span>
          </h1>
          <p className="text-[16px] leading-[1.8] max-w-[420px] mb-8" style={{ color:T.subtle }}>
            Spaghetti, chicken&nbsp;&amp;&nbsp;chips, indomie, and cold drinks — prepared fresh every single order.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[14px] font-bold transition-all hover:-translate-y-0.5 shadow-pink"
              style={{ background:T.brand }}>
              Browse Menu <ArrowRight size={16} />
            </a>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold border-2 transition-all hover:text-brand"
              style={{ color:T.ink, borderColor:T.line }}>
              <Phone size={15} /> WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
