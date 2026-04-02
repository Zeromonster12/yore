"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpreadPage {
  type: "cover" | "editorial" | "photo" | "product" | "credits";
  image?: string;
  headline?: string;
  sub?: string;
  tag?: string;
  items?: { label: string; value: string }[];
  pageNumber?: number;
}

interface Spread {
  id: number;
  left: SpreadPage;
  right: SpreadPage;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Replace image paths with your actual /photos/... assets

const SPREADS: Spread[] = [
  {
    id: 0,
    left: {
      type: "cover",
      image: "/photos/YORE NITRA/IMG_7099.JPG",
      headline: "YORE",
      sub: "SS26",
    },
    right: {
      type: "editorial",
      tag: "Introduction",
      headline: "Raw terrain.\nNew silhouettes.",
      sub: "Spring/Summer 2026 is an ode to negative space — utilitarian cuts stripped to their architecture, worn against Slovak concrete and open field.",
      pageNumber: 3,
    },
  },
  {
    id: 1,
    left: {
      type: "photo",
      image: "/photos/YORE NITRA/IMG_7099.JPG",
      tag: "Look 01",
      headline: "Field Jacket",
      pageNumber: 4,
    },
    right: {
      type: "product",
      tag: "SS26 — Outerwear",
      headline: "Field Jacket",
      sub: "Washed canvas, dropped shoulder, concealed placket.",
      items: [
        { label: "Ref.",    value: "YR-OW-001"         },
        { label: "Colour",  value: "Stone / Obsidian"  },
        { label: "Fabric",  value: "100% Cotton Canvas" },
        { label: "Fit",     value: "Oversized"          },
        { label: "Price",   value: "€220"               },
      ],
      pageNumber: 5,
    },
  },
  {
    id: 2,
    left: {
      type: "product",
      tag: "SS26 — Bottoms",
      headline: "Cargo Trousers",
      sub: "Six-pocket utility cut, contrast topstitching, drawcord ankle.",
      items: [
        { label: "Ref.",    value: "YR-BT-002"      },
        { label: "Colour",  value: "Ecru / Slate"   },
        { label: "Fabric",  value: "Ripstop Cotton" },
        { label: "Fit",     value: "Relaxed Tapered" },
        { label: "Price",   value: "€160"            },
      ],
      pageNumber: 6,
    },
    right: {
      type: "photo",
      image: "/photos/YORE NITRA/IMG_7099.JPG",
      tag: "Look 02",
      headline: "Cargo Trousers",
      pageNumber: 7,
    },
  },
  {
    id: 3,
    left: {
      type: "photo",
      image: "/photos/YORE NITRA/IMG_7099.JPG",
      tag: "Look 03",
      headline: "Hooded Overshirt",
      pageNumber: 8,
    },
    right: {
      type: "product",
      tag: "SS26 — Tops",
      headline: "Hooded Overshirt",
      sub: "Lightweight technical shell with zip chest pocket and storm hood.",
      items: [
        { label: "Ref.",    value: "YR-TP-003"      },
        { label: "Colour",  value: "Off-White / Tar" },
        { label: "Fabric",  value: "Nylon Ripstop"  },
        { label: "Fit",     value: "Regular"         },
        { label: "Price",   value: "€180"            },
      ],
      pageNumber: 9,
    },
  },
  {
    id: 4,
    left: {
      type: "editorial",
      tag: "Closing",
      headline: "Worn.\nNot dressed.",
      sub: "Every piece in SS26 is designed to carry the weight of use — to improve with wear, to resist the disposable.",
      pageNumber: 10,
    },
    right: {
      type: "credits",
      tag: "Credits",
      headline: "YORE SS26",
      items: [
        { label: "Creative Direction", value: "YORE Studio"            },
        { label: "Photography",        value: "Nitra, Slovakia"         },
        { label: "Season",             value: "Spring / Summer 2026"    },
        { label: "Contact",            value: "studio@yore.sk"          },
      ],
      pageNumber: 11,
    },
  },
];

// ─── Page sub-components ──────────────────────────────────────────────────────

function CoverPage({ page }: { page: SpreadPage }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#161616]">
      {page.image && (
        <Image src={page.image} alt="" fill className="object-cover grayscale" sizes="50vw" priority />
      )}
      <div className="absolute inset-0 bg-[#161616]/50" />
      <div className="absolute bottom-0 left-0 right-0 p-10 flex flex-col gap-1">
        <div className="h-px w-8 bg-[#FAFAFA]/25 mb-5" />
        <span
          className="text-[#FAFAFA]/35 text-[8px] tracking-[0.55em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.sub}
        </span>
        <h2
          className="text-[#FAFAFA] font-black uppercase leading-none tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(52px,7vw,80px)" }}
        >
          {page.headline}
        </h2>
      </div>
    </div>
  );
}

