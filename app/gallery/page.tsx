"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const GALLERY_IMAGES = [
	"/photos/YORE%20NITRA/4.png",
	"/photos/YORE%20NITRA/deso6.jpg",
	"/photos/YORE%20NITRA/deso7.jpg",
	"/photos/YORE%20NITRA/deso8.jpg",
	"/photos/YORE%20NITRA/IMG_4941.JPG",
	"/photos/YORE%20NITRA/IMG_4961.JPG",
	"/photos/YORE%20NITRA/IMG_6393.JPG",
	"/photos/YORE%20NITRA/IMG_6421.JPG",
	"/photos/YORE%20NITRA/IMG_6455.JPG",
	"/photos/YORE%20NITRA/IMG_6481.JPG",
	"/photos/YORE%20NITRA/IMG_6495.JPG",
	"/photos/YORE%20NITRA/IMG_6579.JPG",
	"/photos/YORE%20NITRA/IMG_6587.JPG",
	"/photos/YORE%20NITRA/IMG_6599.JPG",
	"/photos/YORE%20NITRA/IMG_6601.JPG",
	"/photos/YORE%20NITRA/IMG_6635.JPG",
	"/photos/YORE%20NITRA/IMG_6932.JPG",
	"/photos/YORE%20NITRA/IMG_6939.JPG",
	"/photos/YORE%20NITRA/IMG_6988.JPG",
	"/photos/YORE%20NITRA/IMG_7016.JPG",
	"/photos/YORE%20NITRA/IMG_7034.JPG",
	"/photos/YORE%20NITRA/IMG_7037.JPG",
	"/photos/YORE%20NITRA/IMG_7099.JPG",
	"/photos/YORE%20NITRA/IMG_7120.JPG",
	"/photos/YORE%20NITRA/IMG_7155.JPG",
	"/photos/YORE%20NITRA/IMG_7433.JPG",
	"/photos/YORE%20NITRA/IMG_7434.JPG",
	"/photos/YORE%20NITRA/IMG_7435.JPG",
	"/photos/YORE%20NITRA/IMG_7441.JPG",
	"/photos/YORE%20NITRA/IMG_7448.JPG",
	"/photos/YORE%20NITRA/IMG_7454.JPG",
	"/photos/YORE%20NITRA/IMG_7464.JPG",
	"/photos/YORE%20NITRA/IMG_7468.JPG",
	"/photos/YORE%20NITRA/IMG_7493.JPG",
	"/photos/YORE%20NITRA/IMG_7519.JPG",
	"/photos/YORE%20NITRA/IMG_7522.JPG",
	"/photos/YORE%20NITRA/IMG_7525.JPG",
	"/photos/YORE%20NITRA/IMG_7526.JPG",
	"/photos/YORE%20NITRA/IMG_7554.JPG",
	"/photos/YORE%20NITRA/IMG_7558.JPG",
	"/photos/YORE%20NITRA/IMG_7561.JPG",
	"/photos/YORE%20NITRA/IMG_7580.JPG",
	"/photos/YORE%20NITRA/IMG_7590.JPG",
	"/photos/YORE%20NITRA/IMG_7594.JPG",
	"/photos/YORE%20NITRA/IMG_7607.JPG",
	"/photos/YORE%20NITRA/IMG_7613.JPG",
	"/photos/YORE%20NITRA/IMG_7626.JPG",
	"/photos/YORE%20NITRA/IMG_7659.JPG",
	"/photos/YORE%20NITRA/IMG_7661.JPG",
	"/photos/YORE%20NITRA/uprava4yore.jpg",
];

function getTileSizeClasses(index: number) {
	if (index === 0) {
		return "col-span-2 row-span-2";
	}

	const pattern = index % 10;

	if (pattern === 1 || pattern === 6) {
		return "row-span-1";
	}

	if (pattern === 3 || pattern === 8) {
		return "col-span-2 row-span-2";
	}

	if (pattern === 5) {
		return "row-span-3";
	}

	return "row-span-2";
}

