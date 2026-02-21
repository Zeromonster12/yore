"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PageLoader from "./components/PageLoader";

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

// â”€â”€â”€ Parallax band component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          <span
            className="text-white/20 text-[14vw] font-black uppercase tracking-[-0.03em] select-none"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {label}
          </span>
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

  // counter for look numbers
  let lookNum = 0;

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
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
        <ul className="flex gap-7">
          <li>
            <a
              href="/login"
              className="text-white text-[10px] tracking-[0.3em] uppercase hover:text-white/60 transition-colors duration-300 border-b border-white/30 pb-px"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                marginRight: "1rem",
              }}
            >
              LOGIN
            </a>
          </li>
        </ul>
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
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black" />

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
            className="flex items-center gap-5 mt-2"
            style={{ marginTop: "1rem" }}
          >
            <div className="h-px w-10 bg-white/30" />
            <p
              className="text-[9px] text-white/40 tracking-[0.55em] uppercase"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              Spring / Summer 2026 — Nitra
            </p>
            <div className="h-px w-10 bg-white/30" />
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
            <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
            <span
              className="relative z-10 pl-8 pr-[calc(2rem+0.5em)] py-4 text-white group-hover:text-black text-xs font-black uppercase tracking-[0.5em] transition-colors duration-500"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              GetYORE drip
            </span>
            <span className="relative z-10 flex items-center justify-center w-12 h-12 border-l border-white/20 group-hover:border-black/20 text-white/60 group-hover:text-black transition-all duration-500">
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
            <span className="absolute inset-0 border border-white/25 group-hover:border-white transition-colors duration-300 pointer-events-none" />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-linear-to-b from-white/50 to-transparent animate-pulse" />
          <span
            className="text-[8px] text-white/20 tracking-[0.45em] uppercase"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* â”€â”€ Section heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex items-center gap-5 px-6 md:px-10 py-10">
        <div className="h-px flex-1 bg-white/10" />
        <span
          className="text-white/25 text-[9px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          Lookbook SS26
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* â”€â”€ Grid 1 â€” brickwork â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="px-2 md:px-4 pb-0.75">
        <div className="grid grid-cols-3 gap-0.75">
          {grid1.map((item, i) => {
            lookNum++;
            const n = lookNum;
            return (
              <div
                key={i}
                className={`relative overflow-hidden group ${item.tall ? "row-span-2" : ""}`}
                style={{ aspectRatio: item.tall ? "2/3" : "4/3" }}
              >
                <Image
                  src={item.src}
                  alt={`Look ${n}`}
                  fill
                  className={`object-cover transition-all duration-700 group-hover:scale-[1.04] ${item.color ? "" : "grayscale group-hover:grayscale-0"}`}
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                <span
                  className="absolute bottom-3 left-3 text-white/40 group-hover:text-white text-[9px] tracking-[0.3em] uppercase transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {String(n).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* â”€â”€ Parallax divider 1 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <ParallaxBand src={DIVIDER_1} label="YORE" />

      {/* â”€â”€ Grid 2 â€” mosaic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="px-2 md:px-4 py-0.75">
        <div className="grid grid-cols-4 gap-0.75">
          {grid2.map((item, i) => {
            lookNum++;
            const n = lookNum;
            const wide = i === 0 || i === 5;
            return (
              <div
                key={i}
                className={`relative overflow-hidden group ${wide ? "col-span-2" : "col-span-1"}`}
                style={{ aspectRatio: wide ? "16/9" : "3/4" }}
              >
                <Image
                  src={item.src}
                  alt={`Look ${n}`}
                  fill
                  className={`object-cover transition-all duration-700 group-hover:scale-[1.03] ${item.color ? "" : "grayscale group-hover:grayscale-0"}`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-all duration-500" />
                <span
                  className="absolute bottom-3 left-3 text-white/30 group-hover:text-white/80 text-[9px] tracking-[0.3em] uppercase transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {String(n).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* â”€â”€ Parallax divider 2 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <ParallaxBand src={DIVIDER_2} />

      {/* â”€â”€ Quote block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-28 px-6 md:px-20 flex flex-col items-center text-center gap-8">
        <p
          className="text-white/10 text-[clamp(4rem,12vw,11rem)] font-black uppercase leading-[0.88] tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          Be
          <br />
          YORE.
        </p>
        <span
          className="text-white/20 text-[9px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          YORE — SS26 — Nitra, Slovakia
        </span>
      </section>

      {/* â”€â”€ Horizontal strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="pb-6">
        <div className="flex items-center justify-between px-6 md:px-10 mb-4">
          <span
            className="text-white/25 text-[9px] tracking-[0.45em] uppercase"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            More looks
          </span>
        </div>
        <div
          ref={stripRef}
          className="flex gap-0.75 overflow-x-auto px-2 md:px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {strip.map((src, i) => {
            lookNum++;
            const n = lookNum;
            return (
              <div
                key={i}
                className="relative shrink-0 overflow-hidden group"
                style={{ width: "300px", height: "450px" }}
              >
                <Image
                  src={src}
                  alt={`Look ${n}`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.04]"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
                <span
                  className="absolute bottom-3 left-3 text-white/30 group-hover:text-white/70 text-[9px] tracking-[0.3em] uppercase transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {String(n).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <footer className="mt-12 border-t border-white/20 py-14 px-6 md:px-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">
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
            className="text-white/40 text-[10px] tracking-[0.35em] uppercase font-medium hover:text-white/80 transition-colors"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Instagram
          </a>
          <a
            href="https://www.flace.sk/yore/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 text-[10px] tracking-[0.35em] uppercase font-medium hover:text-white transition-colors border-b border-white/40 pb-px"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            GetYORE drip
          </a>
          <a
            href="#"
            className="text-white/40 text-[10px] tracking-[0.35em] uppercase font-medium hover:text-white/80 transition-colors"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Contact
          </a>
        </div>
        <span
          className="text-white/40 text-[10px] tracking-[0.2em] font-medium"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          © 2026 YORE
        </span>
      </footer>
    </main>
  );
}
