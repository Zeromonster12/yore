"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpreadPage {
  type: "cover" | "editorial" | "photo" | "product" | "credits" | "back-cover";
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

// ─── Lookbook data ─────────────────────────────────────────────────────────────

const SPREADS: Spread[] = [
  // Spread 0 — the physical book cover (shown before any flip)
  {
    id: 0,
    left: {
      type: "cover",
      image: "/lookbookcover.png",
      headline: "",
      sub: "",
    },
    right: {
      type: "editorial",
      image: "/photos/YORE NITRA/IMG_7099.JPG",
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
        { label: "Ref.",   value: "YR-OW-001"          },
        { label: "Colour", value: "Stone / Obsidian"   },
        { label: "Fabric", value: "100% Cotton Canvas" },
        { label: "Fit",    value: "Oversized"           },
        { label: "Price",  value: "€220"                },
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
        { label: "Ref.",   value: "YR-BT-002"       },
        { label: "Colour", value: "Ecru / Slate"    },
        { label: "Fabric", value: "Ripstop Cotton"  },
        { label: "Fit",    value: "Relaxed Tapered" },
        { label: "Price",  value: "€160"             },
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
        { label: "Ref.",   value: "YR-TP-003"       },
        { label: "Colour", value: "Off-White / Tar" },
        { label: "Fabric", value: "Nylon Ripstop"   },
        { label: "Fit",    value: "Regular"          },
        { label: "Price",  value: "€180"             },
      ],
      pageNumber: 9,
    },
  },
  {
    id: 4,
    left: {
      type: "editorial",
      image: "/photos/YORE NITRA/IMG_7580.JPG",
      tag: "Closing",
      headline: "Worn.\nNot dressed.",
      sub: "Every piece in SS26 is designed to carry the weight of use — to improve with wear, to resist the disposable.",
      pageNumber: 10,
    },
    right: {
      type: "credits",
      image: "/photos/YORE NITRA/IMG_7580.JPG",
      tag: "Credits",
      headline: "YORE SS26",
      items: [
        { label: "Creative Direction", value: "YORE Studio"         },
        { label: "Photography",        value: "Nitra, Slovakia"      },
        { label: "Season",             value: "Spring / Summer 2026" },
        { label: "Contact",            value: "studio@yore.sk"       },
      ],
      pageNumber: 11,
    },
  },
  // Spread 5 — physical back cover (revealed after all flips)
  {
    id: 5,
    left: {
      type: "back-cover",
      image: "/photos/YORE NITRA/IMG_7580.JPG",
    },
    right: {
      type: "back-cover",
      image: "/photos/YORE NITRA/IMG_7099.JPG",
    },
  },
];

// Tab colours matching the reference image (yellow, lavender, pink, green, coral, pink-hot, yellow-warm)
const TAB_COLORS = ["#F5E642", "#C8B8E8", "#F472B6", "#86EFAC", "#FB923C", "#F9A8D4", "#FDE68A"];

function EdgeTab({ index }: { index: number }) {
  const tabColor = TAB_COLORS[index % TAB_COLORS.length];
  const topOffsetPx = 48 + index * 28;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        right: "-28px",
        top: `${topOffsetPx}px`,
        zIndex: 201,
      }}
    >
      <div
        style={{
          width: "24px",
          height: "22px",
          background: tabColor,
          borderRadius: "0 3px 3px 0",
          boxShadow: "2px 1px 4px rgba(0,0,0,0.4), inset -1px 0 0 rgba(0,0,0,0.15)",
          opacity: 0.88,
        }}
      />
    </div>
  );
}

// ─── Page sub-components ──────────────────────────────────────────────────────

function CoverPage({ page }: { page: SpreadPage }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#1a1a1a" }}>
      {page.image && (
        <Image src={page.image} alt="" fill className="object-cover" sizes="50vw" priority />
      )}
      <div className="absolute inset-0" style={{ background: "rgba(22,22,22,0.45)" }} />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <span
          className="text-[#FAFAFA]/50 text-[8px] tracking-[0.6em] uppercase mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.sub}
        </span>
        <h2
          className="text-[#FAFAFA] font-black uppercase leading-none tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6vw, 76px)" }}
        >
          {page.headline}
        </h2>
      </div>
    </div>
  );
}

