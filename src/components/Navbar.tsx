import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import logo from "/logo2.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ───────── current route ───────── */
  const { pathname } = useLocation();
  const isHome = pathname === "/" || /^\/(en|ar)\/?$/.test(pathname);

  /* ───────── LTR / RTL ───────── */
  const isArabic  = lang === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  };

  /* keep <html> attrs in sync */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  /* close dropdown when clicking outside */
  useEffect(() => {
    const outside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  /* ───────── position decided per-route ───────── */
  const positionClass = isHome
    ? "fixed top-0 left-0"
    : "absolute top-0 left-0";

  return (
    <header
      className={`
        w-full z-50 bg-transparent text-secondary-orange
        ${positionClass} ${fontClass}
      `}
    >
      <div className="flex items-center justify-between px-8 py-3 relative z-50 bg-transparent">
        {/* Logo */}
        <Link to="/" className="w-18 h-auto block mt-2">
          <img src={logo} alt="Mashab Logo" className="w-full object-contain" />
        </Link>

        {/* Lang & Burger */}
        <div className={`flex items-center gap-6 text-base font-semibold text-white ${fontClass}`}>
          <div className="space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => changeLanguage("en")}
              className={`transition hover:scale-110 cursor-pointer ${lang === "en" ? "text-theme" : ""}`}
            >
              ENG
            </button>
            <span>|</span>
            <button
              onClick={() => changeLanguage("ar")}
              className={`transition hover:scale-110 mr-1.5 cursor-pointer ${lang === "ar" ? "text-theme" : ""}`}
            >
              AR
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-4xl transition-transform duration-300 cursor-pointer"
            aria-label="Menu"
          >
            {menuOpen ? <RxCross2 className="rotate-90" /> : <HiOutlineMenuAlt3 className={`${isArabic ? "scale-x-[-1]" : ""}`}/>}
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 top-0 w-full bg-[var(--primary-black)] text-theme px-8 pt-[110px] pb-8 shadow-lg animate-slide-down z-40 ${fontClass}`}
        >
          <ul className="flex flex-col gap-6 text-2xl font-medium">
            {[
              { name: t("nav.home"),    to: "/"       },
              { name: t("nav.about"),   to: "/about"  },
              { name: t("nav.contact"), to: "/contact"},
            ].map(item => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
