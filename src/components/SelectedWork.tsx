"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const works = [
    {
        id: "01",
        title: "Kuramoto",
        discipline: "Real-Time Systems",
        year: "2026",
        stack: "Svelte · Node.js · WebSockets · Redis · PostgreSQL",
        description: "A citizen science experiment measuring global human synchronization using the Kuramoto Order Parameter. Users worldwide tap their natural rhythm — answering: do humans share an internal clock?",
    },
    {
        id: "02",
        title: "Dopple",
        discipline: "AI / NLP",
        year: "2026",
        stack: "Python · Gemini API · RAG Pipeline · WhatsApp Web",
        description: "A WhatsApp chatbot that mimics a person's texting style using RAG on real chat history, generating eerily accurate doppelgänger-like responses.",
    },
    {
        id: "03",
        title: "Proctorly",
        discipline: "Full-Stack · EdTech",
        year: "2026",
        stack: "React · Vite · Tailwind v4 · Framer Motion · WebRTC",
        description: "An AI-proctored online exam platform with a student dashboard, fullscreen secure interface, live camera/mic monitoring via WebRTC, tab-switch detection, and an admin question builder.",
    },
    {
        id: "04",
        title: "Veritas Protocol",
        discipline: "Trust Infrastructure",
        year: "2026",
        stack: "Next.js 14 · TypeScript · PostgreSQL · Redis · IPFS · Ethereum · PyTorch",
        description: "A next-generation digital trust platform making credibility and consent experiential — combining real-time trust transparency, intelligent consent frameworks, and blockchain-backed credibility infrastructure.",
        github: "https://github.com/akash-taurus/Veritas_Protocol",
    },
    {
        id: "05",
        title: "Veritas Lens",
        discipline: "AI · Security",
        year: "2026",
        stack: "Python · FastAPI · React · Deep Learning · Chrome Extension",
        description: "A free AI-powered deepfake detection tool achieving 92% accuracy using multi-modal forensic analysis — metadata, frequency domain, and deep learning. Delivers explainable AI reports, not just binary classifications.",
        github: "https://github.com/akash-taurus/VeritasLens",
    },
    {
        id: "06",
        title: "Smart Link Hub",
        discipline: "Full-Stack · SaaS",
        year: "2026",
        stack: "FastAPI · SQLAlchemy · PostgreSQL · HTML/CSS · Vercel",
        description: "A dynamic link management platform with PIN-protected hubs, intelligent routing by device/time/location, real-time analytics, click tracking, and a cyberpunk-inspired UI with auto-switching dark/light modes.",
        github: "https://github.com/akash-taurus/Smart-Link-Hub",
    },
];

export const SelectedWork = () => {
    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-10%" });
    return (
        <section id="work" className="w-full px-5 md:px-[8vw] py-[clamp(5rem,12vw,14rem)]">
            <div ref={sectionRef} className="overflow-hidden mb-12">
                <motion.h2
                    className="font-mono text-[clamp(0.65rem,1vw,0.8rem)] uppercase tracking-widest"
                    initial={{ y: 30, opacity: 0 }}
                    animate={sectionInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Selected Work
                </motion.h2>
            </div>

            <div className="flex flex-col border-t border-foreground/20">
                {works.map((work, index) => (
                    <WorkCard key={work.id} work={work} index={index} />
                ))}
            </div>
        </section>
    );
};

const WorkCard = ({ work, index }: { work: any; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            className="group relative w-full flex flex-col py-[clamp(2rem,5vw,3.5rem)] border-b border-foreground/20 hoverable cursor-pointer overflow-hidden transition-all duration-500 hover:bg-foreground/[0.02] gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Top row: number + title + metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full z-10 gap-4 sm:gap-12">
                <div className="flex items-center gap-6 sm:gap-10">
                    <span className="font-mono text-[clamp(0.9rem,1.5vw,1.2rem)] text-foreground/40 group-hover:text-accent transition-colors duration-300 shrink-0">
                        {work.id}
                    </span>
                    <motion.h3
                        className="font-serif text-[clamp(1.5rem,4vw,3.5rem)] leading-none uppercase tracking-tighter"
                        initial={{ x: -10, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {work.title}
                    </motion.h3>
                </div>

                <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1 pl-12 sm:pl-0 shrink-0 text-foreground/50">
                    <span className="font-mono text-[clamp(0.6rem,0.9vw,0.75rem)] uppercase tracking-widest">{work.discipline}</span>
                    <span className="font-mono text-[clamp(0.6rem,0.9vw,0.75rem)] uppercase tracking-widest">{work.year}</span>
                </div>
            </div>

            {/* Description */}
            <p className="font-mono text-[clamp(0.75rem,1vw,0.875rem)] text-foreground/60 leading-relaxed max-w-2xl pl-12 sm:pl-16 z-10 group-hover:text-foreground/80 transition-colors duration-300">
                {work.description}
            </p>

            {/* Stack tag */}
            <p className="font-mono text-[clamp(0.6rem,0.85vw,0.72rem)] text-accent/70 uppercase tracking-widest pl-12 sm:pl-16 z-10">
                {work.stack}
            </p>

            {/* GitHub link or coming-soon notice */}
            {work.github ? (
                <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 pl-12 sm:pl-16 z-10 group/link hoverable"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="font-mono text-[clamp(0.55rem,0.8vw,0.65rem)] text-accent uppercase tracking-widest underline underline-offset-2 group-hover/link:text-foreground transition-colors duration-200">
                        View on GitHub →
                    </span>
                </a>
            ) : (
                <span className="inline-flex items-center gap-2 pl-12 sm:pl-16 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-pulse" />
                    <span className="font-mono text-[clamp(0.55rem,0.8vw,0.65rem)] text-foreground/30 uppercase tracking-widest">
                        GitHub source dropping soon
                    </span>
                </span>
            )}

            {/* Hover bleed accent */}
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-0 translate-x-12 group-hover:opacity-[0.04] group-hover:translate-x-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block z-0 bg-accent" />
        </motion.div>
    );
};
