/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/views/*.ejs", "./dist/views/*.ejs"],
	theme: {
		extend: {
			screens: {
				xsm: { max: "240px" },
				mnsm: "241px",
				sm: "640px",
				md: "768px",
				lg: "992px",
				xl: "1024px",
				"2xl": "1280px",
				"3xl": "1536px",
				"4xl": "1920px",
				"5xl": "2560px",
				"6xl": "3840px",
			},

			fontSize: {
				xxsm: "0.75rem",
				"10xl": "10rem",
				"11xl": "12rem",
				"12xl": "16rem",
				"13xl": "20rem",
				"14xl": "24rem",
				"15xl": "28rem",
			},
			colors: {
				bgColor: "#000",
			},
			width: {
				width: "1200px",
			},
		},
	},
	plugins: [],
};
