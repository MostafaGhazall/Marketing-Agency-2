import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

/** ─────────────────────────────
 *  Static carousel data
 *  ────────────────────────── */
const featuredItems = [
  { title: "Your Other Half",        image: "/works/work1.jpg", link: "/works/your-other-half" },
  { title: "The oldest and newest bank", image: "/works/work2.jpg", link: "/works/alrajhi-bank" },
  { title: "National Day Project",   image: "/works/work3.jpg", link: "/works/national-day" },
  { title: "National Project",       image: "/works/work4.jpg", link: "/works/national" },
  { title: "Ad Legacy",              image: "/works/work5.jpg", link: "/works/ad-legacy" },
];

export default function FeaturedWorks() {
  const { t, i18n } = useTranslation();
  const navigate            = useNavigate();
  const trackRef            = useRef<HTMLDivElement>(null);

  /** Persistent, mutable speed value (0.5 px/frame on hover, 1.5 px otherwise) */
  const speedRef = useRef<number>(1.5);

  /** Helper flags */
  const isArabic  = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  /** Duplicate the items four times so the loop feels endless */
  const extendedItems = useMemo(() => Array(4).fill(featuredItems).flat(), []);

  /** Hover handlers (no re-render) */
  const handleMouseEnter = () => { speedRef.current = 0.5; };
  const handleMouseLeave = () => { speedRef.current = 1.5; };

  /** Click-through navigation */
  const handleNavigate   = useCallback((link: string) => navigate(link), [navigate]);

  /*────────────────────────────────────────────────────────
   * 1. Re-position the scroll start whenever language flips
   *────────────────────────────────────────────────────────*/
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollLeft = isArabic
      ? track.scrollWidth - track.clientWidth   // right edge for RTL
      : 0;                                      // left edge for LTR
  }, [isArabic]);

  /*────────────────────────────────────────────────────────
   * 2. Single animation loop — respects RTL and live speed
   *────────────────────────────────────────────────────────*/
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const dir        = isArabic ? -1 : 1;                      // pixel delta sign
    const maxScroll  = () => track.scrollWidth - track.clientWidth;

    let frameId: number;
    const step = () => {
      track.scrollLeft += dir * speedRef.current;

      /** seamless wrap-around */
      if (!isArabic && track.scrollLeft >= maxScroll()) {
        track.scrollLeft = 0;
      } else if (isArabic && track.scrollLeft <= 0) {
        track.scrollLeft = maxScroll();
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isArabic]);      // only restarts if direction changes

  /*────────────────────────────────────────────────────────
   *  Render
   *────────────────────────────────────────────────────────*/
  return (
    <section className={`w-full overflow-hidden bg-[var(--primary-black)] text-theme ${fontClass} px-0 pt-20 pb-20 md:py-20`}>
      <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center">
        {t("home.featured.title")}
      </h2>

      <div
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-full flex gap-2 overflow-hidden ${isArabic ? "flex-row-reverse" : ""}`}
      >
        {extendedItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigate(item.link)}
            className="w-[90vw] sm:w-[500px] md:w-[600px] lg:w-[650px] h-[64vw] sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden relative cursor-pointer flex-shrink-0"
          >
            <img
              src={item.image}
              alt={t(`home.featured.items.${item.title}`)}
              className="w-full h-full object-cover"
            />
            <div className={`absolute bottom-4 text-theme font-bold text-lg md:text-2xl ${fontClass} ${
                  isArabic ? "right-6 text-right" : "left-6 text-left"
                } drop-shadow-sm`}>
              {t(`home.featured.items.${item.title}`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
