import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

const mango = localFont({
    src: [
        {
            path: './font/MangoDdobak-B(ttf).ttf',
            weight: '700',
        },
        {
            path: './font/MangoDdobak-R(ttf).ttf',
            weight: '400',
        },
        {
            path: './font/MangoDdobak-L(ttf).ttf',
            weight: '300',
        },
    ],
    variable: '--font-mango',
});

export const metadata: Metadata = {
    title: 'Jiyoon Kanban Board',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${mango.variable} antialiased font-mango w-dvw h-dvh bg-light-default`}>{children}</body>
        </html>
    );
}
