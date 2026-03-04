"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavigationProps {
    theme: "dark" | "light";
    toggleTheme: () => void;
}

export const Navigation = ({ theme, toggleTheme }: NavigationProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const links = ["Work", "About", "Process", "Contact"];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-[8vw] py-4 transition-all duration-300",
                    scrolled ? "border-b border-foreground/20 bg-background/80 backdrop-blur-md" : "border-b border-transparent"
                )}
            >
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    className="text-xl font-serif font-bold tracking-tighter hoverable cursor-pointer hover:text-accent transition-colors duration-300"
                >
                    AM
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-[0.75rem] font-mono uppercase tracking-widest relative group hoverable overflow-hidden"
                        >
                            {link}
                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        </a>
                    ))}
                </div>

                {/* Mobile: hamburger */}
                <div className="flex items-center gap-3 md:hidden">
                    <button
                        className="flex flex-col gap-[4px] z-50 hoverable p-2"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={cn("w-6 h-[1px] bg-foreground transition-all", mobileMenuOpen ? "rotate-45 translate-y-[5px]" : "")} />
                        <span className={cn("w-6 h-[1px] bg-foreground transition-all", mobileMenuOpen ? "opacity-0" : "")} />
                        <span className={cn("w-6 h-[1px] bg-foreground transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-[5px]" : "")} />
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col items-center gap-8 w-full px-5">
                    {links.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[clamp(2.5rem,10vw,5rem)] font-serif w-full text-center border-b border-foreground/20 pb-4"
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};
