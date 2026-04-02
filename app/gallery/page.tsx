import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

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

export default function GalleryPage() {
	const images = GALLERY_IMAGES;

	return (
		<main className="min-h-screen bg-[#161616] text-[#FAFAFA] overflow-x-hidden">
			<nav className="sticky top-0 z-50 bg-[#161616]/90 backdrop-blur-sm border-b border-[#FAFAFA]/10">
				<div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
					<Link href="/" className="text-[#FAFAFA] text-[12px] tracking-[0.35em] uppercase">
						Yore
					</Link>
					<div className="flex items-center gap-8">
						<Link
							href="/"
							className="text-[#FAFAFA]/70 hover:text-[#FAFAFA] text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
							style={{ fontFamily: "var(--font-body), sans-serif" }}
						>
							Home
						</Link>
						<Link
							href="/gallery"
							className="text-[#FAFAFA] text-[10px] tracking-[0.35em] uppercase"
							style={{ fontFamily: "var(--font-body), sans-serif" }}
						>
							Gallery
						</Link>
					</div>
				</div>
			</nav>

			<section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
				<h1
					className="text-[#FAFAFA] text-3xl md:text-4xl uppercase tracking-[0.12em] mb-8 md:mb-10"
					style={{ fontFamily: "var(--font-display), sans-serif" }}
				>
					Gallery
				</h1>

				{images.length === 0 ? (
					<p
						className="text-[#FAFAFA]/60 text-sm"
						style={{ fontFamily: "var(--font-body), sans-serif" }}
					>
						No images found in public/photos.
					</p>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
						{images.map((imagePath, index) => (
							<article key={imagePath} className="relative rounded-sm overflow-hidden bg-[#1f1f1f] aspect-3/4">
								<Image
									src={imagePath}
									alt={`Gallery image ${index + 1}`}
									fill
									className="object-cover transition-transform duration-500 hover:scale-[1.03]"
									sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
								/>
							</article>
						))}
					</div>
				)}
			</section>
		</main>
	);
}
