"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export const Process = () => {
    return (
        <section id="process" className="relative w-full overflow-hidden bg-background py-[clamp(5rem,12vw,14rem)]">
            {/* Background Word */}
            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(4rem,22vw,28vw)] font-serif font-black uppercase text-foreground opacity-[0.03] select-none pointer-events-none whitespace-nowrap leading-none tracking-tighter mix-blend-difference">
                CRAFT.
            </h2>

            <div className="relative z-10 w-full">
                <ContainerScroll
                    titleComponent={
                        <div className="mb-8 md:mb-16 max-w-2xl mx-auto px-5">
                            <span className="font-mono text-accent text-[clamp(0.65rem,1vw,0.8rem)] uppercase tracking-widest block mb-4">Philosophy</span>
                            <h3 className="font-serif text-[clamp(2rem,5vw,4rem)] leading-none text-foreground uppercase tracking-tighter">
                                Methodical reduction.
                            </h3>
                            <p className="mt-6 font-mono text-[clamp(0.875rem,1.2vw,1rem)] text-foreground/70 leading-relaxed text-left md:text-center">
                                I dissect complex problems, stripping away the superfluous until only the absolute truth of the product remains. This is where brutalism meets utility.
                            </p>
                        </div>
                    }
                >
                    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-8 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <h4 className="font-serif text-[clamp(1.5rem,4vw,3.5rem)] text-foreground/30 uppercase tracking-tighter mix-blend-difference">
                            Iterate. Refine. <span className="text-accent/80">Execute.</span>
                        </h4>
                    </div>
                </ContainerScroll>
            </div>
        </section>
    );
};
