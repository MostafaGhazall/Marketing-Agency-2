import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "/logo2.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isArabic = lang === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-50 text-secondary-orange ${fontClass}`}>
      <div className="flex items-center justify-between px-8 py-6 relative z-50 bg-transparent">
        {/* Logo */}
        <Link to="/" className="w-24 h-auto block">
          <img src={logo} alt="Mashab Logo" className="w-full object-contain" />
        </Link>

        {/* Lang & Menu Icon */}
        <div className={`flex items-center gap-6 text-base font-semibold text-white ${fontClass}`}>
          <div className="space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => changeLanguage("en")}
              className={`transform transition-transform hover:scale-110 cursor-pointer ${
                lang === "en" ? "text-theme" : ""
              }`}
            >
              ENG
            </button>
            <span>|</span>
            <button
              onClick={() => changeLanguage("ar")}
              className={`transform transition-transform hover:scale-110 cursor-pointer mr-1.5 ${
                lang === "ar" ? "text-theme" : ""
              }`}
            >
              AR
            </button>
          </div>

          {/* Burger Icon Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl transition-transform duration-300 cursor-pointer"
            aria-label="Menu"
          >
            {menuOpen ? <RxCross2 className="rotate-90" /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 top-0 w-full bg-[var(--primary-black)] text-theme px-8 pt-[100px] pb-6 shadow-lg animate-slide-down z-40 ${fontClass}`}
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
};

export default Navbar;
