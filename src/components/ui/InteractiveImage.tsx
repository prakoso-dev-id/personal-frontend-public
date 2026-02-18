"use client";

import { cn } from "@/lib/utils";
import { useLightboxStore } from "@/store/useLightboxStore";
import { motion } from "framer-motion";

interface InteractiveImageProps {
    src: string;
    alt: string;
    className?: string;
    index: number;
    allImages: Array<{ src: string; alt: string }>;
}

export default function InteractiveImage({
    src,
    alt,
    className,
    index,
    allImages,
}: InteractiveImageProps) {
    const open = useLightboxStore((state) => state.open);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={cn("cursor-pointer overflow-hidden", className)}
            onClick={() => open(index, allImages)}
        >
            <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
        </motion.div>
    );
}
