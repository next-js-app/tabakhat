import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Tabakhat - Cook it. Love it. Share it",
  description:
    "Discover authentic and easy-to-follow Middle Eastern recipes with Tabakhat. From quick meals to traditional dishes — cook, taste, and enjoy one tabkha at a time!",
  openGraph: {
    title: "Tabakhat - Cook it. Love it. Share it",
    description: "Discover authentic and easy-to-follow Middle Eastern recipes with Tabakhat. From quick meals to traditional dishes — cook, taste, and enjoy one tabkha at a time!",
    url: "https://tabakhat.com",
    siteName: "Tabakhat",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tabakhat - Your Ultimate Recipe Destination",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabakhat - Cook it. Love it. Share it",
    description: "Discover authentic and easy-to-follow Middle Eastern recipes with Tabakhat. From quick meals to traditional dishes — cook, taste, and enjoy one tabkha at a time!",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '8px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