function EditorialPage({ page }: { page: SpreadPage }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#1a1a1a" }}>
      {page.image && (
        <Image src={page.image} alt="" fill className="object-cover" sizes="50vw" />
      )}
      <div className="absolute inset-0" style={{ background: "rgba(22,22,22,0.42)" }} />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.55) 100%)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <span
          className="text-[#FAFAFA]/45 text-[8px] tracking-[0.5em] uppercase mb-5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.tag}
        </span>
        <h2
          className="text-[#FAFAFA] font-black uppercase leading-[0.9] whitespace-pre-line"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 50px)" }}
        >
          {page.headline}
        </h2>
        <p
          className="text-[#FAFAFA]/65 text-[10px] leading-[1.85] max-w-[260px] mt-5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.sub}
        </p>
      </div>
      <div className="absolute bottom-7 left-8 right-8 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "rgba(250,250,250,0.18)" }} />
        <span
          className="text-[#FAFAFA]/40 text-[8px] tracking-[0.35em]"
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
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#161616" }}>
      {page.image && (
        <Image src={page.image} alt={page.headline ?? ""} fill className="object-cover" sizes="50vw" />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 45%, rgba(0,0,0,0.7) 100%)" }}
      />
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
          className="text-[#FAFAFA]/30 text-[8px] tracking-[0.35em]"
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
    <div
      className="relative w-full h-full flex flex-col justify-between p-9"
      style={{ background: "#FAFAFA" }}
    >
      <div className="relative flex items-center gap-4">
        <div className="h-px w-6" style={{ background: "rgba(22,22,22,0.18)" }} />
        <span
          className="text-[#161616]/30 text-[8px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {page.tag}
        </span>
      </div>
      <div className="relative flex flex-col gap-3">
        <h3
          className="text-[#161616] font-black uppercase leading-none"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.5vw, 38px)" }}
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
      <div className="relative flex flex-col">
        {page.items?.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-[9px]"
            style={{ borderBottom: "1px solid rgba(22,22,22,0.08)" }}
          >
            <span
              className="text-[#161616]/30 text-[8px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.label}
            </span>
            <span
              className="text-[#161616]/75 text-[10px] tracking-[0.12em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "rgba(22,22,22,0.08)" }} />
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
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#161616" }}>
      {page.image && (
        <Image src={page.image} alt="" fill className="object-cover opacity-30" sizes="50vw" />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(22,22,22,0.65)" }}
      />
      <div className="relative w-full h-full flex flex-col justify-between p-9">
        <div className="flex items-center gap-4">
          <div className="h-px w-6" style={{ background: "rgba(250,250,250,0.12)" }} />
          <span
            className="text-[#FAFAFA]/25 text-[8px] tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {page.tag}
          </span>
        </div>
        <div className="flex flex-col gap-7">
          <h3
            className="text-[#FAFAFA] font-black uppercase leading-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)" }}
          >
            {page.headline}
          </h3>
          <div className="flex flex-col">
            {page.items?.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-[9px]"
                style={{ borderBottom: "1px solid rgba(250,250,250,0.08)" }}
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
    </div>
  );
}

// ── Back cover ────────────────────────────────────────────────────────────────
function BackCoverPage({ page }: { page: SpreadPage }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: "#1c1c1c" }}
    >
      {page.image && (
        <Image src={page.image} alt="" fill className="object-cover" sizes="50vw" />
      )}
    </div>
  );
}

function Page({ page }: { page: SpreadPage }) {
  switch (page.type) {
    case "cover":      return <CoverPage     page={page} />;
    case "editorial":  return <EditorialPage page={page} />;
    case "photo":      return <PhotoPage     page={page} />;
    case "product":    return <ProductPage   page={page} />;
    case "credits":    return <CreditsPage   page={page} />;
    case "back-cover": return <BackCoverPage page={page} />;
    default:           return <BackCoverPage page={page} />;
  }
}

// ─── Notebook cover shell ─────────────────────────────────────────────────────
// Wraps the book and adds physical notebook details:
// thick cover boards, visible tab stickers on the right edge, bottom ribbon

