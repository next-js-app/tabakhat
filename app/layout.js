import "./globals.css";
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer";

export const metadata = {
  title: "Tabakhat - Cook it. Love it. Share it",
  description: "Discover authentic and easy-to-follow Middle Eastern recipes with Tabakhat. From quick meals to traditional dishes — cook, taste, and enjoy one tabkha at a time!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
