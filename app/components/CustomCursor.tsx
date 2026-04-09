"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 24;

export default function CustomCursor() {
	const cursorRef = useRef<HTMLDivElement | null>(null);
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const finePointerMedia = window.matchMedia("(pointer: fine)");
		const reducedMotionMedia = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		);

		const syncCursorAvailability = () => {
			setEnabled(finePointerMedia.matches && !reducedMotionMedia.matches);
		};

		syncCursorAvailability();

		finePointerMedia.addEventListener("change", syncCursorAvailability);
		reducedMotionMedia.addEventListener("change", syncCursorAvailability);

		return () => {
			finePointerMedia.removeEventListener("change", syncCursorAvailability);
			reducedMotionMedia.removeEventListener("change", syncCursorAvailability);
		};
	}, []);

	useEffect(() => {
		if (!enabled) {
			document.body.classList.remove("cursor-custom-enabled");
			return;
		}

		const cursor = cursorRef.current;
		if (!cursor) return;

		document.body.classList.add("cursor-custom-enabled");

		let rafId = 0;
		let pointerX = window.innerWidth / 2;
		let pointerY = window.innerHeight / 2;
		let currentX = pointerX;
		let currentY = pointerY;

		const animate = () => {
			currentX += (pointerX - currentX) * 0.22;
			currentY += (pointerY - currentY) * 0.22;

			cursor.style.transform = `translate3d(${currentX - CURSOR_SIZE / 2}px, ${currentY - CURSOR_SIZE / 2}px, 0)`;
			rafId = window.requestAnimationFrame(animate);
		};

		const handleMove = (event: MouseEvent) => {
			pointerX = event.clientX;
			pointerY = event.clientY;
			cursor.classList.add("custom-cursor--visible");
		};

		const handleLeave = () => {
			cursor.classList.remove("custom-cursor--visible");
		};

		window.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseleave", handleLeave);
		window.addEventListener("blur", handleLeave);

		rafId = window.requestAnimationFrame(animate);

		return () => {
			window.cancelAnimationFrame(rafId);
			window.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseleave", handleLeave);
			window.removeEventListener("blur", handleLeave);
			document.body.classList.remove("cursor-custom-enabled");
		};
	}, [enabled]);

	if (!enabled) return null;

	return (
		<div
			ref={cursorRef}
			className="custom-cursor"
			style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
			aria-hidden="true"
		>
			<Image
				src="/cursor1.png"
				alt=""
				width={CURSOR_SIZE}
				height={CURSOR_SIZE}
				className="custom-cursor__image"
			/>
		</div>
	);
}
