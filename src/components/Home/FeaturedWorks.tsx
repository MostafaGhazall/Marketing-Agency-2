import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Work {
  id: number;
  title: string;
  image: string;
  link: string;
}

const works: Work[] = [
  {
    id: 1,
    title: "Your Other Half",
    image: "/works/work1.jpg",
    link: "/works/your-other-half",
  },
  {
    id: 2,
    title: "The oldest and newest bank",
    image: "/works/work2.jpg",
    link: "/works/alrajhi-bank",
  },
  {
    id: 3,
    title: "National Day Project",
    image: "/works/work3.jpg",
    link: "/works/national-day",
  },
  {
    id: 4,
    title: "National Project",
    image: "/works/work4.jpg",
    link: "/works/national",
  },
];

export default function FeaturedWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  /* ---------------- scroll → translateX ---------------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Rail width = works.length × 100vw. Translate from 0 → -((n-1)×100vw).
  const trackX = useTransform(scrollYProgress, (v) => {
    const totalSlides = works.length;
    const shiftPerSlide = 100; // vw
    const totalShift = (totalSlides - 1) * shiftPerSlide;

    // On medium and larger screens: shift to center first and last
    const centerOffset =
      typeof window !== "undefined" && window.innerWidth >= 768 ? 0 : 0;

    return `-${v * totalShift * 1 + centerOffset - v * centerOffset * 2}vw`;
  });
  const trackWidth = `${works.length * 100}vw`;

  return (
    <section
      ref={ref}
      className={`relative h-[400vh] bg-[var(--primary-black)] text-[var(--secondary-white)] ${fontClass}`}
    >
      {/* Sticky viewport frame */}
      <div dir="ltr" className="sticky top-0 h-screen w-screen overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-bold text-theme mt-10 lg:my-10 text-center">
          {t("home.featured.title")}
        </h2>
        {/* Horizontal rail */}
        <motion.div
          style={{ x: trackX, width: trackWidth }}
          className="flex h-[70vh]"
        >
          {works.map((work) => (
            <a
              key={work.id}
              href={work.link}
              className="relative flex h-full w-screen md:min-w-[100vw] lg:min-w-[100vw] flex-shrink-0 items-center justify-center px-4 sm:px-10 md:pl-[100px] cursor-pointer"
            >
              <div className="relative w-full max-w-[90vw] md:max-w-[900px]">
                <img
                  src={work.image}
                  alt={t(`home.featured.items.${work.title}`)}
                  className="aspect-video w-full rounded-2xl md:rounded-3xl object-cover shadow-2xl"
                />
                <div
                  className={`absolute bottom-2 md:bottom-4 ${
                    isArabic
                      ? "right-4 md:right-6 text-right"
                      : "left-4 md:left-6 text-left"
                  } text-base sm:text-lg md:text-2xl font-bold drop-shadow-sm ${fontClass}`}
                >
                  {t(`home.featured.items.${work.title}`)}
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
