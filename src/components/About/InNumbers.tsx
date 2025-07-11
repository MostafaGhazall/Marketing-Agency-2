import { useInView } from "framer-motion";
import CountUp from "react-countup";
import { useRef, useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";

const stats = [
  { end: 7, suffix: "+", key: "years" },
  { end: 3000, suffix: "+", key: "projects" },
  { end: 10, suffix: "+", key: "awards" },
];

export default function InNumbersSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(isInView); // reset to false when out, true when in
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className={`bg-[var(--primary-black)] text-theme px-4 md:px-8 py-20 text-center ${fontClass}`}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-theme">
        {t("home.inNumbers.title")}
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0">
        {stats.map((stat, idx) => (
          <Fragment key={idx}>
            <div className="text-center px-6 md:px-10">
              <div className="text-4xl md:text-6xl font-bold text-theme">
                {startCount && (
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2}
                  />
                )}
              </div>
              <div className="text-[var(--primary-light)] text-3xl md:text-3xl mt-2">
                {t(`home.inNumbers.stats.${stat.key}`)}
              </div>
            </div>

            {idx < stats.length - 1 && (
              <div className="hidden md:block h-16 border-r border-theme mx-2" />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
