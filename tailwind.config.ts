import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primaryDark: '#191717',
				primaryLight: '#F1EFEF',
			},
			screens: {
				small: '480px',
				medium: '768',
				large: '1028',
			},
			padding: {
				small: 'p-5',
				medium: 'p-10',
				large: 'p-20',
			},
		},
	},
	plugins: [],
};
export default config;
