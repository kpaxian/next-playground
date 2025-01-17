import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: {
        absolute: '',
        default: 'Fallback title for child route segements',
        template: '%s | My Website',
    },
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ThemeProvider>
                <body className={inter.className}>
                    <header style={{background:'lightblue', padding: '1rem'}}>
                        <p>Header</p>
                    </header>
                    {children}
                    <footer style={{background:'lightgrey', padding: '1rem'}}>
                        <p>Footer</p>
                    </footer>
                </body>
            </ThemeProvider>
        </html>
    );
}
