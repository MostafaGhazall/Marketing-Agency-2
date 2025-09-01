import { useEffect, useRef, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

/** ─────────────────────────────
 *  Data (videos + text)
 *  ────────────────────────── */
interface Work {
  id: number;
  title: string; // overlay text (i18n fallback)
  video: string; // card media
  logo: string; // bottom-left logo
}

const works: Work[] = [
  {
    id: 1,
    title: "saldwish | MBC GROUP",
    video: "/works/work1.mp4",
    logo: "/works/logo1.png",
  },
  {
    id: 2,
    title: "Akhdod Club",
    video: "/works/work2.mp4",
    logo: "/works/logo2.png",
  },
  {
    id: 3,
    title: "Jeddah History",
    video: "/works/work3.mp4",
    logo: "/works/logo3.png",
  },
  {
    id: 4,
    title: "Saudi Founding Day",
    video: "/works/work4.mp4",
    logo: "/works/logo4.png",
  },
];

export default function FeaturedWorks() {
  const { t, i18n } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);

  // speed control
  const speedRef = useRef<number>(1.5);

  // RTL / font
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  // duplicate for seamless loop
  const extendedItems = useMemo(() => Array(4).fill(works).flat(), []);

  // hover speed change
  const handleMouseEnter = () => {
    speedRef.current = 0.5;
  };
  const handleMouseLeave = () => {
    speedRef.current = 1.5;
  };

  // optional click behavior
  const handleCardClick = useCallback((_work: Work) => {
    // navigate(_work.link)
  }, []);

  // start position based on direction
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = isArabic ? track.scrollWidth - track.clientWidth : 0;
  }, [isArabic]);

  // single RAF loop for endless scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const dir = isArabic ? -1 : 1;
    const maxScroll = () => track.scrollWidth - track.clientWidth;

    let frameId: number;
    const step = () => {
      track.scrollLeft += dir * speedRef.current;

      // wrap-around
      if (!isArabic && track.scrollLeft >= maxScroll()) {
        track.scrollLeft = 0;
      } else if (isArabic && track.scrollLeft <= 0) {
        track.scrollLeft = maxScroll();
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isArabic]);

  return (
    <section
      className={`w-full overflow-hidden bg-[var(--primary-black)] text-theme ${fontClass} px-0 pt-20 pb-20 md:py-20`}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center">
        {t("home.featured.title")}
      </h2>

      <div
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-full flex gap-2 overflow-hidden ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        {extendedItems.map((work, index) => (
          <div
            key={`${work.id}-${index}`}
            onClick={() => handleCardClick(work)}
            className="w-[90vw] sm:w-[500px] md:w-[600px] lg:w-[650px] h-[64vw] sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden relative cursor-pointer flex-shrink-0 bg-black"
          >
            {/* Video */}
            <video
              src={work.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Logo bottom (RTL/LTR aware) */}
            <div
              className={`absolute bottom-4 z-10 ${
                isArabic ? "left-5" : "right-5"
              }`}
            >
              <div className="h-12 md:h-16 flex items-end">
                <img
                  src={work.logo}
                  alt=""
                  aria-hidden="true"
                  className="max-h-full w-auto object-contain drop-shadow"
                  draggable={false}
                />
              </div>
            </div>

            {/* Title overlay (RTL → bottom-right, LTR → bottom-left) */}
            <div
              className={`absolute bottom-4 text-theme font-bold text-lg md:text-2xl ${fontClass} ${
                isArabic ? "right-6 text-right" : "left-6 text-left"
              } drop-shadow-sm`}
            >
              {t(`home.featured.items.${work.title}`, {
                defaultValue: work.title,
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
