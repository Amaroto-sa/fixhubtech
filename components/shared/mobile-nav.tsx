"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function MobileNav({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const drawerContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
                        aria-hidden="true"
                    />
                    {/* Sidebar Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        className="fixed inset-y-0 left-0 w-[280px] bg-[#0a0a0e] border-r border-white/10 z-[110] md:hidden shadow-2xl flex flex-col"
                    >
                        <div className="absolute top-4 right-4 z-50">
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto w-full h-full [&>div]:h-full [&>div]:w-full">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="p-2 -ml-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors md:hidden"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>
            {mounted && typeof document !== "undefined" ? createPortal(drawerContent, document.body) : null}
        </>
    );
}
