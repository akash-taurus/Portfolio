import React from "react";
import ShaderAnimation from "./ui/shader-animation";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-start justify-center px-5 md:px-[8vw] overflow-hidden">
            <ShaderAnimation />

            {/* Noise overlay */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            ></div>

            <div className="relative z-10 flex flex-col w-full">
                <motion.h1
                    className="font-serif text-[clamp(2.5rem,12vw,6rem)] md:text-[clamp(3rem,16vw,12rem)] leading-[0.85] tracking-tighter uppercase flex flex-col"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }}
                >
                    <motion.span className="block" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>AKASH</motion.span>
                    <motion.span className="block" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        MAHESHWAR<span className="text-accent">I</span>
                    </motion.span>
                </motion.h1>

                <motion.div
                    className="mt-8 flex items-center gap-4 text-foreground/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <p className="font-mono text-[clamp(0.65rem,1vw,0.8rem)] uppercase tracking-widest">
                        Student of Computer Science
                    </p>
                    <motion.span
                        className="w-2 h-4 bg-accent block"
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
                    />
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 right-5 md:right-[8vw] hidden sm:flex flex-col items-center gap-4 text-foreground/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <span className="font-mono text-xs uppercase tracking-widest [writing-mode:vertical-rl]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ArrowDown size={16} />
                </motion.div>
            </motion.div>
        </section>
    );
};
