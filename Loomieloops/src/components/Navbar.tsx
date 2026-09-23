import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { YarnMark } from "./Yarn";
import { useCart } from "../cart";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/collections/anime", label: "Collections" },
  { to: "/custom", label: "Custom" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar({ onSearch }: { onSearch: () => void }) {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const home = location.pathname === "/";

  useEffect(() => setMenu(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !home || menu;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-cream/85 shadow-sm backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button className="lg:hidden" onClick={() => setMenu((v) => !v)} aria-label="Menu">
          {menu ? <X /> : <Menu />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <YarnMark className="h-8 w-8" />
          <span className="font-display text-lg font-bold tracking-tight sm:text-xl">Loomieloops</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-neon-pink ${
                  isActive ? "text-neon-pink" : "text-ink/80"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={onSearch} aria-label="Search" className="rounded-full p-2 hover:bg-white/70">
            <Search size={18} />
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Cart"
            className="relative rounded-full p-2 hover:bg-white/70"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-neon-pink px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menu && (
        <div className="border-t border-ink/5 bg-cream/95 px-6 py-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="font-display text-2xl font-bold">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
