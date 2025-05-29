import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative md:mt-[-50px] md:h-[110vh] w-full overflow-hidden flex items-center justify-center">
      {/* Video with side padding */}
      <div className="w-full h-[400px] mt-[100px] md:h-full md:px-16 relative z-0">
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

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pb-[12%]">
        <button
          onClick={() => navigate("/contact")}
          className="group flex items-center gap-2 bg-[var(--secondary-orange)] text-white font-semibold text-lg md:text-xl px-6 py-2 rounded-full shadow-md transition-colors duration-300 hover:bg-[var(--primary-light)] hover:text-[var(--secondary-orange)] cursor-pointer"
        >
          <span className="transition-colors duration-300 group-hover:text-[var(--secondary-orange)]">
            {t("home.order")}
          </span>

          {/* Default white arrow */}
          <img
            src="/arrow-right.png"
            alt="arrow"
            className={`w-4 h-4 ${
              i18n.language === "ar" ? "rotate-180" : ""
            } group-hover:hidden`}
          />

          {/* Hover orange arrow */}
          <img
            src="/arrow-right-orange.png"
            alt="arrow"
            className={`w-4 h-4 hidden group-hover:block ${
              i18n.language === "ar" ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </section>
  );
}
