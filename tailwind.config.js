/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                accent: "#c8f23a",
                background: "rgb(var(--color-bg) / <alpha-value>)",
                foreground: "rgb(var(--color-fg) / <alpha-value>)",
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            }
        },
    },
    plugins: [],
}
