import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function toPublicSrc(relativePath: string) {
	return `/${relativePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

function getGalleryImages() {
	const photosRoot = path.join(process.cwd(), "public", "photos");
	const collected: string[] = [];

	const walk = (dirPath: string, relativeDir = "") => {
		const entries = fs.readdirSync(dirPath, { withFileTypes: true });

		for (const entry of entries) {
			const nextRelative = relativeDir
				? path.join(relativeDir, entry.name)
				: entry.name;
			const absolutePath = path.join(dirPath, entry.name);

			if (entry.isDirectory()) {
				walk(absolutePath, nextRelative);
				continue;
			}

			const ext = path.extname(entry.name).toLowerCase();
			if (IMAGE_EXTENSIONS.has(ext)) {
				collected.push(path.join("photos", nextRelative));
			}
		}
	};

	walk(photosRoot);
	return collected.sort((a, b) => a.localeCompare(b));
}

export default function GalleryPage() {
	const images = getGalleryImages();

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
							<article key={imagePath} className="relative rounded-sm overflow-hidden bg-[#1f1f1f] aspect-[3/4]">
								<Image
									src={toPublicSrc(imagePath)}
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
