import { useInView } from "framer-motion";
import CountUp from "react-countup";
import { useRef, useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";

const stats = [
  { end: 10, suffix: "+", key: "years" },
  { end: 2000, suffix: "+", key: "projects" },
  { end: 22, suffix: "+", key: "awards" },
];

export default function InNumbersSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [startCount, setStartCount] = useState(false);

  const fontClass = i18n.language === "ar" ? "font-theme-ar" : "font-theme";

  useEffect(() => {
    if (isInView) setStartCount(true);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className={`bg-[var(--primary-black)] text-theme px-4 md:px-8 pb-20 text-center ${fontClass}`}
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
                  <CountUp end={stat.end} duration={2} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-white text-lg md:text-xl mt-2">
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
