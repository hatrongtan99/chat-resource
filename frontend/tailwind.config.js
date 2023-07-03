/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                Hind: ["Hind", "sans-serif"],
            },
            backgroundColor: {
                bgDarkmode: "#18191A",
                bgDarkmodeLight: "#242526",
                bgDarkmodeComment: "#3A3B3C",
                bgMyMessage: "#0084FF",
                bgPrimary: "#2473E1",
                bgPrimaryLight: "#77A7FF",
            },
            colors: {
                main: "#18191A",
                darkLight: "#242526",
                darkHover: "#3A3B3C",
                primary: "#2473E1",
                primaryLight: "#77A7FF",
            },
            keyframes: {
                fadeIn: {
                    "0%": {
                        opacity: 0,
                    },
                    "100%": {
                        opacity: 1,
                    },
                },
            },
            animation: {
                fadeIn: "fadeIn .4s ease-in-out",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
