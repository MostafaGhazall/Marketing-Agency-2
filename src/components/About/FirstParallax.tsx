import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ───────────── section data ───────────── */
const sections = [
  {
    id: "section-1",
    title: "Story Tellers",
    description:
      "Our communication has storytelling at the core of it, stories that are relevant to our community, stories that can't be faked or created if you don't have the right context. We create opportunities for creative content to turn into brand narratives that evolve into a communication platform.",
    image: "/about/one.jpg",
  },
  {
    id: "section-2",
    title: "Experimental & Trendsetters",
    description:
      "We open widows for our partners that dares to experiment with us. We create trends that disturbs the market and the category. We Are Created a short film instead of an Ad so we can give the message",
    image: "/about/two.jpg",
  },
  {
    id: "section-3",
    title: "Performance And Digital First Environments",
    description:
      "Our team understands that having solid creative is mandatory, but with brands that have environments that are performance driven and digital first, our point of views shifts into a creative that works across an eco-system, each touch point has its own DNA that reflects on communication requirements.",
    image: "/about/three.jpg",
  },
  {
    id: "section-4",
    title: "Here For The Long Run",
    description:
      "Our relations, team structure and procedures are built in a way that will allow us to sustain a relationship with our partners, why? So we can see our shared strategic vision coming to life, we invest in our partners so they can invest in us.",
    image: "/about/four.jpg",
  },
  {
    id: "section-5",
    title: "Experienced in high complexity operations",
    description:
      "We are equipped strategically and operationally to manage partners of high complexity and maintain a service level and achieve objectives that serves their complex magnitude.",
    image: "/about/five.jpg",
  },
];

export default function AboutParallax() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ───────── observer for the right-hand nav ───────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        /* keep only those that are on-screen */
        const onscreen = entries.filter((e) => e.isIntersecting);

        if (onscreen.length === 0) {
          /* nothing intersecting → deactivate all */
          setActiveId(null);
          return;
        }

        /* choose the entry with the largest visible area */
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
      className="relative w-full bg-[var(--primary-black)] text-white font-theme"
    >
      {/* ───────── sticky nav (inside the box) ───────── */}
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
                  ? "text-[var(--secondary-orange)] font-extrabold"
                  : "text-[var(--secondary-orange)]/40 hover:text-[var(--secondary-orange)]"
              }`}
          >
            {sec.title}
          </button>
        ))}
      </aside>

      {/* ───────── scrollable full-height panels ───────── */}
      <div>
        {sections.map((sec) => {
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.2,
          });
          const controls = useAnimation();
          const imageControls = useAnimation();

          useEffect(() => {
            if (inView) {
              // Animate text content
              controls.start({
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  duration: 1,
                  ease: "easeOut",
                },
              });

              // Animate image
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
            }
          }, [inView, controls, imageControls]);

          return (
            <section
              key={sec.id}
              id={sec.id}
              className="
                relative min-h-screen flex flex-col items-center md:items-start
                justify-center px-6 md:px-20 md:pr-[260px] lg:pr-[320px] md:mb-32
              "
              ref={ref}
            >
              <motion.div
                initial={{ 
                  opacity: 0, 
                  y: 50, 
                  rotateZ: 3.5 
                }}
                animate={imageControls}
                className="w-full"
                style={{
                  transformOrigin: "bottom left"
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: -5 }}
                  animate={controls}
                  className="max-w-3xl mx-auto md:mx-0 text-center md:text-left"
                >
                  <h2 className="text-4xl md:text-3xl font-extrabold text-[var(--secondary-orange)] mb-3">
                    {sec.title}
                  </h2>
                  <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-6">
                    {sec.description}
                  </p>
                </motion.div>

                <motion.figure
                  initial={{ opacity: 0, y: 50, rotateX: -5 }}
                  animate={controls}
                  className="w-full flex justify-center md:justify-start"
                >
                  <img
                    src={sec.image}
                    alt={sec.title}
                    className="w-full max-w-[720px] h-[380px] object-cover rounded-xl shadow-lg"
                  />
                </motion.figure>
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
