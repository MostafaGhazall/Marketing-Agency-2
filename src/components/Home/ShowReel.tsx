import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const categories = [
  "ALL",
  "Long Term Partnership",
  "360 Campaigns",
  "Strategy Work",
  "Video Based Campaigns",
  "Key Visual Campaigns",
  "Brand Activation",
  "Seasonal Campaigns",
];

const showReelItems = [
  {
    title: "He Walks The Talk",
    image: "/showreel/reel1.jpg",
    link: "/reel/he-walks-the-talk",
    category: "360 Campaigns",
  },
  {
    title: "You Find Saudi Made",
    image: "/showreel/reel2.jpg",
    link: "/reel/you-find-saudi-made",
    category: "Strategy Work",
  },
  {
    title: "With You Through Out The Journey",
    image: "/showreel/reel3.jpg",
    link: "/reel/with-you-through-out",
    category: "Video Based Campaigns",
  },
  {
    title: "Saudis Our True Wealth",
    image: "/showreel/reel4.jpg",
    link: "/reel/true-wealth",
    category: "Long Term Partnership",
  },
  {
    title: "Master The Language",
    image: "/showreel/reel5.jpg",
    link: "/reel/master-language",
    category: "Key Visual Campaigns",
  },
  {
    title: "Emkan From Everywhere",
    image: "/showreel/reel6.jpg",
    link: "/reel/emkan",
    category: "Brand Activation",
  },
  {
    title: "Follow the Insight",
    image: "/showreel/reel7.jpg",
    link: "/reel/follow-insight",
    category: "Strategy Work",
  },
  {
    title: "Beyond the Vision",
    image: "/showreel/reel8.jpg",
    link: "/reel/beyond-vision",
    category: "360 Campaigns",
  },
  {
    title: "From Riyadh to the World",
    image: "/showreel/reel9.jpg",
    link: "/reel/riyadh-to-world",
    category: "Seasonal Campaigns",
  },
  {
    title: "To The World",
    image: "/showreel/reel10.jpg",
    link: "/reel/to-the-world",
    category: "Seasonal Campaigns",
  },
  {
    title: "10 Years of Pizza",
    image: "/showreel/reel1.jpg",
    link: "/reel/beyond-pizza",
    category: "360 Campaigns",
  },
  {
    title: "Speak Englsih Like the Movies",
    image: "/showreel/reel2.jpg",
    link: "/reel/movies",
    category: "Seasonal Campaigns",
  },
  {
    title: "Living The Summer With You",
    image: "/showreel/reel13.jpg",
    link: "/reel/to-the-summer",
    category: "Seasonal Campaigns",
  },
];

export default function ShowReelSection() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const filteredItems =
    selectedCategory === "ALL"
      ? showReelItems
      : showReelItems.filter((x) => x.category === selectedCategory);

  const spanClass = (i: number): string => {
    const manualMap: Record<number, string> = {
      0: "col-start-4 col-span-2 row-start-1 row-span-2", // div1
      1: "col-start-3 row-start-1", // div2
      2: "col-start-3 row-start-2", // div3
      3: "col-start-2 row-start-1", // div4
      4: "col-start-2 row-start-2", // div5
      5: "col-start-5 row-start-3", // div6
      6: "col-start-4 row-start-3", // div7
      7: "col-start-2 col-span-2 row-start-3", // div8
      8: "col-start-4 col-span-2 row-start-4 row-span-2", // div9
      9: "col-start-3 row-start-4", // div10
      10: "col-start-3 row-start-5", // div11
      11: "col-start-2 row-start-4", // div12
      12: "col-start-2 row-start-5", // div13
    };

    return manualMap[i] || ""; // fallback to default layout if no match
  };

  return (
    <section
      className={`bg-[var(--primary-black)] text-theme px-4 md:px-8 pb-20 overflow-x-hidden ${fontClass}`}
    >
      <motion.h2
        className="text-center text-3xl md:text-6xl font-bold mb-10 mt-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        {t("home.showreel.title")}
      </motion.h2>

      <motion.div
        className="flex flex-col gap-12 items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <div
          className="flex flex-wrap justify-center gap-2"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`border border-theme px-4 py-2 rounded-lg text-sm md:text-base transition cursor-pointer
                ${
                  selectedCategory === cat
                    ? "bg-[var(--primary-light)] text-black"
                    : "text-theme bg-transparent hover:shadow-[inset_0_0_20px_rgba(255,238,212,0.6)]"
                }`}
            >
              {t(`home.showreel.categories.${cat}`)}
            </button>
          ))}
        </div>

        <div
          className="grid auto-rows-[170px] sm:auto-rows-[220px] lg:auto-rows-[260px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 w-full gap-4 auto-flow-dense"
          dir="ltr"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.link}
              onClick={() => navigate(item.link)}
              className={`relative cursor-pointer overflow-hidden rounded-xl ${spanClass(
                i
              )}`}
              initial="rest"
              whileHover="hover"
              animate="rest"
              transition={{ duration: 0.3 }}
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.02 },
              }}
            >
              {/* the image */}
              <motion.img
                src={item.image}
                alt={t(`home.showreel.items.${item.title}`)}
                className="w-full h-full object-cover"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.05 },
                }}
                transition={{ duration: 0.3 }}
              />

              {/* the black dimming overlay */}
              <motion.div
                className="absolute inset-0 bg-black"
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 0.3 },
                }}
                transition={{ duration: 0.3 }}
              />

              {/* title on top */}
              <span
                className={`absolute bottom-4 ${
                  isArabic ? "right-6 text-right" : "left-6 text-left"
                } z-10 font-bold text-lg md:text-xl drop-shadow`}
              >
                {t(`home.showreel.items.${item.title}`)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