function EditorialPage({ page }: { page: SpreadPage }) {
  return (
    <div className="relative w-full h-full bg-[#FAFAFA] flex flex-col justify-between p-10">
      <div className="flex items-center gap-4">
        <div className="h-px w-6 bg-[#161616]/18" />
        <span
          className="text-[#161616]/30 text-[8px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.tag}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        <h2
          className="text-[#161616] font-black uppercase leading-[0.9] whitespace-pre-line"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,52px)" }}
        >
          {page.headline}
        </h2>
        <p
          className="text-[#161616]/50 text-[10px] leading-[1.85] max-w-[260px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.sub}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#161616]/8" />
        <span
          className="text-[#161616]/20 text-[8px] tracking-[0.35em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {String(page.pageNumber ?? "").padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function PhotoPage({ page }: { page: SpreadPage }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#161616]">
      {page.image && (
        <Image src={page.image} alt={page.headline ?? ""} fill className="object-cover grayscale" sizes="50vw" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/75 via-transparent to-transparent" />
      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
        <div>
          <span
            className="block text-[#FAFAFA]/35 text-[8px] tracking-[0.45em] uppercase mb-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {page.tag}
          </span>
          <span
            className="block text-[#FAFAFA] text-[13px] tracking-[0.18em] uppercase font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {page.headline}
          </span>
        </div>
        <span
          className="text-[#FAFAFA]/20 text-[8px] tracking-[0.35em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {String(page.pageNumber ?? "").padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function ProductPage({ page }: { page: SpreadPage }) {
  return (
    <div className="relative w-full h-full bg-[#FAFAFA] flex flex-col justify-between p-10">
      <div className="flex items-center gap-4">
        <div className="h-px w-6 bg-[#161616]/18" />
        <span
          className="text-[#161616]/30 text-[8px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.tag}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <h3
          className="text-[#161616] font-black uppercase leading-none"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,40px)" }}
        >
          {page.headline}
        </h3>
        <p
          className="text-[#161616]/40 text-[10px] leading-[1.75] max-w-[210px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.sub}
        </p>
      </div>

      <div className="flex flex-col">
        {page.items?.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-[10px] border-b border-[#161616]/8"
          >
            <span
              className="text-[#161616]/30 text-[8px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.label}
            </span>
            <span
              className="text-[#161616]/80 text-[10px] tracking-[0.12em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#161616]/8" />
        <span
          className="text-[#161616]/20 text-[8px] tracking-[0.35em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {String(page.pageNumber ?? "").padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function CreditsPage({ page }: { page: SpreadPage }) {
  return (
    <div className="relative w-full h-full bg-[#161616] flex flex-col justify-between p-10">
      <div className="flex items-center gap-4">
        <div className="h-px w-6 bg-[#FAFAFA]/12" />
        <span
          className="text-[#FAFAFA]/25 text-[8px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.tag}
        </span>
      </div>

      <div className="flex flex-col gap-8">
        <h3
          className="text-[#FAFAFA] font-black uppercase leading-none"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,4vw,44px)" }}
        >
          {page.headline}
        </h3>
        <div className="flex flex-col">
          {page.items?.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-[10px] border-b border-[#FAFAFA]/8"
            >
              <span
                className="text-[#FAFAFA]/25 text-[8px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </span>
              <span
                className="text-[#FAFAFA]/60 text-[10px] tracking-[0.12em]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <span
        className="text-[#FAFAFA]/10 text-[8px] tracking-[0.35em]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {String(page.pageNumber ?? "").padStart(2, "0")}
      </span>
    </div>
  );
}

function Page({ page }: { page: SpreadPage }) {
  switch (page.type) {
    case "cover":     return <CoverPage     page={page} />;
    case "editorial": return <EditorialPage page={page} />;
    case "photo":     return <PhotoPage     page={page} />;
    case "product":   return <ProductPage   page={page} />;
    case "credits":   return <CreditsPage   page={page} />;
    default:          return <div className="w-full h-full bg-[#FAFAFA]" />;
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function LookbookScroll() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const pagesRef    = useRef<(HTMLDivElement | null)[]>([]);
  const indexRef    = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const total = SPREADS.length;

  useEffect(() => {
    if (!sectionRef.current) return;

    const pages = pagesRef.current.filter(Boolean) as HTMLDivElement[];

    // Stack all spreads; higher z-index = later spread (sits on top)
    gsap.set(pages, {
      rotateY: 0,
      transformOrigin: "left center",
      zIndex: (i) => total - i,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 0.9,
        start: "top top",
        end: `+=${total * 1000}`,
        onUpdate(self) {
          const idx = Math.min(Math.floor(self.progress * total), total - 1);
          if (indexRef.current) {
            indexRef.current.textContent = String(idx + 1).padStart(2, "0");
          }
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    // Each step: current top spread rotates away to reveal next
    pages.forEach((page, i) => {
      tl.to(
        page,
        { rotateY: -180, ease: "power2.inOut", duration: 1 },
        i // sequence them one after another
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [total]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-10 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(250,250,250,0.06)" }}
      >
        <span
          className="text-[#FAFAFA] text-[9px] tracking-[0.55em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          YORE — SS26 Lookbook
        </span>

        <div
          className="flex items-center gap-2 text-[9px] tracking-[0.3em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span ref={indexRef} className="text-[#FAFAFA]">01</span>
          <span className="text-[#FAFAFA]/20">/</span>
          <span className="text-[#FAFAFA]/25">{String(total).padStart(2, "0")}</span>
        </div>
      </div>

      {/* ── Progress ────────────────────────────────────────────── */}
      <div className="h-px w-full flex-shrink-0" style={{ background: "rgba(250,250,250,0.06)" }}>
        <div
          ref={progressRef}
          className="h-full"
          style={{ width: "0%", background: "rgba(250,250,250,0.35)", transition: "none" }}
        />
      </div>

      {/* ── Book stage ──────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        {/* Perspective wrapper */}
        <div
          className="relative"
          style={{
            width: "min(900px, 88vw)",
            height: "min(560px, 72vh)",
            perspective: "2000px",
          }}
        >
          {/* Soft shadow beneath book */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: "-20px",
              left: "8%",
              right: "8%",
              height: "32px",
              background: "rgba(0,0,0,0.55)",
              filter: "blur(22px)",
              borderRadius: "50%",
            }}
          />

          {/* Book — preserve-3d so children flip in real 3D */}
          <div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SPREADS.map((spread, i) => (
              <div
                key={spread.id}
                ref={(el) => { pagesRef.current[i] = el; }}
                className="absolute inset-0 flex"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  zIndex: total - i,
                  boxShadow: "6px 0 28px rgba(0,0,0,0.45), -2px 0 8px rgba(0,0,0,0.2)",
                }}
              >
                {/* Left page */}
                <div className="relative flex-1 overflow-hidden" style={{ borderRight: "1px solid #0d0d0d" }}>
                  <Page page={spread.left} />
                </div>

                {/* Spine */}
                <div
                  className="relative flex-shrink-0"
                  style={{
                    width: "3px",
                    background: "linear-gradient(to right, #0a0a0a, #1e1e1e, #0a0a0a)",
                    zIndex: 2,
                  }}
                />

                {/* Right page */}
                <div className="relative flex-1 overflow-hidden">
                  <Page page={spread.right} />
                </div>

                {/* Centre crease gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0) 46%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0) 54%)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Scroll hint — auto-fades after 3 s */}
          <div
            className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ animation: "hintFade 1s ease 3.5s forwards" }}
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" style={{ opacity: 0.22 }}>
              <rect x="1" y="1" width="12" height="20" rx="6" stroke="#FAFAFA" strokeWidth="1" />
              <rect
                x="6" y="4" width="2" height="5" rx="1" fill="#FAFAFA"
                style={{ animation: "dotBounce 1.3s ease-in-out infinite" }}
              />
            </svg>
            <span
              className="text-[#FAFAFA]/20 text-[7px] tracking-[0.5em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-10 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(250,250,250,0.06)" }}
      >
        <span
          className="text-[#FAFAFA]/18 text-[8px] tracking-[0.45em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Scroll to turn pages
        </span>
        <span
          className="text-[#FAFAFA]/18 text-[8px] tracking-[0.45em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          yore.sk
        </span>
      </div>

      <style>{`
        @keyframes hintFade {
          to { opacity: 0; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
}
