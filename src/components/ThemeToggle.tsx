import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
    theme: "dark" | "light";
    toggle: () => void;
}

export const ThemeToggle = ({ theme, toggle }: ThemeToggleProps) => {
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggle}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="relative w-8 h-8 flex items-center justify-center hoverable overflow-hidden"
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.span
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute text-foreground hover:text-accent transition-colors"
                    >
                        <Sun size={17} strokeWidth={1.5} />
                    </motion.span>
                ) : (
                    <motion.span
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute text-foreground hover:text-accent transition-colors"
                    >
                        <Moon size={17} strokeWidth={1.5} />
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};
