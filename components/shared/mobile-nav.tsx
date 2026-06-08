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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] md:hidden bg-background/95 backdrop-blur-3xl flex flex-col"
                >
                    {/* Header bar inside menu */}
                    <div className="flex items-center justify-end h-20 px-6 border-b border-white/[0.05]">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-white/[0.08]"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    {/* Menu Content container with custom scrollbar styling */}
                    <div className="flex-1 overflow-y-auto w-full px-6 py-8 mobile-nav-content">
                        {/* We use a wrapper to stagger children if needed, but since children are passed as a server/client component prop (the sidebar), we rely on it rendering properly. */}
                        <div className="max-w-md mx-auto w-full pb-12">
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors md:hidden"
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>
            {mounted && typeof document !== "undefined" ? createPortal(drawerContent, document.body) : null}
        </>
    );
}
