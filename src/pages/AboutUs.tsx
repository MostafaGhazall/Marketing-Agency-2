import { useTranslation } from "react-i18next";
import aboutBg from "/about/our-thinking.png";
import FirstParallax from "../components/About/FirstParallax.tsx";
import SecondParllax from "../components/About/SecondParallax.tsx";
import InNumbers from "../components/About/InNumbers.tsx";
import Clients from "../components/About/Clients.tsx";

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  return (
    <section className={`w-full ${fontClass}`}>
      {/* Image Section */}
      <div
        className="w-full h-[70vh] relative"
        style={{
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Black fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-black)] -bottom-1" />
      </div>

      {/* Header Section */}
      <div className="bg-[var(--primary-black)] pb-12 md:pb-20 text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-theme">
          {t("about.title")}
        </h1>
      </div>
      <FirstParallax />
      <SecondParllax />
      <InNumbers />
      <Clients />
    </section>
  );
}
