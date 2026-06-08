import { useState } from "react";
import { X, Phone, MapPin, User, AlertCircle } from "lucide-react";
import { T, BANK, fmt, entryTotal, buildMessage, type CartEntry } from "../data";

interface Props {
  cart: CartEntry[];
  onClose: () => void;
}

export default function CheckoutModal({ cart, onClose }: Props) {
  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("");
  const [address, setAddress] = useState("");
  const [error,   setError]   = useState("");

  const total = cart.reduce((s,e) => s + entryTotal(e), 0);

  function place() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in all fields to continue.");
      return;
    }
    window.open(buildMessage(cart, name.trim(), phone.trim(), address.trim()), "_blank");
    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/35 backdrop-blur-sm z-[80]" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] max-w-[92vw] bg-white rounded-2xl z-[90] shadow-2xl flex flex-col max-h-[92vh] animate-slideIn">

        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor:T.line }}>
          <div>
            <h3 className="font-extrabold text-[18px]" style={{ color:T.ink }}>Complete Your Order</h3>
            <p className="text-[12px] mt-0.5" style={{ color:T.subtle }}>Enter your details — we'll prepare your message</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:T.surface }}>
            <X size={16} style={{ color:T.mid }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

          {/* order summary */}
          <div className="rounded-xl p-4" style={{ background:T.surface, border:`1px solid ${T.line}` }}>
            <p className="text-[11px] font-extrabold tracking-[2px] uppercase mb-3" style={{ color:T.mid }}>Order Summary</p>
            <div className="space-y-1.5">
              {cart.map(e => (
                <div key={e.key} className="flex justify-between items-start text-[13px] gap-2">
                  <span style={{ color:T.mid }}>
                    {e.qty}× {e.item.name}
                    {e.addons.length ? ` + ${e.addons.map(a=>a.name).join(", ")}` : ""}
                  </span>
                  <span className="font-bold flex-shrink-0" style={{ color:T.ink }}>{fmt(entryTotal(e))}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t" style={{ borderColor:T.line }}>
              <span className="font-bold text-[13px]" style={{ color:T.mid }}>Total</span>
              <span className="font-extrabold text-[18px]" style={{ color:T.brand }}>{fmt(total)}</span>
            </div>
          </div>

          {/* payment info */}
          <div className="rounded-xl p-4" style={{ background:"#fff8f0", border:`1px solid #fed7aa` }}>
            <p className="text-[11px] font-extrabold tracking-[2px] uppercase mb-2" style={{ color:"#c2410c" }}>Payment Details</p>
            <p className="text-[13px] leading-[1.8]" style={{ color:"#9a3412" }}>
              Transfer <strong>{fmt(total)}</strong> to:<br />
              Bank: <strong>{BANK.name}</strong><br />
              Account No: <strong>{BANK.account}</strong><br />
              Account Name: <strong>{BANK.holder}</strong>
            </p>
            <p className="text-[12px] mt-2 font-semibold" style={{ color:"#c2410c" }}>
              Send your transfer receipt on WhatsApp to confirm your order.
            </p>
          </div>

          {/* form fields */}
          <div className="space-y-3">
            <p className="text-[11px] font-extrabold tracking-[2px] uppercase" style={{ color:T.mid }}>Your Details</p>
            {[
              { label:"Full Name",        value:name,    set:setName,    placeholder:"e.g. Amaka Okafor",               Icon:User  },
              { label:"Phone Number",     value:phone,   set:setPhone,   placeholder:"e.g. 08012345678",                Icon:Phone },
              { label:"Delivery Address", value:address, set:setAddress, placeholder:"e.g. Block C, Room 14, FUTO Hostel", Icon:MapPin },
            ].map(({ label, value, set, placeholder, Icon }) => (
              <div key={label}>
                <label className="block text-[12px] font-bold mb-1.5" style={{ color:T.mid }}>{label}</label>
                <div className="flex items-center gap-2.5 px-3.5 rounded-xl border h-11 focus-within:border-brand transition-colors"
                  style={{ borderColor:T.line }}>
                  <Icon size={15} style={{ color:T.subtle }} strokeWidth={2} />
                  <input value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                    className="flex-1 text-[14px] outline-none bg-transparent"
                    style={{ color:T.ink }} />
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background:"#fef2f2", border:`1px solid #fca5a5` }}>
              <AlertCircle size={15} style={{ color:"#ef4444" }} />
              <p className="text-[13px] font-semibold" style={{ color:"#dc2626" }}>{error}</p>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="px-5 py-4 border-t flex-shrink-0" style={{ borderColor:T.line }}>
          <button onClick={place}
            className="w-full py-3.5 rounded-xl text-white font-bold text-[14px] flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 shadow-pink"
            style={{ background:T.brand }}>
            <Phone size={16} /> Send Order on WhatsApp
          </button>
          <p className="text-center text-[11px] mt-2.5" style={{ color:T.subtle }}>
            Your complete order opens in WhatsApp — just tap Send.
          </p>
        </div>
      </div>
    </>
  );
}
