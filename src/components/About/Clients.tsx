import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const clientLogos = [
  { id: 1, type: "private" },
  { id: 2, type: "government" },
  { id: 3, type: "private" },
  { id: 4, type: "government" },
  { id: 5, type: "private" },
  { id: 6, type: "government" },
  { id: 7, type: "private" },
  { id: 8, type: "government" },
  { id: 9, type: "private" },
  { id: 10, type: "government" },
];

export default function Clients() {
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
    filter === "all" ? clientLogos : clientLogos.filter((logo) => logo.type === filter);

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 py-16 bg-[var(--primary-black)] font-theme">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-[var(--secondary-yellow)] text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-slide-down">
          Clients
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 border border-theme rounded-full font-medium transition-all cursor-pointer ${
              filter === "all"
                ? "bg-theme text-[var(--primary-black)]"
                : "text-theme hover:bg-theme hover-text-dark"
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter("private")}
            className={`px-5 py-2 border border-theme rounded-full font-medium transition-all cursor-pointer ${
              filter === "private"
                ? "bg-theme text-[var(--primary-black)]"
                : "text-theme hover:bg-theme hover-text-dark"
            }`}
          >
            Private
          </button>
          <button
            onClick={() => setFilter("government")}
            className={`px-5 py-2 border border-theme rounded-full font-medium transition-all cursor-pointer ${
              filter === "government"
                ? "bg-theme text-[var(--primary-black)]"
                : "text-theme hover:bg-theme hover-text-dark"
            }`}
          >
            Government
          </button>
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