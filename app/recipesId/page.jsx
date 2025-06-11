import { Badge, ChefHat, Clock, Tag, Users, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";
export default function page() {
  const recipeData = {
    idMeal: "52772",
    strMeal: "Teriyaki Chicken Casserole",
    strCategory: "Chicken",
    strArea: "Japanese",
    strInstructions:
      "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    strTags: "Meat,Casserole",
    strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
    ingredients: [
      { name: "soy sauce", measure: "3/4 cup" },
      { name: "water", measure: "1/2 cup" },
      { name: "brown sugar", measure: "1/4 cup" },
      { name: "ground ginger", measure: "1/2 teaspoon" },
      { name: "minced garlic", measure: "1/2 teaspoon" },
      { name: "cornstarch", measure: "4 Tablespoons" },
      { name: "chicken breasts", measure: "2" },
      { name: "stir-fry vegetables", measure: "1 (12 oz.)" },
      { name: "brown rice", measure: "3 cups" },
    ],
  };
  //   const { id } = useParams();

  const formatInstructions = (instructions) => {
    return instructions.split("\r\n").filter((step) => step.trim().length > 0);
  };

  const steps = formatInstructions(recipeData.strInstructions);
  const tags = recipeData.strTags?.split(",") || [];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {" "}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset gap-1"
                    key={tag}
                  >
                    <Tag className="w-3 h-3" />
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-foreground">
                {recipeData.strMeal}
              </h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  <span>{recipeData.strArea} Cuisine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>50 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>4-6 servings</span>
                </div>
              </div>

              {recipeData.strYoutube && (
                <a
                  href={recipeData.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <button className="outline gap-2 inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-gray-500/10 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500/20">
                    <Youtube className="w-4 h-4" />
                    Watch Video Tutorial
                  </button>
                </a>
              )}

              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={recipeData.strMealThumb}
                  alt={recipeData.strMeal}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
              </div>

              <div className="shadow-lg rounded-lg p-6 bg-white">
                <h3 className="text-2xl">Instructions</h3>
                <div className="space-y-4 mt-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8  bg-black rounded-full flex items-center justify-center text-lg text-white">
                        {index + 1}
                      </div>
                      <p className="text-foreground leading-relaxed pt-1">
                        {step.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="shadow-lg rounded-lg p-6 bg-white  top-8">
              <h3 className="text-2xl mb-4">Ingredients</h3>
              <hr />
              <div className=" mt-4">
                <ul className="space-y-3">
                  {recipeData.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-start gap-2"
                    >
                      <span className="text-foreground font-medium flex-1">
                        {ingredient.name}
                      </span>
                      <span className="text-muted-foreground text-sm text-right">
                        {ingredient.measure}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="shadow-lg rounded-lg p-6 bg-white  top-8">
              <h3 className="text-2xl mb-4">Recipe Info</h3>
              <hr />
              <div className=" mt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{recipeData.strCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cuisine</span>
                  <span className="font-medium">{recipeData.strArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prep Time</span>
                  <span className="font-medium">15 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cook Time</span>
                  <span className="font-medium">35 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="font-medium">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
