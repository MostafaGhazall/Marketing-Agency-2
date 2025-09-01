import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import logo from "/logo2.png";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const [lang, setLang] = useState(i18n.language || "en");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/" || /^\/(en|ar)\/?$/.test(pathname);
  const isArabic = lang === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  // keep <html> attrs in sync
  useEffect(() => {
    document.documentElement.lang = lang;
    document.dir = isArabic ? "rtl" : "ltr";
  }, [lang, isArabic]);

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // close dropdown on outside click / Esc
  useEffect(() => {
    const outside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  const positionClass = isHome ? "fixed top-0 inset-x-0" : "sticky top-0";

  return (
    <header
      className={`
        ${positionClass} z-50 bg-transparent
        ${fontClass}
      `}
      style={{
        // iOS notch padding
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      {/* bar */}
      <div
        className={`
          mx-auto w-full
          flex items-center justify-between
          px-4 sm:px-6 md:px-8
          py-2 sm:py-3
        `}
      >
        {/* Logo: clamp height so it doesn't overflow on small phones */}
        <Link to="/" className="block shrink-0" aria-label="Home">
          <img
            src={logo}
            alt="Mashab Logo"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain"
            draggable={false}
          />
        </Link>

        {/* Right cluster: language + burger */}
        <div className="flex items-center gap-3 sm:gap-5 text-white">
          {/* Lang switch compact pills */}
          <div
            className={`
              flex items-center rounded-full bg-black/25 backdrop-blur px-2 py-1
              text-xs sm:text-sm font-semibold
            `}
          >
            <button
              onClick={() => changeLanguage("en")}
              className={`px-2 py-0.5 rounded-full cursor-pointer transition
                          ${
                            lang === "en"
                              ? "bg-white/15 text-lang-active"
                              : "hover:text-[var(--primary-dark)]"
                          }`}
            >
              ENG
            </button>
            <span className="mx-1.5 opacity-60">|</span>
            <button
              onClick={() => changeLanguage("ar")}
              className={`px-2 py-0.5 rounded-full cursor-pointer transition
                          ${
                            lang === "ar"
                              ? "bg-white/15 text-lang-active"
                              : "hover:text-[var(--primary-dark)]"
                          }`}
            >
              AR
            </button>
          </div>

          {/* Burger with large tap target */}
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="relative grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-md active:scale-95 transition cursor-pointer"
            aria-label={
              menuOpen
                ? t("nav.close", "Close menu")
                : t("nav.open", "Open menu")
            }
          >
            {menuOpen ? (
              <RxCross2 className="text-2xl sm:text-3xl rotate-90" />
            ) : (
              <HiOutlineMenuAlt3
                className={`text-2xl sm:text-3xl ${
                  isArabic ? "scale-x-[-1]" : ""
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 top-0 w-full bg-[var(--primary-black)] text-theme px-8 pt-[70px] pb-8 shadow-lg animate-slide-down z-40 ${fontClass}`}
        >
          <ul className="flex flex-col gap-6 text-2xl font-medium">
            {[
              { name: t("nav.home"), to: "/" },
              { name: t("nav.about"), to: "/about" },
              { name: t("nav.contact"), to: "/contact" },
            ].map((item) => (
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
}
