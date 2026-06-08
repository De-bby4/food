import { T } from "../data";

const STEPS = [
  { n:"01", title:"Browse the menu",    desc:"Pick from Spaghetti, Chicken & Chips, Indomie, Drinks, or Extras." },
  { n:"02", title:"Customise your dish",desc:"Add extra proteins or egg to any main dish before adding to cart." },
  { n:"03", title:"Enter your details", desc:"Tell us your name, phone number, and delivery address." },
  { n:"04", title:"Send on WhatsApp",   desc:"Your full order is ready — just tap Send. We start cooking immediately!" },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 md:py-20 px-5 md:px-8 border-y" style={{ background:T.surface, borderColor:T.line }}>
      <div className="max-w-[1120px] mx-auto">
        <p className="text-[11px] font-extrabold tracking-[3px] uppercase mb-2" style={{ color:T.brand }}>How it Works</p>
        <h2 className="font-extrabold tracking-tight mb-12" style={{ fontSize:"clamp(24px,3vw,38px)", color:T.ink }}>
          Order in 4 easy steps
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-[calc(100%-12px)] w-[calc(100%-24px)] h-px" style={{ background:T.line }} />
              )}
              <div className="w-10 h-10 rounded-xl font-extrabold text-[13px] flex items-center justify-center mb-4 relative z-10"
                style={{ background:`${T.brand}12`, color:T.brand }}>{s.n}</div>
              <h3 className="font-bold text-[15px] mb-1.5" style={{ color:T.ink }}>{s.title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color:T.subtle }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
