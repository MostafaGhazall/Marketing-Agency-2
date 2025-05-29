import { useRef } from "react";
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
const RADIUS_X = 867;
const RADIUS_Y = 350;

/* ---------- component ---------- */
export default function SecondParallax() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";
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
      className="relative h-[850vh] -mt-20 bg-[var(--primary-black)] text-[var(--secondary-white)] font-theme"
    >
      {/* ---------- pinned container ---------- */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-4xl sm:text-4xl md:text-6xl lg:text-6xl font-bold text-theme font-theme mb-6 mt-14">
          {t("about.SecondParallax.title")}
        </h2>

        {/* ---------- dome ---------- */}
        <div className="relative w-full h-[65vh] sm:h-[72vh] md:h-[100vh] flex items-end justify-center">
          <img
            src="/about/golden-dome.png"
            alt="Golden dome"
            className="absolute bottom-0 w-[335vw] sm:w-[160vw] md:w-[100vw] h-auto max-w-none object-cover z-0"
          />

          {/* Black fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-black)] -bottom-1" />

          {/* ---------- bubbles ---------- */}
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
            const x = useTransform(θ, (t) => Math.cos(t) * RADIUS_X);
            const y = useTransform(θ, (t) => -Math.sin(t) * RADIUS_Y);
            const rotate = useTransform(
              θ,
              (t) =>
                (Math.atan2(RADIUS_Y * Math.cos(t), RADIUS_X * Math.sin(t)) *
                  180) /
                Math.PI
            );

            return (
              <motion.div
                key={i}
                style={{ x, y, rotate }}
                className="absolute
                           w-[170px] h-[170px]
                           sm:w-36 sm:h-36
                           md:w-[200px] md:h-[200px]
                           lg:w-[205px] lg:h-[205px]"
              >
                <div className="relative w-full h-full">
                  <img
                    src={b.image}
                    alt={b.label}
                    className="w-full h-full object-contain"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center
                                text-theme font-semibold
                                text-2xl sm:text-lg md:text-2xl lg:text-3xl
                                tracking-tight text-center px-2 ${fontClass}`}
                  >
                    {b.label}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* ---------- captions ---------- */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {bubbleLabels.map((b, i) => {
              const CAPTION_IN = 0.35; // when the caption fully fades in
              const CAPTION_OUT = 0.8; // when it starts fading out
              const p = useTransform(smooth, bubbleTimings[i], [0, 1]);
              const isFirst = i === 0;
              const isLast = i === bubbleLabels.length - 1;

              let y, opacity;

              if (isFirst) {
                // ⬅ keep your original arrays
                y = useTransform(p, [0, 0.25, 0.5], [0, -30, -60]);
                opacity = useTransform(p, [0, 0.25, 0.5], [1, 1, 0]);
              } else if (isLast) {
                // ⬅ keep your original arrays
                y = useTransform(p, [0, 0.5, 1], [60, 0, 0]);
                opacity = useTransform(p, [0, 0.5, 1], [0, 1, 1]);
              } else {
                // ⬅ just swap the hard-coded 0.25 / 0.75 for the new constants
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
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-pre text-center
                              text-2xl sm:text-base md:text-2xl lg:text-3xl
                              text-theme mt-30 ${fontClass}`}
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
