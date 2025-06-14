import RecipeDetailsClients from "./RecipeDetailsClients";

export async function generateMetadata({ params }) {
  // Fetch recipe data here
  const recipeData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
    .then(res => res.json())
    .then(data => data.meals?.[0]);

  if (!recipeData) {
    return {
      title: "Recipe Not Found | Tabakhat",
      description: "The requested recipe could not be found.",
    };
  }

  return {
    title: `${recipeData.strMeal} | Tabakhat Recipe`,
    description: `${recipeData.strMeal} - ${recipeData.strInstructions?.slice(0, 160)}...`,
    keywords: ["recipe", "details", "ingredients", "instructions", "Tabakhat", "cooking", recipeData.strMeal, recipeData.strCategory, recipeData.strArea],
    openGraph: {
      title: `${recipeData.strMeal} | Tabakhat Recipe`,
      description: `${recipeData.strMeal} - ${recipeData.strInstructions?.slice(0, 160)}...`,
      url: `https://tabakhat.com/recipes/${params.id}`,
      siteName: "Tabakhat",
      images: [
        {
          url: recipeData.strMealThumb,
          width: 1200,
          height: 630,
          alt: recipeData.strMeal,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${recipeData.strMeal} | Tabakhat Recipe`,
      description: `${recipeData.strMeal} - ${recipeData.strInstructions?.slice(0, 160)}...`,
      images: [recipeData.strMealThumb],
    },
  };
}

export default function RecipeDetailPage() {
  return <RecipeDetailsClients />;
}
