import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
        <h1
          className={`text-white text-3xl md:text-5xl font-bold px-4 text-center font-theme-ar ${
            isArabic ? "rtl" : "ltr"
          }`}
        >
          نصنع الإعلان السعودي من 2013م
        </h1>
      </div>
    </section>
  );
}