export default function GalleryPage() {
	const [activeImage, setActiveImage] = useState<string | null>(null);
	const activeImageIndex = activeImage ? GALLERY_IMAGES.indexOf(activeImage) : -1;
	const [heroImage, ...gridImages] = GALLERY_IMAGES;

	const showPreviousImage = () => {
		if (activeImageIndex === -1) return;
		const previousIndex =
			(activeImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
		setActiveImage(GALLERY_IMAGES[previousIndex]);
	};

	const showNextImage = () => {
		if (activeImageIndex === -1) return;
		const nextIndex = (activeImageIndex + 1) % GALLERY_IMAGES.length;
		setActiveImage(GALLERY_IMAGES[nextIndex]);
	};

	useEffect(() => {
		if (!activeImage) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setActiveImage(null);
				return;
			}

			if (event.key === "ArrowLeft") {
				event.preventDefault();
				setActiveImage((currentImage) => {
					if (!currentImage) return null;
					const currentIndex = GALLERY_IMAGES.indexOf(currentImage);
					if (currentIndex === -1) return currentImage;

					const previousIndex =
						(currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
					return GALLERY_IMAGES[previousIndex];
				});
				return;
			}

			if (event.key === "ArrowRight") {
				event.preventDefault();
				setActiveImage((currentImage) => {
					if (!currentImage) return null;
					const currentIndex = GALLERY_IMAGES.indexOf(currentImage);
					if (currentIndex === -1) return currentImage;

					const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
					return GALLERY_IMAGES[nextIndex];
				});
			}
		};

		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [activeImage]);

	const openLightbox = (imagePath: string) => setActiveImage(imagePath);
	const closeLightbox = () => setActiveImage(null);

	return (
		<main className="min-h-screen bg-[#161616] text-[#FAFAFA] overflow-x-hidden">
			<nav
				className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
				style={{ marginTop: "1rem", marginLeft: "1rem" }}
			>
				<a href="/" aria-label="Go to home">
					<Image
						src="/yoremini.png"
						alt="YORE"
						width={48}
						height={28}
						className="invert brightness-200"
						priority
					/>
				</a>

				<ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
					<li>
						<a
							href="/"
							className="text-[#FAFAFA]/70 hover:text-[#FAFAFA] text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
							style={{ fontFamily: "var(--font-body), sans-serif" }}
						>
							Home
						</a>
					</li>
					<li>
						<a
							href="/gallery"
							className="text-[#FAFAFA]/70 hover:text-[#FAFAFA] text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
							style={{ fontFamily: "var(--font-body), sans-serif" }}
						>
							Gallery
						</a>
					</li>
				</ul>
			</nav>

			<div aria-hidden="true" className="h-28 md:h-32" />

			<section className="px-4 md:px-8 pt-8 pb-14 flex justify-center">
				{GALLERY_IMAGES.length === 0 ? (
					<p
						className="text-[#FAFAFA]/60 text-sm"
						style={{ fontFamily: "var(--font-body), sans-serif" }}
					>
						No images found in public/photos.
					</p>
				) : (
					<div className="w-full max-w-7xl flex flex-col gap-3 md:gap-4">
						{heroImage && (
							<button
								type="button"
								onClick={() => openLightbox(heroImage)}
								className="group relative w-full overflow-hidden rounded-sm bg-[#1f1f1f]"
								style={{ aspectRatio: "21 / 9" }}
								aria-label="Open featured gallery image"
							>
								<Image
									src={heroImage}
									alt="Featured gallery image"
									fill
									priority
									className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
									sizes="100vw"
								/>
							</button>
						)}

						<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 grid-flow-dense gap-3 md:gap-4 auto-rows-[110px] md:auto-rows-[130px]">
							{gridImages.map((imagePath, index) => (
								<button
									type="button"
									key={imagePath}
									onClick={() => openLightbox(imagePath)}
									className={`group relative h-full rounded-sm overflow-hidden bg-[#1f1f1f] ${getTileSizeClasses(index)}`}
									aria-label={`Open gallery image ${index + 2}`}
								>
									<Image
										src={imagePath}
										alt={`Gallery image ${index + 2}`}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
										sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 34vw"
									/>
								</button>
							))}
						</div>
					</div>
				)}
			</section>

			<section className="py-20 px-6 md:px-20 flex flex-col items-center text-center gap-8 !mt-10">
				<Image
					src="/postavygallery.png"
					alt="BeYORE"
					width={900}
					height={300}
					className="w-[70vw] md:w-[40vw] h-auto select-none"
				/>
			</section>

			<footer
				className="mt-12 border-white/20 py-14 px-6 md:px-10 flex flex-col items-center gap-8 md:flex-row md:justify-between"
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

			{activeImage && (
				<div
					className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 md:p-8"
					style={{ zIndex: 120 }}
					onClick={closeLightbox}
					role="dialog"
					aria-modal="true"
					aria-label="Image lightbox"
				>
					<button
						type="button"
						onClick={closeLightbox}
						className="absolute top-4 right-4 md:top-6 md:right-6 text-white/85 hover:text-white text-xs tracking-[0.35em] uppercase"
						style={{ fontFamily: "var(--font-body), sans-serif" }}
					>
						Close
					</button>

					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							showPreviousImage();
						}}
						className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/35 bg-black/30 text-white/90 hover:text-white hover:border-white/60 transition-colors"
						aria-label="Show previous image"
					>
						Prev
					</button>

					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							showNextImage();
						}}
						className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/35 bg-black/30 text-white/90 hover:text-white hover:border-white/60 transition-colors"
						aria-label="Show next image"
					>
						Next
					</button>

					<div
						className="relative w-full"
						style={{ maxWidth: "1400px", height: "82vh" }}
						onClick={(event) => event.stopPropagation()}
					>
						<Image
							src={activeImage}
							alt="Opened gallery image"
							fill
							priority
							className="object-contain"
							sizes="100vw"
						/>
						{activeImageIndex >= 0 && (
							<span
								className="absolute left-1/2 -translate-x-1/2 bottom-3 md:bottom-4 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/70"
								style={{ fontFamily: "var(--font-body), sans-serif" }}
							>
								{activeImageIndex + 1} / {GALLERY_IMAGES.length}
							</span>
						)}
					</div>
				</div>
			)}
		</main>
	);
}
