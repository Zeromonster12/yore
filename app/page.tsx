"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PageLoader from "./components/PageLoader";
import LookbookScroll from "@/components/LookbookScroll";

// â”€â”€â”€ Photo paths â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BASE = "/photos/YORE%20NITRA";
const HERO_BG = `${BASE}/IMG_7099.JPG`;
const DIVIDER_1 = `${BASE}/IMG_7155.JPG`;
const DIVIDER_2 = `${BASE}/IMG_7580.JPG`;

const grid1 = [
  { src: `${BASE}/IMG_7433.JPG`, tall: true },
  { src: `${BASE}/IMG_7441.JPG`, tall: false, color: true },
  { src: `${BASE}/IMG_7448.JPG`, tall: false },
  { src: `${BASE}/IMG_7454.JPG`, tall: true, color: true },
  { src: `${BASE}/IMG_7464.JPG`, tall: false },
  { src: `${BASE}/IMG_7468.JPG`, tall: false, color: true },
];

const grid2 = [
  { src: `${BASE}/IMG_7519.JPG` },
  { src: `${BASE}/IMG_7522.JPG`, color: true },
  { src: `${BASE}/IMG_7525.JPG` },
  { src: `${BASE}/IMG_7526.JPG`, color: true },
  { src: `${BASE}/IMG_7554.JPG` },
  { src: `${BASE}/IMG_7558.JPG`, color: true },
  { src: `${BASE}/IMG_7561.JPG` },
  { src: `${BASE}/IMG_7590.JPG` },
];

const strip = [
  `${BASE}/IMG_7607.JPG`,
  `${BASE}/IMG_7613.JPG`,
  `${BASE}/IMG_7626.JPG`,
  `${BASE}/IMG_7659.JPG`,
  `${BASE}/IMG_7661.JPG`,
  `${BASE}/deso6.jpg`,
  `${BASE}/deso7.jpg`,
  `${BASE}/deso8.jpg`,
];

// â”€â”€â”€ Parallax hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useParallax(ref: React.RefObject<HTMLElement | null>, speed = 0.35) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, speed]);
  return offset;
}

