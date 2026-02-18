"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLightboxStore } from "@/store/useLightboxStore";
import { cn } from "@/lib/utils";

export default function Lightbox() {
    const { isOpen, currentIndex, images, close, setIndex } = useLightboxStore();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        startIndex: currentIndex,
    });

    // Sync embla index with store
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        emblaApi.reInit();
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Sync store index with embla when opened
    useEffect(() => {
        if (emblaApi && isOpen) {
            emblaApi.scrollTo(currentIndex, true);
        }
    }, [emblaApi, isOpen, currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
            if (e.key === "ArrowRight") emblaApi?.scrollNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, close, emblaApi]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) close();
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={close}
                        className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-white/20"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Navigation buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => emblaApi?.scrollPrev()}
                                className="absolute left-4 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-white/20 md:left-8"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                            <button
                                onClick={() => emblaApi?.scrollNext()}
                                className="absolute right-4 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-white/20 md:right-8"
                            >
                                <ChevronRight className="h-8 w-8" />
                            </button>
                        </>
                    )}

                    {/* Carousel */}
                    <div className="h-full w-full overflow-hidden" ref={emblaRef}>
                        <div className="flex h-full touch-pan-y">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative flex min-w-0 flex-[0_0_100%] items-center justify-center p-4 md:p-12"
                                >
                                    <motion.img
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{
                                            scale: index === currentIndex ? 1 : 0.9,
                                            opacity: index === currentIndex ? 1 : 0.5,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        src={img.src}
                                        alt={img.alt}
                                        className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80">
                        {currentIndex + 1} / {images.length}
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
