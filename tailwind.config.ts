/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				primaryDark: "#2C3639",
				secondaryDark: "#526D82",
				primaryLight: "#DDE6ED",
				secondaryLight: "#9DB2BF",
			},
			screens: {
				small: "480px",
				medium: "768",
				large: "1028",
			},
			padding: {
				smallPadding: "1rem",
				mediumPadding: "1.5rem",
				largePadding: "2rem",
				extraLargePadding: "7rem",
			},
			fontSize: {
				smallFont: "0.8rem",
				mediumFont: "1rem",
				largeFont: "1.25rem",
				extraLargeFont: "1.563rem",
			},
			height: {
				"4/5vh": "80vh",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
