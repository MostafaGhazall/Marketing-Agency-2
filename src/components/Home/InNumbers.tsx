import { useInView } from "framer-motion";
import CountUp from "react-countup";
import { useRef, useState, useEffect, Fragment } from "react";

const stats = [
  { end: 10, suffix: "+", label: "Years" },
  { end: 2000, suffix: "+", label: "Projects" },
  { end: 22, suffix: "+", label: "Awards" },
];

export default function InNumbersSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (isInView) setStartCount(true);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--primary-black)] text-theme font-theme px-4 md:px-8 pb-20 text-center"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-theme">MASHAB In Numbers</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0">
        {stats.map((stat, idx) => (
          <Fragment key={idx}>
            <div className="text-center px-6 md:px-10">
              <div className="text-4xl md:text-6xl font-bold text-theme">
                {startCount && (
                  <CountUp end={stat.end} duration={2} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-white text-lg md:text-xl mt-2">{stat.label}</div>
            </div>

            {/* Divider: Show between items except last */}
            {idx < stats.length - 1 && (
              <div className="hidden md:block h-16 border-r border-theme mx-2" />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
