import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import { T } from "../data";

interface Props { cartCount: number; onCart: () => void }

export default function Navbar({ cartCount, onCart }: Props) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(scrollY > 40);
    addEventListener("scroll", fn);
    return () => removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 h-16 flex items-center justify-between px-5 md:px-8 transition-all duration-300 ${solid ? "bg-white/96 backdrop-blur-xl border-b" : ""}`}
      style={{ borderColor: solid ? T.line : "transparent" }}>
      <Logo />
      <div className="flex items-center gap-6">
        {[["#menu","Menu"],["#how","How it Works"],["#about","About"]].map(([h, l]) => (
          <a key={h} href={h} className="hidden md:block text-[13px] font-bold transition-colors hover:text-brand"
            style={{ color: T.subtle }}>{l}</a>
        ))}
        <button onClick={onCart}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: T.surface }} aria-label="Open cart">
          <ShoppingCart size={18} style={{ color: T.mid }} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full text-white text-[10px] font-extrabold flex items-center justify-center"
              style={{ background: T.brand }}>{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
