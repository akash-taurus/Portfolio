import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// WakaTime Public API (via CORS proxy)
const WAKATIME_URL = "https://corsproxy.io/?" + encodeURIComponent(
    "https://wakatime.com/api/v1/users/akashmaheshwari/stats/all_time"
);

// Language color map for visual variety
const LANG_COLORS: Record<string, string> = {
    Python: "#3B82F6",
    TypeScript: "#8B5CF6",
    JavaScript: "#F59E0B",
    "C++": "#EF4444",
    C: "#F97316",
    Rust: "#EC4899",
    Go: "#06B6D4",
    HTML: "#10B981",
    CSS: "#6366F1",
    Bash: "#84CC16",
    PowerShell: "#0EA5E9",
    default: "#c8f23a", // accent
};

const MOCK_LANGUAGES = [
    { name: "Python", percent: 42, text: "Awaiting data" },
    { name: "TypeScript", percent: 28, text: "Awaiting data" },
    { name: "C++", percent: 18, text: "Awaiting data" },
    { name: "Bash", percent: 8, text: "Awaiting data" },
    { name: "HTML", percent: 4, text: "Awaiting data" },
];

interface Language {
    name: string;
    percent: number;
    text: string;
}

export const CodingStats = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    const [totalText, setTotalText] = useState("—");
    const [languages, setLanguages] = useState<Language[]>([]);
    const [hasData, setHasData] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(WAKATIME_URL);
                const json = await res.json();
                const data = json.data;

                const total = data.human_readable_total || "0 secs";
                const langs: Language[] = (data.languages || [])
                    .slice(0, 5)
                    .map((l: { name: string; percent: number; text: string }) => ({
                        name: l.name,
                        percent: parseFloat(l.percent.toFixed(1)),
                        text: l.text,
                    }));

                setTotalText(total);

                if (langs.length === 0 || data.total_seconds === 0) {
                    setLanguages([]);
                    setHasData(false);
                } else {
                    setLanguages(langs);
                    setHasData(true);
                }
            } catch (err) {
                console.error("WakaTime fetch failed:", err);
                setTotalText("—");
                setLanguages([]);
                setHasData(false);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div ref={ref} className="flex flex-col gap-6 border border-background/20 p-6 md:p-8 relative group overflow-hidden">
            {/* Hover glow */}
            <div className="absolute inset-0 bg-accent/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Header row */}
            <div className="flex items-end justify-between z-10">
                <div>
                    <motion.p
                        className="font-mono text-[clamp(0.6rem,0.9vw,0.72rem)] uppercase tracking-widest text-background/40 mb-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        Time Spent in IDE — All Time
                    </motion.p>
                    <motion.p
                        className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-none tracking-tighter text-background"
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {loading ? "Loading…" : totalText}
                    </motion.p>
                </div>
                <motion.span
                    className="font-mono text-[clamp(0.55rem,0.8vw,0.65rem)] text-accent uppercase tracking-widest z-10"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                    WakaTime
                </motion.span>
            </div>

            {/* Divider — draws in from left */}
            <div className="w-full h-[1px] bg-background/10 z-10 overflow-hidden">
                <motion.div
                    className="h-full bg-background/30"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>

            {/* Language breakdown */}
            <div className="flex flex-col gap-4 z-10">
                <p className="font-mono text-[clamp(0.6rem,0.9vw,0.72rem)] uppercase tracking-widest text-background/40">
                    Language Breakdown
                </p>

                {!loading && !hasData && (
                    <p className="font-mono text-[clamp(0.65rem,0.9vw,0.75rem)] text-background/40 italic">
                        Language stats will appear once WakaTime starts syncing your activity.
                    </p>
                )}

                {languages.map((lang, i) => {
                    const color = LANG_COLORS[lang.name] ?? LANG_COLORS.default;
                    return (
                        <div key={lang.name} className="flex flex-col gap-1">
                            {/* Row label */}
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[clamp(0.7rem,1vw,0.85rem)] uppercase tracking-widest text-background">
                                    {lang.name}
                                </span>
                                <span className="font-mono text-[clamp(0.6rem,0.85vw,0.72rem)] text-background/50">
                                    {`${lang.text} · ${lang.percent}%`}
                                </span>
                            </div>

                            {/* Animated progress bar */}
                            <div className="w-full h-[3px] bg-background/15 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: color }}
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${lang.percent}%` } : { width: 0 }}
                                    transition={{
                                        duration: 1.1,
                                        delay: 0.1 + i * 0.08,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
