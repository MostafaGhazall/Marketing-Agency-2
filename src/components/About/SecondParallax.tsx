import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";

/* ---------- geometry (unchanged) ---------- */
const thetaRanges: [number, number][] = [
  [Math.PI / 2, Math.PI],
  [0, Math.PI],
  [0, Math.PI],
  [0, Math.PI / 2],
];
const totalTheta = thetaRanges.reduce((s, [f, t]) => s + Math.abs(t - f), 0);
let offset = 0;
const bubbleTimings: [number, number][] = thetaRanges.map(([f, t]) => {
  const slice = Math.abs(t - f) / totalTheta;
  const w: [number, number] = [offset, offset + slice];
  offset += slice;
  return w;
});

/* ---------- component ---------- */
export default function SecondParallax() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const [radius, setRadius] = useState({ x: 867, y: 350 });

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setRadius({ x: 700, y: 330 }); // sm
      } else if (width < 768) {
        setRadius({ x: 650, y: 300 }); // sm-md
      } else if (width < 1024) {
        setRadius({ x: 560, y: 175 }); // md
      } else if (width < 1440) {
        setRadius({ x: 610, y: 200 }); // lg
      } else if (width < 1920) {
        setRadius({ x: 866.5, y: 360 }); // xl (Full HD)
      } else if (width < 2560) {
        setRadius({ x: 1400, y: 655 }); // 2K screens
      } else {
        setRadius({ x: 1420, y: 670 }); // 4K and up
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const labels = ["Discover", "Define", "Develop", "Distribute"];
  const bubbleLabels = labels.map((label) => ({
    label: t(`about.SecondParallax.labels.${label}`),
    text: t(`about.SecondParallax.text.${label}`),
    image: "/about/bubble-yellow.png",
  }));

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section
      ref={ref}
      className={`relative h-[850vh] -mt-20 bg-[var(--primary-black)] text-[var(--secondary-white)] ${fontClass}`}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-4xl sm:text-4xl md:text-6xl lg:text-6xl font-bold text-theme mb-6 mt-14">
          {t("about.SecondParallax.title")}
        </h2>

        <div className="relative w-full h-[65vh] sm:h-[72vh] md:h-[100vh] flex items-end justify-center">
          <img
            src="/about/golden-dome.png"
            alt="Golden dome"
            className="absolute bottom-0 w-[335vw] sm:w-[160vw] md:w-[100vw] h-auto max-w-none object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-black)] -bottom-1" />

          {bubbleLabels.map((b, i) => {
            const progress = useTransform(smooth, bubbleTimings[i], [0, 1]);
            const [θfrom, θto] = thetaRanges[i];
            const mid = (θfrom + θto) / 2;
            const θ =
              i === 1 || i === 2
                ? useTransform(
                    progress,
                    [0, 0.4, 0.45, 1],
                    [θfrom, mid, mid, θto]
                  )
                : useTransform(progress, [0, 1], [θfrom, θto]);

            const x = useTransform(θ, (t) => Math.cos(t) * radius.x);
            const y = useTransform(θ, (t) => -Math.sin(t) * radius.y);
            const rotate = useTransform(
              θ,
              (t) =>
                (Math.atan2(radius.y * Math.cos(t), radius.x * Math.sin(t)) *
                  180) /
                Math.PI
            );

            return (
              <motion.div
                key={i}
                style={{ x, y, rotate }}
                className="absolute w-[170px] h-[170px] sm:w-36 sm:h-36 md:w-[200px] md:h-[200px] lg:w-[205px] lg:h-[205px]"
              >
                <div className="relative w-full h-full">
                  <img
                    src={b.image}
                    alt={b.label}
                    className="w-full h-full object-contain"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center
                                text-[var(--secondary-white)] font-semibold
                                text-2xl sm:text-lg md:text-2xl lg:text-3xl
                                tracking-tight text-center px-2 ${fontClass}`}
                  >
                    {b.label}
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {bubbleLabels.map((b, i) => {
              const CAPTION_IN = 0.35;
              const CAPTION_OUT = 0.8;
              const p = useTransform(smooth, bubbleTimings[i], [0, 1]);
              const isFirst = i === 0;
              const isLast = i === bubbleLabels.length - 1;

              let y, opacity;

              if (isFirst) {
                y = useTransform(p, [0, 0.25, 0.5], [0, -30, -60]);
                opacity = useTransform(p, [0, 0.25, 0.5], [1, 1, 0]);
              } else if (isLast) {
                y = useTransform(p, [0, 0.5, 1], [60, 0, 0]);
                opacity = useTransform(p, [0, 0.5, 1], [0, 1, 1]);
              } else {
                y = useTransform(
                  p,
                  [0, CAPTION_IN, CAPTION_OUT, 1],
                  [60, 0, -60, -60]
                );
                opacity = useTransform(
                  p,
                  [0, CAPTION_IN, CAPTION_OUT, 1],
                  [0, 1, 1, 0]
                );
              }

              return (
                <motion.div
                  key={i}
                  style={{ y, opacity }}
                  className="absolute left-1/2 -translate-x-1/2 whitespace-pre text-center
                              text-2xl sm:text-base md:text-2xl lg:text-3xl
                              text-theme mt-30"
                >
                  {b.text}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
