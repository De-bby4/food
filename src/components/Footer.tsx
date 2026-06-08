import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { T, WA_NUMBER } from "../data";

export default function Footer() {
  return (
    <footer className="px-5 md:px-8 py-10" style={{ background:T.ink }}>
      <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <Logo compact />
        <p className="text-[12px]" style={{ color:"rgba(255,255,255,0.25)" }}>
          © 2026 Crave 4 More · Futo, Owerri
        </p>
        <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold transition-colors hover:text-white"
          style={{ color:T.brand }}>
          Order on WhatsApp <ArrowRight size={12} />
        </a>
      </div>
    </footer>
  );
}
