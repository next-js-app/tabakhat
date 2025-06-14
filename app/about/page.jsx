import AboutClient from "./AboutClient";

export default function AboutPage() {
  return <AboutClient />;
}

export const metadata = {
   title: "About | Tabakhat - Meet Our Team",
  description: "Learn more about Tabakhat, our team, mission, and features. Discover why we are your ultimate destination for discovering, sharing, and creating amazing recipes.",
  keywords: ["about", "team", "mission", "recipes", "Tabakhat", "cooking", "features"],
  openGraph: {
    title: "About | Tabakhat - Meet Our Team",
    description: "Learn more about Tabakhat, our team, mission, and features. Discover why we are your ultimate destination for discovering, sharing, and creating amazing recipes.",
    url: "https://tabakhat.com/about",
    siteName: "Tabakhat",
    images: [
      {
        url: "/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "Meet the Tabakhat Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Tabakhat - Meet Our Team",
    description: "Learn more about Tabakhat, our team, mission, and features. Discover why we are your ultimate destination for discovering, sharing, and creating amazing recipes.",
    images: ["/images/about-og.jpg"],
  },
};
