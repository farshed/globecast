const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			white: colors.white,
			slate: colors.slate,
			neon: '#00ff00'
		},
		extend: {}
	},
	plugins: []
};
