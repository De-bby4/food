import { Phone, MapPin } from "lucide-react";
import { T, WA_NUMBER } from "../data";

export default function Cta() {
  return (
    <section className="py-16 md:py-20 px-5 md:px-8" style={{ background:T.brand }}>
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-white font-extrabold tracking-tight mb-3" style={{ fontSize:"clamp(28px,4vw,44px)" }}>
          Ready to order?
        </h2>
        <p className="text-white/70 text-[15px] leading-relaxed mb-8">
          Fresh food, fast delivery, right here on campus. Place your order in minutes.
        </p>
        <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white font-bold text-[15px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ color:T.brand }}>
          <Phone size={16} /> +234 708 828 2915
        </a>
        <p className="text-white/50 text-[12px] mt-5 flex items-center justify-center gap-1">
          <MapPin size={12} /> Federal University of Technology, Owerri
        </p>
      </div>
    </section>
  );
}
