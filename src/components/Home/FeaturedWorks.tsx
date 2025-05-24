import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

const featuredItems = [
  { title: "Your Other Half", image: "/works/work1.jpg", link: "/works/your-other-half" },
  { title: "The oldest and newest bank", image: "/works/work2.jpg", link: "/works/alrajhi-bank" },
  { title: "National Day Project", image: "/works/work3.jpg", link: "/works/national-day" },
  { title: "National Project", image: "/works/work4.jpg", link: "/works/national" },
  { title: "Ad Legacy", image: "/works/work5.jpg", link: "/works/ad-legacy" },
];

export default function FeaturedWorks() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const extendedItems = useMemo(() => Array(3).fill(featuredItems).flat(), []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleNavigate = useCallback((link: string) => navigate(link), [navigate]);

  useEffect(() => {
    let animationFrameId: number;
    const scrollSpeed = () => (isHovered ? 0.5 : 1.5);

    const animate = () => {
      if (trackRef.current) {
        trackRef.current.scrollLeft += scrollSpeed();
        if (
          trackRef.current.scrollLeft >=
          trackRef.current.scrollWidth - trackRef.current.clientWidth
        ) {
          trackRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section className={`w-full overflow-hidden bg-[var(--primary-black)] text-theme ${fontClass} px-0 pt-12 pb-20 md:py-20`}>
      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
        {t("home.featured.title")}
      </h2>

      <div
        className="w-full flex gap-2 overflow-hidden"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
            <div className={`absolute bottom-4 left-6 text-theme font-bold text-lg md:text-2xl ${fontClass} drop-shadow-sm`}>
              {t(`home.featured.items.${item.title}`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
