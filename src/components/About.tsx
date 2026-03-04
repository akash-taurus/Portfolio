"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CodingStats } from "./CodingStats";

export const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const skills = [
        "Backend Development", "Linux Administration", "PowerShell Scripting", "Batch Programming", "Data Analytics (Python)", "C / C++"
    ];

    return (
        <section id="about" className="w-full px-5 md:px-[8vw] py-[clamp(5rem,12vw,14rem)] bg-foreground text-background">
            <div
                ref={ref}
                className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 md:gap-[5vw]"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="font-serif text-[clamp(1.8rem,6vw,3rem)] leading-tight uppercase tracking-tighter">
                        "Simplicity is prerequisite for <span className="text-background/50 italic">reliability</span>." — Edsger W. Dijkstra
                    </h2>

                    <div className="mt-16 md:mt-24">
                        <CodingStats />
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="font-mono text-[clamp(0.875rem,1.2vw,1rem)] leading-[clamp(1.3,1.5,1.7)] space-y-6">
                        <p>
                            I am a 1st-year B.Tech Computer Science Engineering student obsessed with building robust backend architecture and exploring deep technical foundations. I believe in logical reduction and writing efficient, reliable code.
                        </p>
                        <p>
                            My current technical focus lies in backend development, systems administration with Linux, and writing automation scripts utilizing PowerShell and Batch programming to optimize workflows.
                        </p>
                        <p>
                            Beyond core software engineering, I have a strong interest in data analytics using Python, translating complex and messy datasets into clear, actionable insights.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-0">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill}
                                className="py-3 md:py-4 border-b border-background/20 last:border-0 font-mono text-[clamp(0.75rem,1vw,0.875rem)] uppercase tracking-widest text-background flex items-center justify-between group/skill hover:text-accent transition-colors duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {skill}
                                <motion.span
                                    className="w-0 h-[1px] bg-accent block group-hover/skill:w-6 transition-all duration-300"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
