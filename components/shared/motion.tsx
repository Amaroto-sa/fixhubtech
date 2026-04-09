"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 300, damping: 24 },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

// ============================================================================
// CORE REVEAL COMPONENTS (Upgraded to Spring Physics)
// ============================================================================

export function SectionReveal({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeIn({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function ScaleIn({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SlideInLeft({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SlideInRight({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ============================================================================
// PREMIUM INTERACTIVE COMPONENTS (New)
// ============================================================================

export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(99, 102, 241, 0.15)", // Premium Indigo Glow
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className={`relative overflow-hidden card-elevated group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
                }}
            />
            {/* Inner border glass highlight */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 pointer-events-none" />

            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

export { fadeUp, stagger };
