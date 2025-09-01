import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const clientLogos = [
  { id: 1, type: "private" },
  { id: 2, type: "private" },
  { id: 3, type: "government" },
  { id: 4, type: "government" },
  { id: 5, type: "private" },
  { id: 6, type: "private" },
  { id: 7, type: "government" },
  { id: 8, type: "government" },
  { id: 9, type: "government" },
  { id: 10, type: "private" },
];

export default function Clients() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";
  const [isTouch, setIsTouch] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const logoVariants: Variants = {
    initial: {
      scale: 1,
      filter: "grayscale(100%)",
    },
    hover: {
      scale: 1.05,
      filter: "grayscale(0%)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    tap: {
      scale: 0.98,
    },
  };

  const filteredLogos =
    filter === "all"
      ? clientLogos
      : clientLogos.filter((logo) => logo.type === filter);

  return (
    <section className={`w-full px-4 sm:px-6 md:px-10 bg-[var(--primary-black)] ${fontClass}`}>
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-theme text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-slide-down">
          {t("about.clients.title")}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["all", "private", "government"].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2 border border-theme rounded-lg font-medium transition-all cursor-pointer ${
                filter === key
                  ? "bg-theme text-[var(--primary-black)]"
                  : "text-theme bg-transparent hover:shadow-[inset_0_0_20px_rgba(234,100,46,0.6)]"
              }`}
            >
              {t(`about.clients.filters.${key}`)}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 px-2 justify-items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {filteredLogos.map((logo) => (
          <motion.div
            key={logo.id}
            variants={logoVariants}
            initial="initial"
            whileHover={!isTouch ? "hover" : undefined}
            whileTap={!isTouch ? "tap" : undefined}
            className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] p-4 flex items-center justify-center"
          >
            <img
              src={`/clients/client${logo.id}.png`}
              alt={`Client ${logo.id}`}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
