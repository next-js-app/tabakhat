import RecipesClient from "./RecipesClient";

export const metadata = {
  title: "Recipes | Tabakhat - Discover Amazing Recipes",
  description: "Browse thousands of delicious recipes from around the world. Find, save, and share your favorite dishes on Tabakhat.",
  keywords: ["recipes", "Tabakhat", "cooking", "food", "categories", "search"],
  openGraph: {
    title: "Recipes | Tabakhat - Discover Amazing Recipes",
    description: "Browse thousands of delicious recipes from around the world. Find, save, and share your favorite dishes on Tabakhat.",
    url: "https://tabakhat.com/recipes",
    siteName: "Tabakhat",
    images: [
      {
        url: "/images/recipes-og.jpg",
        width: 1200,
        height: 630,
        alt: "Discover Amazing Recipes on Tabakhat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipes | Tabakhat - Discover Amazing Recipes",
    description: "Browse thousands of delicious recipes from around the world. Find, save, and share your favorite dishes on Tabakhat.",
    images: ["/images/recipes-og.jpg"],
  },
};

export default function RecipesPage() {
  return <RecipesClient />;
}
