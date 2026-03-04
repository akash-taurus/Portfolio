"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, Github } from "lucide-react";

const socialLinks = [
    {
        label: "Reddit",
        href: "https://www.reddit.com/user/Different-Lie8370/",
        icon: (
            <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/schrodingers_cat_dead_or_alive/",
        icon: <Instagram strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7" />,
    },
    {
        label: "Kaggle",
        href: "https://www.kaggle.com/akashisawhale",
        icon: (
            <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.876 8.232c.095.104.117.208.07.31z" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com/akash-taurus",
        icon: <Github strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7" />,
    },
];

export const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section id="contact" className="w-full px-5 md:px-[8vw] py-[clamp(5rem,12vw,14rem)] flex flex-col items-center justify-center text-center" ref={ref}>

            {/* Section label */}
            <motion.h2
                className="font-mono text-[clamp(0.65rem,1vw,0.8rem)] uppercase tracking-widest text-foreground/50 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                Get in touch
            </motion.h2>

            {/* Email */}
            <motion.a
                href="mailto:akashmaheshwari003@proton.me"
                className="relative group hoverable font-mono text-[clamp(0.75rem,2vw,1.25rem)] leading-none tracking-widest break-all w-full max-w-3xl block"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="relative z-10 group-hover:text-accent transition-colors duration-500">
                    akashmaheshwari003@proton.me
                </span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </motion.a>

            {/* Social icons */}
            <div className="mt-20 flex flex-row flex-wrap justify-center items-center gap-[clamp(1.5rem,3vw,3rem)]">
                {socialLinks.map((link, i) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="hoverable text-foreground hover:text-accent transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -6, scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {link.icon}
                    </motion.a>
                ))}
            </div>
        </section>
    );
};

export const Footer = () => {
    return (
        <footer className="w-full px-5 md:px-[8vw] py-8 border-t border-foreground/20 flex flex-col md:flex-row items-center justify-between font-mono text-[0.75rem] uppercase tracking-widest text-foreground/50 gap-4 text-center md:text-left">
            <span>© {new Date().getFullYear()} Akash Maheshwari. All rights reserved.</span>
            <span>Designed &amp; built by Akash Maheshwari</span>
        </footer>
    );
};
