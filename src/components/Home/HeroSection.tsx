import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default memo(function HeroSection() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  // ✅ SSR-safe prefers-reduced-motion check
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // ✅ Lazy-mount video when in view (unobserve after first intersect)
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback: consider it in view
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onOrder = useCallback(() => navigate("/order"), [navigate]);

  const poster = "/hero-poster.png"; // Prefer WebP/AVIF if you have it

  return (
    <section
      ref={sectionRef}
      className={`
        relative md:mt-[-50px] md:min-h-[110svh] min-h-[70svh] w-full overflow-hidden
        flex items-center justify-center ${fontClass}
      `}
      aria-label={t("home.heroLabel", "Hero section")}
    >
      {/* Background media */}
      <div className="w-full min-h-[400px] mt-[100px] md:mt-0 md:min-h-[110svh] relative z-0">
        {/* Instant-paint poster */}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          decoding="async"
          loading="eager"
          draggable={false}
          fetchPriority="high"
        />

        {/* Render video only when allowed + in view */}
        {!prefersReducedMotion && inView && (
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={poster}
            disablePictureInPicture
            controls={false}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pb-[6%]">
        <button
          onClick={onOrder}
          className={`
            text-[clamp(0.875rem,2vw,1.25rem)]
            px-[clamp(0.75rem,4vw,1.5rem)]
            py-[clamp(0.5rem,2vw,1rem)]
            flex items-center gap-2
            border border-theme rounded-lg
            bg-transparent text-theme font-medium
            transition-all duration-300 cursor-pointer
            hover:shadow-[inset_0_0_20px_rgba(255,238,212,0.6)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-theme/60
          `}
          aria-label={t("home.order")}
        >
          <span>{t("home.order")}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={2}
            className={`w-6 h-6 ${isArabic ? "scale-x-[-1]" : ""}`}
            aria-hidden="true"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
});