function NotebookShell({
  children,
  bookW,
  bookH,
}: {
  children: React.ReactNode;
  bookW: string;
  bookH: string;
}) {
  // Board thickness (CSS units)
  const boardThickness = 10;

  return (
    <div
      className="relative"
      style={{
        // Extra room for bottom ribbon + shadow
        paddingBottom: "28px",
      }}
    >
      {/* ── Bottom thick board edge (gives depth illusion) ── */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "20px",
          height: `${boardThickness}px`,
          background: "linear-gradient(to bottom, #2a2a2a, #111)",
          borderRadius: "0 0 3px 3px",
          width: bookW,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* ── Main book block ─────────────────────────────── */}
      <div
        className="relative"
        style={{
          width: bookW,
          height: bookH,
          perspective: "2200px",
        }}
      >
        {/* ── Bottom ribbon bookmark ───────────────────────── */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-18px",
            left: "22%",
            width: "9px",
            height: "38px",
            background: "linear-gradient(to bottom, #1a1a1a 0%, #0d0d0d 100%)",
            borderRadius: "0 0 3px 3px",
            zIndex: 4,
            boxShadow: "1px 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          {/* ribbon split end */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "12px",
              background: "linear-gradient(135deg, #0d0d0d 50%, transparent 50%), linear-gradient(-135deg, #0d0d0d 50%, transparent 50%)",
              backgroundSize: "50% 100%",
              backgroundPosition: "left, right",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Actual spreads live here */}
        {children}
      </div>

    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function LookbookScroll() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const total = SPREADS.length;

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const pages = gsap.utils.toArray<HTMLDivElement>(".lookbook-spread");
      if (!pages.length) return;

      gsap.set(pages, {
        rotateY: 0,
        transformOrigin: "left center",
        zIndex: (i: number) => 30 + total - i,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          start: "top top",
          end: `+=${total * 1200}`,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      pages.forEach((page, i) => {
        tl.to(page, { rotateY: -180, ease: "power2.inOut", duration: 1 }, i);
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [total]);

  const BOOK_W = "50vw";
  const BOOK_H = "50vh";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col overflow-hidden"
      style={{ background: "#0f0f0f" }}
    >
      {/* ── Progress bar ─────────────────────────────────────── */}
      <div className="h-px w-full flex-shrink-0" style={{ background: "rgba(250,250,250,0.06)" }}>
        <div
          ref={progressRef}
          className="h-full"
          style={{ width: "0%", background: "rgba(250,250,250,0.3)", transition: "none" }}
        />
      </div>

      {/* ── Centre stage ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center">
        <NotebookShell bookW={BOOK_W} bookH={BOOK_H}>
          {/* preserve-3d so spread children flip in 3D */}
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              backgroundColor: "#1a1a1a",
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%), linear-gradient(rgba(22,22,22,0.45), rgba(22,22,22,0.45)), url('/lookbookcover.png')",
              backgroundSize: "100% 100%, 100% 100%, cover",
              backgroundPosition: "center, center, center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {SPREADS.map((spread, i) => {
              const isSinglePhotoSpread = i === 0 || i === total - 1;
              const singleSpreadPage = spread.left.image ? spread.left : spread.right;

              return (
                <div
                  key={spread.id}
                  className="lookbook-spread absolute inset-0 flex"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    background: "#101010",
                    opacity: 1,
                    zIndex: 30 + total - i,
                    // crisp page-edge shadow
                    boxShadow:
                      "4px 0 20px rgba(0,0,0,0.5), -1px 0 6px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Border/frame tied to the flipping spread */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      inset: "-4px -5px -4px -5px",
                      border: "5px solid #1a1a1a",
                      borderRadius: "2px 4px 4px 2px",
                      zIndex: 6,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  />
                  <EdgeTab index={i} />
                  {isSinglePhotoSpread ? (
                      <div className="relative w-full h-full overflow-hidden" style={{ background: "#101010" }}>
                      <Page page={singleSpreadPage} />
                    </div>
                  ) : (
                    <>
                      {/* Left page */}
                      <div
                        className="relative overflow-hidden"
                        style={{ flex: 1, borderRight: "1px solid #0a0a0a" }}
                      >
                        <Page page={spread.left} />
                      </div>

                      {/* Spine */}
                      <div
                        className="relative flex-shrink-0"
                        style={{
                          width: "4px",
                          background:
                            "linear-gradient(to right, #080808 0%, #2a2a2a 50%, #080808 100%)",
                          zIndex: 2,
                          boxShadow: "0 0 8px rgba(0,0,0,0.6)",
                        }}
                      />

                      {/* Right page */}
                      <div className="relative overflow-hidden" style={{ flex: 1 }}>
                        <Page page={spread.right} />
                      </div>

                      {/* Centre crease shadow */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(0,0,0,0) 44%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0) 56%)",
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </NotebookShell>
      </div>

      {/* ── Scroll hint ───────────────────────────────────────── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ animation: "hintFade 1s ease 3.5s forwards" }}
      >
        <svg width="13" height="20" viewBox="0 0 13 20" fill="none" style={{ opacity: 0.2 }}>
          <rect x="0.5" y="0.5" width="12" height="19" rx="6" stroke="#FAFAFA" strokeWidth="1" />
          <rect
            x="5.5" y="3" width="2" height="5" rx="1" fill="#FAFAFA"
            style={{ animation: "dotBounce 1.3s ease-in-out infinite" }}
          />
        </svg>
        <span
          className="text-[#FAFAFA]/18 text-[7px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes hintFade  { to { opacity: 0; } }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
}
