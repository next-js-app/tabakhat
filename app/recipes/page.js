import RecipesClient from "./RecipesClient";

export const metadata = {
  title: "Recipes | Tabakhat - Discover Amazing Recipes",
  description: "Browse thousands of delicious recipes from around the world. Find, save, and share your favorite dishes on Tabakhat.",
  keywords: ["recipes", "Tabakhat", "cooking", "food", "categories", "search"],
};

export default function RecipesPage() {
  return <RecipesClient />;
}
