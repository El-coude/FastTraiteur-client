module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                pri: {
                    1: "#fef0e6",
                    2: "#fcc49b",
                    3: "#f9974f",
                    4: "#FA4A0C",
                    5: "#f76b04",
                    6: "#ad4b03",
                    7: "#632b02",
                },
                err: {
                    1: "#FA2309",
                },
                grey: {
                    1: "#EFEEEE",
                    2: "#9A9A9D",
                },
            },
            font: {
                "main-b": "'DM-Bold', sans-serif",
                "main-m": "'DM-Med', sans-serif",
                "main-r": "'DM-Reg', sans-serif",
            },
        },
    },
    plugins: [],
};
