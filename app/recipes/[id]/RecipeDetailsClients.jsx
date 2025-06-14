"use client";

import {
  Badge,
  ChefHat,
  Clock,
  Tag,
  Users,
  Youtube,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import React from 'react'

export default function RecipeDetailsClients() {

  const params = useParams();
  const router = useRouter();
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
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
                measure: measure ? measure.trim() : "To taste",
              });
            }
          }

          setRecipeData({
            ...meal,
            ingredients,
          });
        } else {
          throw new Error("Recipe not found");
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
      <div className="min-h-screen bg-zinc-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-amber-300" />
            <h2 className="text-2xl font-semibold text-zinc-700 mb-2">
              Loading Recipe...
            </h2>
            <p className="text-zinc-500">
              Please wait while we fetch the recipe details
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-amber-300 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-zinc-800 mb-2">
              Recipe Not Found
            </h2>
            <p className="text-zinc-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="bg-zinc-600 text-white px-6 py-3 rounded-lg hover:bg-zinc-700 transition-colors font-medium"
              >
                Go Back
              </button>
              <Link
                href="/recipes"
                className="bg-amber-300 text-white px-6 py-3 rounded-lg hover:bg-amber-300 transition-colors font-medium"
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
  const stepsToShow = showAllSteps ? steps : steps.slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center cursor-pointer gap-2 text-zinc-50 hover:text-amber-300 transition-colors font-medium bg-zinc-800 px-4 py-2 rounded-lg shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recipes
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-start">
          {/* Left: Name, Meta, Video, Image, Instructions */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-2">{recipeData.strMeal}</h1>
            <div className="flex flex-wrap gap-4 items-center text-zinc-700 mb-2">
              <div className="flex items-center gap-2"><ChefHat className="w-5 h-5" /><span>{recipeData.strArea} Cuisine</span></div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>50 minutes</span></div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5" /><span>4-6 servings</span></div>
            </div>
            {recipeData.strYoutube && (
              <>
                <button
                  className="flex items-center w-xs cursor-pointer justify-center gap-2 rounded-lg bg-zinc-800  text-white px-4 py-2 font-semibold shadow hover:bg-zinc-900 transition-colors"
                  onClick={() => { setShowVideoModal(true); setVideoLoading(true); }}
                >
                  <Youtube className="w-5 h-5" />
                  Watch Video Tutorial
                </button>
                {showVideoModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full relative">
                      <button
                        className="absolute rounded-full px-2 pb-1 bg-zinc-900 hover:bg-zinc-600 cursor-pointer bottom-2 right-2 text-zinc-100 hover:text-zinc-100 font-semibold"
                        onClick={() => setShowVideoModal(false)}
                        aria-label="Close"
                      >
                        <span className="text-sm">Close</span>
                      </button>
                      <div className="aspect-w-16 aspect-h-9 w-full flex items-center justify-center">
                        {videoLoading && (
                          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80">
                            <Loader2 className="w-10 h-10 animate-spin text-zinc-900" />
                            <span className="ml-3 text-zinc-700 font-medium">Loading video…</span>
                          </div>
                        )}
                        <iframe
                          src={recipeData.strYoutube.replace("watch?v=", "embed/")}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-72 sm:h-96 rounded-lg"
                          onLoad={() => setVideoLoading(false)}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            </div>
            <div className="relative w-full mb-0 rounded-3xl shadow-xl overflow-hidden bg-zinc-100">
              <img
                src={recipeData.strMealThumb}
                alt={recipeData.strMeal}
                className="w-full h-72 sm:h-96 object-fit bg-zinc-100"
              />
            </div>
            <div className="shadow-xl rounded-2xl p-8 bg-white">
              <h3 className="text-2xl mb-6 font-bold text-zinc-800">Instructions</h3>
              <div className="space-y-6 mt-4">
                {stepsToShow.map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg font-bold text-white shadow">
                      {index + 1}
                    </div>
                    <p className="text-zinc-700 leading-relaxed pt-1">
                      {step.trim()}
                    </p>
                  </div>
                ))}
                {steps.length > 3 && (
                  <button
                    onClick={() => setShowAllSteps((prev) => !prev)}
                    className="mt-4 px-6 py-2 bg-zinc-800 text-white rounded-lg font-semibold shadow hover:bg-zinc-900 transition-colors"
                  >
                    {showAllSteps ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Right: Ingredients and Recipe Info */}
          <div className="flex flex-col gap-6 mt-0">
            <div className="shadow-xl rounded-2xl p-8 bg-white">
              <h3 className="text-xl mb-4 font-bold text-zinc-800">
                Ingredients
              </h3>
              <ul className="divide-y divide-zinc-100">
                {recipeData.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className={
                      index % 2 === 0
                        ? "flex justify-between items-start gap-2 py-3 px-3 bg-zinc-50 rounded-lg"
                        : "flex justify-between items-start gap-2 py-3 px-3"
                    }
                  >
                    <span className="text-zinc-800 font-medium flex-1">
                      {ingredient.name}
                    </span>
                    <span className="text-zinc-500 text-sm text-right">
                      {ingredient.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shadow-xl rounded-2xl p-8 bg-white">
              <h3 className="text-xl mb-4 font-bold text-zinc-800">
                Recipe Info
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Category</span>
                  <span className="font-medium">{recipeData.strCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cuisine</span>
                  <span className="font-medium">{recipeData.strArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Prep Time</span>
                  <span className="font-medium">15 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cook Time</span>
                  <span className="font-medium">35 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Difficulty</span>
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
