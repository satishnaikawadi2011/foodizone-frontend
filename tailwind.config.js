const colors = require('tailwindcss/colors');

module.exports = {
	content : [
		'./src/**/*.{ts,tsx}'
	],
	theme   : {
		extend : {
			colors : {
				lime : colors.lime
			}
		}
	},
	plugins : []
};
