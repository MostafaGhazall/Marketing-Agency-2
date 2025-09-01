import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default memo(function HeroSection() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const onOrder = useCallback(() => navigate("/order"), [navigate]);

  // Use your best-quality sources here
  // const imgAvif = "/hero-poster.avif";
  // const imgWebp = "/hero-poster.webp";
  const imgPng  = "/hero.png";

  return (
    <section
      className={`
        relative md:mt-[-50px] md:min-h-[110svh] min-h-[70svh] w-full overflow-hidden
        flex items-center justify-center ${fontClass}
      `}
      aria-label={t("home.heroLabel", "Hero section")}
    >
      {/* Background image */}
      <div className="w-full min-h-[400px] mt-[100px] md:mt-0 md:min-h-[110svh] relative z-0">
        <picture>
          {/* Highest quality/efficiency first */}
          {/* <source srcSet={imgAvif} type="image/avif" />
          <source srcSet={imgWebp} type="image/webp" /> */}
          <img
            src={imgPng}
            alt=""           // decorative background
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            decoding="async"
            loading="eager"
            draggable={false}
            fetchPriority="high"
          />
        </picture>

        {/* Optional: subtle dark gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.35)] to-transparent pointer-events-none" />
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
            bg-transparent text-white font-medium
            transition-all duration-300 cursor-pointer
            hover:shadow-[inset_0_0_20px_rgba(234,100,46,0.6)]
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
