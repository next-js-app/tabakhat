'use client';

import { Badge, ChefHat, Clock, Tag, Users, Youtube, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        
        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          
          // Extract ingredients and measures
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim()) {
              ingredients.push({
                name: ingredient.trim(),
                measure: measure ? measure.trim() : 'To taste'
              });
            }
          }
          
          setRecipeData({
            ...meal,
            ingredients
          });
        } else {
          throw new Error('Recipe not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRecipe();
    }
  }, [params.id]);

  const formatInstructions = (instructions) => {
    if (!instructions) return [];
    return instructions.split("\r\n").filter((step) => step.trim().length > 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Loading recipe...
            </h2>
            <p className="text-gray-500">
              Please wait while we fetch the recipe details
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Recipe Not Found
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Go Back
              </button>
              <Link
                href="/recipes"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Browse Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipeData) {
    return null;
  }

  const steps = formatInstructions(recipeData.strInstructions);
  const tags = recipeData.strTags?.split(",") || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recipes
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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
                <h3 className="text-2xl mb-4">Instructions</h3>
                <div className="space-y-4 mt-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-lg text-white">
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
            <div className="shadow-lg rounded-lg p-6 bg-white top-8">
              <h3 className="text-2xl mb-4">Ingredients</h3>
              <hr />
              <div className="mt-4">
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
            <div className="shadow-lg rounded-lg p-6 bg-white top-8">
              <h3 className="text-2xl mb-4">Recipe Info</h3>
              <hr />
              <div className="mt-4">
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