import { Utensils, UtensilsCrossed, Soup, ChefHat, Coffee, Egg } from "lucide-react";
import type { ElementType } from "react";

/* ── CONFIG ─────────────────────────────────────────────────── */
export const WA_NUMBER = "2347088282915";

export const BANK = {
  name:    "Access Bank",   // ← update with real bank
  account: "0123456789",    // ← update with real account number
  holder:  "Crave 4 More",
};

/* ── DESIGN TOKENS ──────────────────────────────────────────── */
export const T = {
  brand:  "#e81d63",
  brandDk:"#c4134f",
  bg:     "#ffffff",
  surface:"#f9f5f6",
  ink:    "#1c1017",
  mid:    "#4a3540",
  subtle: "#8c7480",
  line:   "#ede8eb",
};

/* ── TYPES ──────────────────────────────────────────────────── */
export interface Item    { id:string; cat:string; name:string; price:number; tag?:string }
export interface Addon   { id:string; name:string; price:number }
export interface CartEntry { key:string; item:Item; qty:number; addons:Addon[] }

/* ── MENU CATEGORIES ────────────────────────────────────────── */
export const CATS: { id:string; label:string; Icon:ElementType }[] = [
  { id:"all",       label:"All",             Icon:Utensils        },
  { id:"spaghetti", label:"Spaghetti",       Icon:Soup            },
  { id:"chicken",   label:"Chicken & Chips", Icon:ChefHat         },
  { id:"indomie",   label:"Indomie",         Icon:UtensilsCrossed },
  { id:"drinks",    label:"Drinks",          Icon:Coffee          },
  { id:"extras",    label:"Extras",          Icon:Egg             },
];

/* ── MENU ITEMS ─────────────────────────────────────────────── */
export const ITEMS: Item[] = [
  { id:"sp-maxi",    cat:"spaghetti", name:"Spaghetti + Maxi Chicken",       price:3500, tag:"Popular"     },
  { id:"sp-mid",     cat:"spaghetti", name:"Spaghetti + Mid Chicken",        price:2800                    },
  { id:"sp-big",     cat:"spaghetti", name:"Spaghetti — Big Pack",           price:2000                    },
  { id:"sp-sm",      cat:"spaghetti", name:"Spaghetti — Small Pack",         price:1500                    },
  { id:"ch-crunch",  cat:"chicken",   name:"Crunchy Fried Chicken & Chips",  price:6500, tag:"Best Seller" },
  { id:"ch-grill",   cat:"chicken",   name:"Grilled Chicken & Chips",        price:7000                    },
  { id:"ch-pepper",  cat:"chicken",   name:"Fried Peppered Chicken & Chips", price:5500                    },
  { id:"in-maxi",    cat:"indomie",   name:"Indomie + Maxi Chicken",        price:3500                    },
  { id:"in-mid",     cat:"indomie",   name:"Indomie + Mid Chicken",         price:2800                    },
  { id:"in-big",     cat:"indomie",   name:"Indomie — Big Pack",            price:1500                    },
  { id:"in-sm",      cat:"indomie",   name:"Indomie — Small Pack",          price:1000                    },
  { id:"dk-chivita", cat:"drinks",    name:"Chivita Juice (Big)",           price:500                     },
  { id:"dk-fanta",   cat:"drinks",    name:"Fanta Orange",                  price:300                     },
  { id:"dk-nutri",   cat:"drinks",    name:"Nutri Milk",                    price:400                     },
  { id:"ex-beef",    cat:"extras",    name:"Beef",                          price:300                     },
  { id:"ex-begg",    cat:"extras",    name:"Boiled Egg",                    price:300                     },
  { id:"ex-fegg",    cat:"extras",    name:"Fried Egg",                     price:500                     },
];

/* ── ADD-ONS ────────────────────────────────────────────────── */
export const ADDONS: Addon[] = [
  { id:"ad-maxi", name:"Extra Maxi Chicken", price:1500 },
  { id:"ad-mid",  name:"Extra Mid Chicken",  price:800  },
  { id:"ad-beef", name:"Beef",               price:300  },
  { id:"ad-begg", name:"Boiled Egg",         price:300  },
  { id:"ad-fegg", name:"Fried Egg",          price:500  },
];

/* ── CUSTOMISABLE CATEGORIES ────────────────────────────────── */
export const CUSTOMISABLE = new Set(["spaghetti","chicken","indomie"]);

/* ── CATEGORY VISUAL STYLES ─────────────────────────────────── */
export const CAT_STYLE: Record<string,{bg:string;iconColor:string;Icon:ElementType}> = {
  spaghetti: { bg:"#fff0f5", iconColor:"#e81d63", Icon:Soup            },
  chicken:   { bg:"#fffbeb", iconColor:"#d97706", Icon:ChefHat         },
  indomie:   { bg:"#ecfdf5", iconColor:"#059669", Icon:UtensilsCrossed },
  drinks:    { bg:"#eff6ff", iconColor:"#2563eb", Icon:Coffee          },
  extras:    { bg:"#f5f3ff", iconColor:"#7c3aed", Icon:Egg             },
};

/* ── UTILITIES ──────────────────────────────────────────────── */
export const fmt = (n:number) => "₦" + n.toLocaleString();

export const entryTotal = (e:CartEntry) =>
  (e.item.price + e.addons.reduce((s,a) => s + a.price, 0)) * e.qty;

export function buildMessage(cart:CartEntry[], name:string, phone:string, address:string) {
  const lines = cart.map(e => {
    const xtra = e.addons.length ? `\n   Extras: ${e.addons.map(a=>a.name).join(", ")}` : "";
    return `• ${e.qty}× ${e.item.name} — ${fmt(entryTotal(e))}${xtra}`;
  });
  const total = cart.reduce((s,e) => s + entryTotal(e), 0);
  const msg = [
    `Hello Crave 4 More! 👋`,
    ``,
    `📋 ORDER SUMMARY`,
    `─────────────────`,
    ...lines,
    `─────────────────`,
    `Total: *${fmt(total)}*`,
    ``,
    `📍 DELIVERY DETAILS`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    ``,
    `💳 PAYMENT`,
    `Please transfer *${fmt(total)}* to:`,
    `Bank: ${BANK.name}`,
    `Account: ${BANK.account}`,
    `Name: ${BANK.holder}`,
    ``,
    `Reply with your *transfer receipt* to confirm your order. Thank you! 🙏`,
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
