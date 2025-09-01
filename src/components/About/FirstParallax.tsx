import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

export default function FirstParallax() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const textAlignClass = isArabic ? "text-right" : "text-left";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const titles = [
    "Story Tellers",
    "Experimental & Trendsetters",
    "Performance And Digital First Environments",
    "Here For The Long Run",
    "Experienced in high complexity operations",
  ];

  const sections = titles.map((title, i) => ({
    id: `section-${i + 1}`,
    title: t(`about.FirstParallax.title.${title}`),
    description: t(`about.FirstParallax.description.${title}`),
    image: `/about/${["one", "two", "three", "four", "five"][i]}.png`,
  }));

  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const onscreen = entries.filter((e) => e.isIntersecting);
        if (onscreen.length === 0) {
          setActiveId(null);
          return;
        }
        const mostVisible = onscreen.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];
        setActiveId(mostVisible.target.id);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-35% 0px -35% 0px",
      }
    );

    const nodes =
      containerRef.current?.querySelectorAll<HTMLElement>("section") ?? [];
    nodes.forEach((n) => observer.observe(n));

    return () => nodes.forEach((n) => observer.unobserve(n));
  }, []);

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className={`relative w-full bg-[var(--primary-black)] text-theme ${fontClass}`}
    >
      {/* Sidebar Navigation */}
      <aside
        className="
          hidden md:flex flex-col items-end gap-3         
          absolute md:sticky                               
          right-4 md:right-8 lg:right-16 mr-8   
          top-[33vh] pt-36 pb-40                
          z-20 text-right leading-tight
        "
      >
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() =>
              document
                .getElementById(sec.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className={`whitespace-nowrap transition-colors duration-300 text-2xl font-semibold cursor-pointer
              ${
                activeId === sec.id
                  ? "text-[var(--secondary-white)] font-extrabold"
                  : "text-[var(--secondary-light)] hover:text-[var(--secondary-white)]"
              }`}
          >
            {sec.title}
          </button>
        ))}
      </aside>

      {/* Animated Sections */}
      <div>
        {sections.map((sec) => (
          <AnimatedSection
            key={sec.id}
            id={sec.id}
            title={sec.title}
            description={sec.description}
            image={sec.image}
            fontClass={fontClass}
            textAlignClass={textAlignClass}
            isArabic={isArabic}
          />
        ))}
      </div>
    </div>
  );
}

// === Inline Animated Section Component ===
function AnimatedSection({
  id,
  title,
  description,
  image,
  fontClass,
  textAlignClass,
  isArabic,
}: {
  id: string;
  title: string;
  description: string;
  image: string;
  fontClass: string;
  textAlignClass: string;
  isArabic: boolean;
}) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const controls = useAnimation();
  const imageControls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 1,
          ease: "easeOut",
        },
      });

      imageControls.start({
        opacity: 1,
        y: 0,
        rotateZ: 0,
        transition: {
          duration: 1.2,
          ease: "easeOut",
          delay: 0.2,
        },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 50,
        rotateX: -5,
        transition: {
          duration: 0.5,
          ease: "easeIn",
        },
      });

      imageControls.start({
        opacity: 0,
        y: 50,
        rotateZ: 3.5,
        transition: {
          duration: 0.5,
          ease: "easeIn",
        },
      });
    }
  }, [inView, controls, imageControls]);

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-screen flex flex-col items-center md:items-start justify-center px-6 md:px-20 md:pr-[260px] lg:pr-[320px] md:mb-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotateZ: 3.5 }}
        animate={imageControls}
        className="w-full"
        style={{ transformOrigin: "bottom left" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -5 }}
          animate={controls}
          className={`max-w-3xl mx-auto md:mx-0 text-center md:text-left ${fontClass} ${isArabic ? "md:pr-12" : ""}`}
        >
          <h2 className={`text-4xl md:text-3xl font-extrabold text-theme mb-3 ${textAlignClass}`}>
            {title}
          </h2>
          <p className={`text-lg md:text-xl leading-relaxed text-white/80 mb-6 ${textAlignClass}`}>
            {description}
          </p>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 50, rotateX: -5 }}
          animate={controls}
          className="w-full flex justify-center md:justify-start"
        >
          <img
            src={image}
            alt={title}
            className="w-full max-w-[720px] h-[380px] object-cover rounded-xl shadow-lg"
          />
        </motion.figure>
      </motion.div>
    </section>
  );
}
