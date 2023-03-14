const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    content: ["./index.html", "./public/index.html", ".src/**/*.vue,js,ts,tsx,jsx", ".src/components/**/*.vue,js,ts,tsx,jsx", "./src/**/*.{html,js,vue}"],
    darkMode: 'class',
    theme: {
        extend: {

            ringWidth: {
                'DEFAULT': '2px',
                '6': '6px',
                '10': '10px',
            },

            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                black: colors.black,
                white: colors.white,
                gray: colors.gray,
                emerald: colors.emerald,
                indigo: colors.indigo,
                yellow: colors.yellow,
                fuchsia: colors.fuchsia,
                rink: colors.pink,
                rose: colors.rose,
                sky: colors.sky,
                slate: colors.slate,
                zinc: colors.zinc,
                neutral: colors.neutral,
                cyan: colors.cyan,
                stone: colors.stone,
                lime: colors.lime,
                green: colors.green,
                teal: colors.teal,
                blue: colors.blue,
                voilet: colors.violet,
                oranage: colors.orange,
                orange: colors.orange



            },
        },
    },
    plugins: [


    ],
}