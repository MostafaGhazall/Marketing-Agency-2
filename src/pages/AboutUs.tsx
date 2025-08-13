import {
  memo, lazy, Suspense, useEffect, useMemo, useRef, useState, useCallback,
} from "react";
import { useTranslation } from "react-i18next";

// ✅ Lazy-load below-the-fold sections
const FirstParallax = lazy(() => import("../components/About/FirstParallax.tsx"));
const SecondParallax = lazy(() => import("../components/About/SecondParallax.tsx"));
const InNumbers = lazy(() => import("../components/About/InNumbers.tsx"));
const Clients = lazy(() => import("../components/About/Clients.tsx"));

function useInViewOnce<T extends Element>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { root: null, rootMargin, threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

export default memo(function AboutUs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  // Respect prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Track visibility for each heavy section
  const sec1 = useInViewOnce<HTMLDivElement>();
  const sec2 = useInViewOnce<HTMLDivElement>();
  const sec3 = useInViewOnce<HTMLDivElement>();
  const sec4 = useInViewOnce<HTMLDivElement>();

  const heroPng = "/about/our-thinking.png";

  // Optional: simple skeleton
  const Skeleton = useCallback(
    ({ h = "60vh" }: { h?: string }) => (
      <div
        className="w-full animate-pulse bg-[var(--primary-black)]/40 rounded-none"
        style={{ height: h }}
        aria-hidden="true"
      />
    ),
    []
  );

  return (
    <section className={`w-full ${fontClass}`}>
      {/* HERO (LCP) — use <picture>, eager load, high priority */}
      <div className="relative w-full min-h-[70svh]">
        <picture>
          <img
            src={heroPng}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            // CLS guards
            width={1920}
            height={1080}
            // Fast LCP
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-black)] -bottom-1" />
      </div>

      {/* Header */}
      <div className="bg-[var(--primary-black)] pb-12 md:pb-20 text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-theme">
          {t("about.title")}
        </h1>
      </div>

      {/* Below-the-fold: defer work */}
      <div ref={sec1.ref} className="cv-auto">
        <Suspense fallback={<Skeleton h="80vh" />}>
          {sec1.inView ? (
            prefersReducedMotion ? (
              /* Static fallback if you want; else show the component */
              <div className="h-[60vh] bg-[var(--primary-black)]/20" />
            ) : (
              <FirstParallax />
            )
          ) : (
            <Skeleton h="80vh" />
          )}
        </Suspense>
      </div>

      <div ref={sec2.ref} className="cv-auto">
        <Suspense fallback={<Skeleton h="70vh" />}>
          {sec2.inView ? <SecondParallax /> : <Skeleton h="70vh" />}
        </Suspense>
      </div>

      <div ref={sec3.ref} className="cv-auto">
        <Suspense fallback={<Skeleton h="50vh" />}>
          {sec3.inView ? <InNumbers /> : <Skeleton h="50vh" />}
        </Suspense>
      </div>

      <div ref={sec4.ref} className="cv-auto">
        <Suspense fallback={<Skeleton h="60vh" />}>
          {sec4.inView ? <Clients /> : <Skeleton h="60vh" />}
        </Suspense>
      </div>
    </section>
  );
});
