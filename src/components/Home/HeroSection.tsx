import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  return (
    <section
      className={`
        relative md:mt-[-50px] md:h-[110vh] w-full overflow-hidden
        flex items-center justify-center ${fontClass}
      `}
    >
      {/* Video background */}
      <div className="w-full h-[400px] mt-[100px] md:h-full relative z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pb-[6%]">
        <button
          onClick={() => navigate("/order")}
          className={`
            /* fluid font-size: from .875rem up to 1.25rem as viewport goes from 0→100vw */
            text-[clamp(0.875rem,2vw,1.25rem)]
            /* fluid horizontal padding: 0.75rem→1.5rem */
            px-[clamp(0.75rem,4vw,1.5rem)]
            /* fluid vertical padding: 0.5rem→1rem */
            py-[clamp(0.5rem,2vw,1rem)]

            flex items-center gap-2
            border border-theme
            rounded-lg
            bg-transparent text-theme
            font-medium
            transition-all duration-300 cursor-pointer
            hover:shadow-[inset_0_0_20px_rgba(255,238,212,0.6)]
          `}
        >
          <span>{t("home.order")}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={2}
            className={`w-6 h-6 transform ${isArabic ? "scale-x-[-1]" : ""}`}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
