import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const categories = [
  "ALL",
  "Long Term Partnership",
  "Strategy Work",
  "Video Based Campaigns",
  "Brand Activation",
  "Seasonal Campaigns",
];

type Orientation = "portrait" | "landscape";

interface ReelItem {
  title: string;
  image: string;
  link: string;
  category: string;
  videoUrl: string;
  orientation: Orientation;
}

export const showReelItems: ReelItem[] = [
  {
    title: "I'm Hungry",
    image: "/showreel/reel2.png",
    link: "/reel/i'm-hungry",
    category: "Brand Activation",
    videoUrl: "https://player.vimeo.com/video/1099040126?h=94ccb201aa",
    orientation: "portrait",
  },
  {
    title: "Buhari",
    image: "/showreel/reel1.png",
    link: "/reel/buhari",
    category: "Brand Activation",
    videoUrl: "https://player.vimeo.com/video/1099040380?h=8f84abd150",
    orientation: "portrait",
  },
  {
    title: "Mada Elebtsama",
    image: "/showreel/reel8.png",
    link: "/reel/mada-elebtsama",
    category: "Seasonal Campaigns",
    videoUrl: "https://player.vimeo.com/video/1099041988?h=a642dfce45",
    orientation: "landscape",
  },
  {
    title: "Assaf",
    image: "/showreel/reel4.png",
    link: "/reel/assaf",
    category: "Video Based Campaigns",
    videoUrl: "https://player.vimeo.com/video/1099040916?h=f155b46c7d",
    orientation: "portrait",
  },
  {
    title: "Ninja",
    image: "/showreel/reel5.png",
    link: "/reel/ninja",
    category: "Video Based Campaigns",
    videoUrl: "https://player.vimeo.com/video/1099041247?h=0848c94732",
    orientation: "portrait",
  },
  {
    title: "Almajd Real Estate",
    image: "/showreel/reel6.png",
    link: "/reel/almajd-real-estate",
    category: "Seasonal Campaigns",
    videoUrl: "https://player.vimeo.com/video/1099041500?h=ae70184435",
    orientation: "landscape",
  },
  {
    title: "Joaan Application",
    image: "/showreel/reel7.png",
    link: "/reel/joaan-application",
    category: "Seasonal Campaigns",
    videoUrl: "https://player.vimeo.com/video/1099041669?h=58bfa0e92e",
    orientation: "portrait",
  },
  {
    title: "Elshabrawi Abha",
    image: "/showreel/reel3.png",
    link: "/reel/elshabrawi-abha",
    category: "Video Based Campaigns",
    videoUrl: "https://player.vimeo.com/video/1099040633?h=75faa261c8",
    orientation: "landscape",
  },
  {
    title: "Ministry of Housing",
    image: "/showreel/reel13.png",
    link: "/reel/ministry-of-housing",
    category: "Strategy Work",
    videoUrl: "https://player.vimeo.com/video/1099043906?h=c399d3ddd1",
    orientation: "landscape",
  },
  {
    title: "Zed Corner",
    image: "/showreel/reel10.png",
    link: "/reel/zed-corner",
    category: "Long Term Partnership",
    videoUrl: "https://player.vimeo.com/video/1099042588?h=26bdf730d0",
    orientation: "landscape",
  },
  {
    title: "Zen HR",
    image: "/showreel/reel11.png",
    link: "/reel/zen-hr",
    category: "Long Term Partnership",
    videoUrl: "https://player.vimeo.com/video/1099042953?h=e1dc367fc5",
    orientation: "landscape",
  },
  {
    title: "Salala",
    image: "/showreel/reel12.png",
    link: "/reel/salala",
    category: "Strategy Work",
    videoUrl: "https://player.vimeo.com/video/1099043315?h=d2918c02e1",
    orientation: "landscape",
  },
  {
    title: "Saudi Company For Coffee",
    image: "/showreel/reel9.png",
    link: "/reel/saudi-company-for-coffee",
    category: "Long Term Partnership",
    videoUrl: "https://player.vimeo.com/video/1099042284?h=4dab9a8dab",
    orientation: "landscape",
  },
];

export default function ShowReel() {
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

    return manualMap[i] || "";
  };

  return (
    <section
      className={`bg-[var(--primary-black)] text-theme px-4 md:px-8 pb-20 overflow-x-hidden ${fontClass}`}
    >
      {/* --- Section Title Pop-In Animation --- */}
      <motion.h2
        className="text-center text-3xl md:text-6xl font-bold mb-10 mt-5"
        initial="rest"
        whileInView="enter"
        variants={{
          rest: { opacity: 0, scale: 0.9 },
          enter: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        {t("home.showreel.title")}
      </motion.h2>

      <div className="flex flex-col gap-12 items-center">
        {/* --- Category Buttons Pop-In Animation --- */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          dir={isArabic ? "rtl" : "ltr"}
          initial="rest"
          whileInView="enter"
          variants={{
            rest: { opacity: 0, scale: 0.9 },
            enter: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
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
        </motion.div>

        {/* --- Grid of Cards (each card = a motion.div) --- */}
        <div
          className="
            grid 
            auto-rows-auto 
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 
            w-full gap-2 auto-flow-dense
          "
          dir="ltr"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.link}
              onClick={() => navigate(item.link)}
              className={`relative cursor-pointer overflow-hidden rounded-lg ${spanClass(
                i
              )}`}
              initial="rest"
              whileInView="enter"
              whileHover="hover"
              variants={{
                // 1) "rest" = off-screen or before animation
                rest: { opacity: 0, scale: 0.9 },

                // 2) "enter" = when it scrolls into view
                enter: { opacity: 1, scale: 1 },

                // 3) "hover" = when user mouses over this container
                //    We keep it at full opacity & normal scale (or a slight bump).
                //    Children will react to "hover" as well, because they define their own hover variants.
                hover: { opacity: 1, scale: 1.02 },
              }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: false }}
            >
              {/* ----------------------
                  1) Background Image scales up on hover
                     (child <motion.img> sees "hover" from parent and uses its own variants)
                  ---------------------- */}
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

              {/* ----------------------
                  2) Black dimming overlay on hover
                     (child <motion.div> sees "hover" from parent and uses its own variants)
                  ---------------------- */}
              <motion.div
                className="absolute inset-0 bg-black"
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 0.3 },
                }}
                transition={{ duration: 0.3 }}
              />

              {/* ----------------------
                  3) Title text (always visible on top)
                  ---------------------- */}
              <span
                className={`
                  absolute bottom-2
                  ${isArabic ? "right-2 text-right" : "left-2 text-left"}
                  z-10
                  font-semibold text-[clamp(0.75rem,2vw,1rem)] md:text-[clamp(1rem,2.5vw,1.25rem)]
                  bg-black/20
                  px-1 rounded
                  drop-shadow-lg
                `}
              >
                {t(`home.showreel.items.${item.title}`)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
