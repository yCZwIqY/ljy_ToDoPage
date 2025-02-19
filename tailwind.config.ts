import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    default: '#F4EEFF',
                    hover: '#E5DFFF',
                    active: '#D6CFFF',
                    disabled: '#F9F5FF',
                },
                soft: {
                    default: '#DCD6F7',
                    hover: '#C9C1E8',
                    active: '#B5ACD9',
                    disabled: '#EDEAFB',
                },
                mute: {
                    default: '#A6B1E1',
                    hover: '#939DCD',
                    active: '#808ABA',
                    disabled: '#D1D7F0',
                },
                deep: {
                    default: '#424874',
                    hover: '#3A4068',
                    active: '#32385C',
                    disabled: '#6D728E',
                },
            },
            fontFamily: {
                mango: ['var(--font-mango)'],
            },
            fontSize: {
                title: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
                subtitle: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
                body: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
            },
        },
    },
    plugins: [],
} satisfies Config;
