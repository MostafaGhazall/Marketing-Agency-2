import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

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
    title: "Saudis: Our True Wealth",
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
];

export default function ShowReelSection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredItems =
    selectedCategory === "ALL"
      ? showReelItems
      : showReelItems.filter((x) => x.category === selectedCategory);

  const spanClass = (i: number) => {
    if (i % 6 === 0) return "lg:col-span-2 lg:row-span-2";
    if (i % 3 === 0) return "lg:col-span-2";
    return "lg:col-span-1";
  };

  return (
    <section className="bg-[var(--primary-black)] text-theme px-4 md:px-8 pb-20">
      <motion.h2
        className="text-center text-3xl md:text-6xl font-bold mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        ShowReel
      </motion.h2>

      {/* buttons + grid in one wrapper */}
      <motion.div
        className="flex flex-col gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`border border-theme px-4 py-2 rounded-full text-sm md:text-base transition cursor-pointer
                ${
                  selectedCategory === c
                    ? "bg-theme text-black"
                    : "hover:bg-theme hover:text-black"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Reel Grid */}
        <div
          className="grid auto-rows-[170px] sm:auto-rows-[220px] lg:auto-rows-[260px]
                     grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 w-full gap-4 auto-flow-dense"
        >
          {filteredItems.map((item, i) => (
            <div
              key={item.link}
              onClick={() => navigate(item.link)}
              className={`relative cursor-pointer overflow-hidden rounded-xl group w-full
              transition-transform duration-300 ease-in-out hover:scale-[1.02]
              ${spanClass(i)}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute bottom-4 left-6 font-bold text-lg md:text-xl drop-shadow">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
