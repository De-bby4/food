import { Leaf, Zap, BadgeDollarSign } from "lucide-react";
import { T } from "../data";

const CARDS = [
  { Icon:Leaf,            bg:"#fef2f2", ic:"#ef4444", title:"Always Fresh",   desc:"Every order cooked fresh. No reheating, no shortcuts — hot every time." },
  { Icon:Zap,             bg:"#fffbeb", ic:"#d97706", title:"Quick Service",  desc:"Fast hands, no long waits. Your food is ready before hunger wins." },
  { Icon:BadgeDollarSign, bg:"#f0fdf4", ic:"#16a34a", title:"Great Prices",   desc:"Premium taste at student-friendly prices. Good food at the right price." },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20 px-5 md:px-8">
      <div className="max-w-[1060px] mx-auto text-center">
        <p className="text-[11px] font-extrabold tracking-[3px] uppercase mb-2" style={{ color:T.brand }}>Why Choose Us</p>
        <h2 className="font-extrabold tracking-tight mb-3" style={{ fontSize:"clamp(24px,3.5vw,40px)", color:T.ink }}>
          More than just food
        </h2>
        <p className="text-[15px] mb-14 max-w-sm mx-auto" style={{ color:T.subtle }}>
          We care about every plate, every order, every customer.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map(({ Icon, bg, ic, title, desc }) => (
            <div key={title} className="p-7 rounded-2xl border text-left hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ borderColor:T.line }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background:bg }}>
                <Icon size={22} style={{ color:ic }} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[16px] mb-2" style={{ color:T.ink }}>{title}</h3>
              <p className="text-[14px] leading-[1.75]" style={{ color:T.subtle }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
