import { useState, useEffect } from "react";
import { type Item, type Addon, type CartEntry } from "./data";

import Splash        from "./components/Splash";
import Navbar        from "./components/Navbar";
import Hero          from "./components/Hero";
import TrustStrip    from "./components/TrustStrip";
import MenuSection   from "./components/MenuSection";
import HowItWorks    from "./components/HowItWorks";
import About         from "./components/About";
import CartDrawer    from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
// import FloatingBar   from "./components/FloatingBar";
import Cta           from "./components/Cta";
import Footer        from "./components/Footer";

export default function App() {
  const [phase,    setPhase]    = useState<"splash" | "exit" | "ready">("splash");
  const [cart,     setCart]     = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setPhase("exit"),  2200);
    const b = setTimeout(() => setPhase("ready"), 2700);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  function addDirect(item: Item) { addWithExtras(item, []); }
  function addWithExtras(item: Item, addons: Addon[]) {
    const key = `${item.id}::${addons.map(a => a.id).sort().join(",")}`;
    setCart(p => {
      const ex = p.find(e => e.key === key);
      return ex
        ? p.map(e => e.key === key ? { ...e, qty: e.qty + 1 } : e)
        : [...p, { key, item, addons, qty: 1 }];
    });
  }
  function removeOne(item: Item) {
    setCart(p => {
      const entries = p.filter(e => e.item.id === item.id);
      if (!entries.length) return p;
      const last = entries[entries.length - 1];
      return p.map(e => e.key === last.key ? { ...e, qty: e.qty - 1 } : e).filter(e => e.qty > 0);
    });
  }
  const removeEntry = (key: string) => setCart(p => p.filter(e => e.key !== key));
  const qtyUp       = (key: string) => setCart(p => p.map(e => e.key === key ? { ...e, qty: e.qty + 1 } : e));
  const qtyDown     = (key: string) => setCart(p => p.map(e => e.key === key ? { ...e, qty: e.qty - 1 } : e).filter(e => e.qty > 0));

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Nunito',sans-serif" }}>
      {phase !== "ready" && <Splash exiting={phase === "exit"} />}
      {phase === "ready" && (
        <>
          <Navbar cartCount={cart.reduce((s,e) => s+e.qty, 0)} onCart={() => setCartOpen(true)} />
          <Hero />
          <TrustStrip />
          <MenuSection cart={cart} onAdd={addDirect} onRemoveOne={removeOne} onAddWithExtras={addWithExtras} />
          <HowItWorks />
          <About />
          <Cta />
          <Footer />
         
          <CartDrawer
            cart={cart} open={cartOpen}
            onClose={() => setCartOpen(false)}
            onCheckout={() => setCheckout(true)}
            onRemove={removeEntry} onUp={qtyUp} onDown={qtyDown}
          />
          {checkout && <CheckoutModal cart={cart} onClose={() => setCheckout(false)} />}
        </>
      )}
    </div>
  );
}