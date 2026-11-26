import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { categories } from "../data";
import { useShop } from "../shop";

function Mark({ className = "text-white" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <rect x="1" y="1" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6.2 11h6.2M10.6 8.2 13.6 11l-3 2.8" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[16px] font-semibold tracking-[-0.04em]">aftercart</span>
    </span>
  );
}

export function Logo({ tone = "light" }) {
  return (
    <Link to="/" className="shrink-0" aria-label="AfterCart home">
      <Mark className={tone === "light" ? "text-white" : "text-ink"} />
    </Link>
  );
}

function SearchForm({ className = "", autoFocus = false }) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const q = value.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} className={className} role="search">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.4 10.4 13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What are you looking for today?"
          className="h-10 w-full rounded-lg border-0 bg-white pl-10 pr-4 text-[14px] text-ink outline-none ring-leaf placeholder:text-[#9a9a9a] focus:ring-2"
        />
      </label>
    </form>
  );
}

export function Nav() {
  const { card } = useShop();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
    setProfile(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function onDoc(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfile(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const item = ({ isActive }) => (isActive ? "nav-link" : "nav-link");

  return (
    <header className="sticky top-0 z-40 bg-nav text-white">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-5 lg:grid-cols-[1fr_minmax(280px,460px)_1fr] lg:px-8">
        <div className="flex items-center gap-6">
          <Logo />
          <button
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <SearchForm className="col-span-2 hidden lg:col-span-1 lg:block" />

        <nav className="hidden items-center justify-end gap-5 lg:flex" aria-label="Primary">
          <NavLink to="/" end className={item} data-active={location.pathname === "/" ? "true" : "false"}>
            Home
          </NavLink>
          <div className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
            <NavLink to="/categories" className="nav-link inline-flex items-center gap-1" data-active={location.pathname.startsWith("/categor") ? "true" : "false"}>
              Categories
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </NavLink>
            {menu && (
              <div className="absolute right-0 top-full z-20 w-64 pt-4">
                <div className="border border-line bg-white py-2 text-ink shadow-none">
                  {categories.map((category) => (
                    <Link key={category.id} to={`/category/${category.id}`} className="block px-4 py-2.5 text-[14px] hover:bg-paper">
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <NavLink to="/brands" className="nav-link" data-active={location.pathname.startsWith("/brands") ? "true" : "false"}>
            Brands
          </NavLink>
          <NavLink to="/ask" className="nav-link inline-flex items-center gap-1.5" data-active={location.pathname.startsWith("/ask") ? "true" : "false"}>
            <span className="text-[15px] font-medium leading-none text-leaf">+</span>
            Ask AfterCart
          </NavLink>
          <Link to="/ask" className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-leaf">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-leaf" />
            </span>
            AGENT LIVE
          </Link>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfile((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2a2a2a] text-white"
              aria-label="Account"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5.5" r="2.2" stroke="white" strokeWidth="1.3" />
                <path d="M3.4 13.2c.8-2 2.4-3 4.6-3s3.8 1 4.6 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            {profile && (
              <div className="absolute right-0 top-12 w-64 border border-line bg-white p-2 text-ink">
                <div className="px-3 py-2">
                  <p className="text-[14px] font-semibold">Maya Krishnan</p>
                  <p className="mt-0.5 text-[12px] text-mute">Paying with {card.name}</p>
                </div>
                <Link to="/account" className="block rounded px-3 py-2 text-[14px] hover:bg-paper">
                  Payment preference
                </Link>
                <Link to="/orders" className="block rounded px-3 py-2 text-[14px] hover:bg-paper">
                  Orders
                </Link>
                <Link to="/about" className="block rounded px-3 py-2 text-[14px] hover:bg-paper">
                  About this prototype
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className={`${open ? "block" : "hidden"} border-t border-white/10 px-5 py-4 lg:hidden`}>
        <SearchForm />
        <div className="mt-4 flex flex-col gap-3 text-[15px]">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/ask">Ask AfterCart</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/account">Payment preference</Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Logo tone="dark" />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-mute">
            A personal shopping agent for the price you actually pay, and what happens after checkout.
          </p>
        </div>
        <div>
          <p className="text-[12px] font-medium text-mute">Company</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li><Link to="/about" className="hover:text-leaf">About</Link></li>
            <li><Link to="/orders" className="hover:text-leaf">Orders</Link></li>
            <li><Link to="/ask" className="hover:text-leaf">Ask AfterCart</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-medium text-mute">Prototype</p>
          <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed">
            <li>Ramaiah Institute of Technology</li>
            <li>wHACKiest 2026 · Track 2</li>
            <li className="text-mute">Beyond the Browser</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1120px] px-5 py-4 text-[12px] text-mute md:px-8">
          Illustrative catalog, offers and orders. AfterCart does not store card numbers, and it does not submit a return unless you approve it.
        </p>
      </div>
    </footer>
  );
}

export function Page({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <main>{children}</main>;
}
