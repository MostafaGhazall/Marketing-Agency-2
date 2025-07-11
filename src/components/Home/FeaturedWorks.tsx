import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Work {
  id: number;
  title: string;
  video: string;
  logo: string;
  labelKey: string;
}

const works: Work[] = [
  {
    id: 1,
    title: "saldwish | MBC GROUP",
    logo: "/works/logo1.png",
    labelKey: "With MASHAB",
    video: "/works/work1.mp4",
  },
  {
    id: 2,
    title: "Akhdod Club",
    logo: "/works/logo2.png",
    labelKey: "With MASHAB",
    video: "/works/work2.mp4",
  },
  {
    id: 3,
    title: "Jeddah History",
    logo: "/works/logo3.png",
    labelKey: "With MASHAB",
    video: "/works/work3.mp4",
  },
  {
    id: 4,
    title: "Saudi Founding Day",
    logo: "/works/logo4.png",
    labelKey: "With MASHAB",
    video: "/works/work4.mp4",
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
      className={`relative h-[400vh] bg-[var(--primary-black)] text-[var(--secondary-white)] ${fontClass} pb-10`}
    >
      {/* Sticky viewport frame */}
      <div
        dir="ltr"
        className="sticky inset-x-0 top-1/4 md:top-0 md:h-screen overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-theme my-10 md:pb-25 lg:my-10 text-center">
          {t("home.featured.title")}
        </h2>
        {/* Horizontal rail */}
        <motion.div style={{ x: trackX, width: trackWidth }} className="flex">
          {works.map((work) => (
            <div
              key={work.id}
              className="relative flex h-full md:h-[50vh] w-screen md:min-w-[100vw] lg:min-w-[100vw] flex-shrink-0 items-center justify-center px-4 sm:px-10 md:pl-[50px]"
            >
              <div className="relative w-full max-w-[90vw] md:max-w-[700px]">
                {/* Logo and Label */}
                <div className={`mb-3 flex flex-col items-center ${fontClass}`}>
                  <img
                    src={work.logo}
                    alt={`${work.labelKey} logo`}
                    className="w-30 h-30 md:w-40 md:h-40 object-contain"
                  />
                  <p className="text-lg md:text-xl font-semibold text-theme text-center">
                    {t(`home.featured.label.${work.labelKey}`)}
                  </p>
                </div>

                {/* Video */}
                <video
                  src={work.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="aspect-video w-full rounded-2xl md:rounded-3xl object-cover shadow-2xl"
                />

                {/* Title overlay */}
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
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
