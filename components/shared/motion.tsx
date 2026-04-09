"use client";

import { motion } from "framer-motion";

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

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
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
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
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
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
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export { fadeUp, stagger };