// --- Scroll reveal component ---------------------------------------------------
function RevealItem({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(22px) scale(0.98)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ParallaxBand({ src, label }: { src: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const offset = useParallax(ref as React.RefObject<HTMLElement | null>, 0.28);
  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden">
      <div
        className="absolute inset-[-15%] w-[130%] h-[130%]"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover grayscale"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60" />
      {label && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/YORELOGO.png"
            alt="YORE"
            width={900}
            height={200}
            className="invert opacity-20 w-[55vw] md:w-[40vw] h-auto select-none"
          />
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroOffset = useParallax(
    heroRef as React.RefObject<HTMLElement | null>,
    0.4,
  );
  const stripRef = useRef<HTMLDivElement>(null);
  const scrollStrip = (dir: number) =>
    stripRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // counter for look numbers
  let lookNum = 0;

  return (
    <main className="min-h-screen bg-[#161616] text-[#FAFAFA] overflow-x-hidden">
      <PageLoader />
      {/* â”€â”€ Nav â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ marginTop: "1rem", marginLeft: "1rem" }}
      >
        <Image
          src="/yoremini.png"
          alt="YORE"
          width={48}
          height={28}
          className="invert brightness-200"
          priority
        />

      </nav>

      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <div
          className="absolute inset-[-20%] w-[140%] h-[140%]"
          style={{ transform: `translateY(${heroOffset}px)` }}
        >
          <Image
            src={HERO_BG}
            alt="YORE hero"
            fill
            className="object-cover grayscale"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#161616]/55" />
        <div className="absolute inset-0 bg-linear-to-b from-[#161616]/80 via-transparent to-[#161616]" />

        <div className="relative z-10 flex flex-col items-center text-center select-none">
          <Image
            src="/YORELOGO.png"
            alt="YORE"
            width={900}
            height={200}
            className="invert brightness-200 w-[60vw] md:w-[42vw] h-auto mb-4"
            priority
          />
          <div
            className="flex items-center gap-5 mt-1"
          >
          </div>
          <Image
            src="/beyore.png"
            alt="BeYORE"
            width={600}
            height={120}
            className="w-[28vw] md:w-[10vw] h-auto invert opacity-10 select-none"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          />

          {/* GetYORE drip CTA */}
          <a
            href="https://www.flace.sk/yore/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-10 flex items-center gap-0 overflow-hidden"
          >
            {/* sliding fill */}
            <span className="absolute inset-0 bg-[#FAFAFA] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
            <span
              className="relative z-10 pl-8 pr-[calc(2rem+0.5em)] py-4 text-[#FAFAFA] group-hover:text-[#161616] text-xs font-black uppercase tracking-[0.5em] transition-colors duration-500"
              style={{
                fontFamily: "var(--font-display), sans-serif",
                paddingLeft: "calc(0.5rem + 0.5em)",
                paddingRight: "calc(0.5rem + 0.5em)",
              }}
            >
              GetYORE drip
            </span>
            <span className="relative z-10 flex items-center justify-center w-12 h-12 border-l border-[#FAFAFA]/20 group-hover:border-[#161616]/20 text-[#FAFAFA]/60 group-hover:text-[#161616] transition-all duration-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500"
              >
                <path
                  d="M1 13L13 1M13 1H4M13 1V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {/* border frame */}
            <span className="absolute inset-0 border border-[#FAFAFA]/25 group-hover:border-[#FAFAFA] transition-colors duration-300 pointer-events-none" />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-linear-to-b from-white/50 to-transparent animate-pulse" />
          <span
            className="text-[8px] text-[#FAFAFA]/20 tracking-[0.45em] uppercase"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Scroll
          </span>
        </div>
      </section>

      <LookbookScroll />

      {/* â”€â”€ Section heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      
      {/* â”€â”€ Grid 1 â€” brickwork â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}


      {/* â”€â”€ Parallax divider 1 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}

      {/* â”€â”€ Grid 2 â€” mosaic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      

      {/* â”€â”€ Parallax divider 2 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}

      {/* â”€â”€ Quote block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-28 px-6 md:px-20 flex flex-col items-center text-center gap-8 !mt-12">
        <Image
          src="/postavy.png"
          alt="BeYORE"
          width={900}
          height={300}
          className="w-[70vw] md:w-[40vw] h-auto select-none"
        />
      </section>

      {/* â”€â”€ Horizontal strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}


      {/* â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <footer
        className="mt-12 border-white/20 py-14 px-6 md:px-10 flex flex-col items-center gap-8 md:flex-row md:justify-between
        "
        style={{
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Image
          src="/YORELOGO.png"
          alt="YORE"
          width={68}
          height={26}
          className="invert opacity-80"
        />
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="https://www.instagram.com/yore.form/"
            className="text-[#FAFAFA]/40 text-[10px] tracking-[0.35em] uppercase font-medium hover:text-[#FAFAFA]/80 transition-colors"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Instagram
          </a>
          <a
            href="https://www.flace.sk/yore/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FAFAFA]/40 text-[10px] tracking-[0.35em] uppercase font-medium hover:text-[#FAFAFA] transition-colors"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            GetYORE drip
          </a>
        </div>
        <span
          className="text-[#FAFAFA]/40 text-[10px] tracking-[0.2em] font-medium"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          © 2026 YORE
        </span>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 z-50 w-11 h-11 border border-[#FAFAFA]/25 flex items-center justify-center text-[#FAFAFA]/40 hover:text-[#FAFAFA] hover:border-[#FAFAFA]/60 transition-all duration-300"
        style={{
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? "auto" : "none",
          transform: showTop ? "translateY(0)" : "translateY(12px)",
          transition:
            "opacity 0.4s ease, transform 0.4s ease, color 0.3s, border-color 0.3s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 9L7 3L13 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </main>
  );
}
