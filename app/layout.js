import "./globals.css";
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "Tabakhat - Cook it. Love it. Share it",
  description: "Discover authentic and easy-to-follow Middle Eastern recipes with Tabakhat. From quick meals to traditional dishes — cook, taste, and enjoy one tabkha at a time!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
