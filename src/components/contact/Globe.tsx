import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phi = useRef(-1.2);
  const pointerInteracting = useRef(false);
  const pointerStart = useRef(0);
  const phiStart = useRef(0);

  // track velocity
  const velocity = useRef(0);
  const lastPointerX = useRef(0);
  const lastMoveTime = useRef(0);

  useEffect(() => {
    let width = 0;
    let globe: any;

    const setup = () => {
      width = canvasRef.current!.offsetWidth;
      globe = createGlobe(canvasRef.current!, {
        devicePixelRatio: 2,
        width,
        height: width,
        phi: phi.current,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.4, 0.4, 0.4],
        markerColor: [1, 0.6, 0],
        glowColor: [0.5, 0.5, 0.5],
        markers: [
          { location: [28.0444, 31.2357], size: 0.08 }, // Cairo, Egypt
          { location: [17.492, 44.1275], size: 0.08 }, // Najran, KSA
        ],
        onRender: (state) => {
          state.phi = phi.current;
          state.theta = 0.3;
        },
      });
    };

    setup();

    let animationFrameId: number;
    const baseSpeed = 0.002;
    const loop = () => {
      if (!pointerInteracting.current) {
        phi.current += baseSpeed + velocity.current;
        // Apply friction
        velocity.current *= 0.95; // Decay speed gradually
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    // ───────── Drag Interactions ─────────
    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault(); // ✅ Prevent touch scroll interference

      pointerInteracting.current = true;
      pointerStart.current = e.clientX;
      phiStart.current = phi.current;

      velocity.current = 0;
      lastPointerX.current = e.clientX;
      lastMoveTime.current = Date.now();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current) {
        e.preventDefault(); // ✅ Stop default page scroll

        const now = Date.now();
        const delta = e.clientX - pointerStart.current;
        phi.current = phiStart.current + delta / 200;

        const dx = e.clientX - lastPointerX.current;
        const dt = now - lastMoveTime.current;
        if (dt > 0) {
          velocity.current = Math.max(Math.min(dx / dt / 30, 0.05), -0.05);
        }
        lastPointerX.current = e.clientX;
        lastMoveTime.current = now;
      }
    };

    const handlePointerUp = () => {
      pointerInteracting.current = false;
    };

    const canvas = canvasRef.current!;
    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // ───────── Resize ─────────
    const handleResize = () => {
      globe.destroy();
      setup();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      globe.destroy();
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="w-full flex justify-center 
                translate-x-44 sm:translate-x-[100px] md:translate-x-[200px] lg:translate-x-[200px] 
                mt-[-350px] sm:mt-[-250px] md:mt-[-350px] lg:mt-[-375px]
                sm:mb-16 lg:mb-0 md:mb-[-20px]"
    >
      <canvas
        ref={canvasRef}
        className="w-[700px] h-[700px] sm:w-[300px] sm:h-[300px] md:w-[750px] md:h-[750px] lg:w-[800px] lg:h-[800px] touch-none"
        style={{ aspectRatio: 1, cursor: "grab" }}
      />
    </div>
  );
}
