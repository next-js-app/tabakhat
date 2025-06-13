"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Clock, ChefHat, Search, Loader2 } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { RecipeCard } from "@/app/components/RecipeCard";

export default function RecipesPage() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  const searchInputRef = useRef(null);
  const { wishlist, addToWishlist, removeFromWishlist, isHydrated } =
    useWishlist();

  const fetchMeals = useCallback(async () => {
    try {
      setFilterLoading(true);
      setError(null);

      // Build the API URL based on filters only (not search)
      let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

      if (selectedCategory) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
          selectedCategory
        )}`;
      } else if (selectedArea) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(
          selectedArea
        )}`;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await response.json();

      if (data.meals) {
        // If we're filtering by category or area, we need to fetch full details for each meal
        if (selectedCategory || selectedArea) {
          const detailedMeals = await Promise.all(
            data.meals.slice(0, 20).map(async (meal) => {
              try {
                const detailResponse = await fetch(
                  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                );
                const detailData = await detailResponse.json();
                return detailData.meals[0];
              } catch (err) {
                console.error(
                  `Error fetching details for meal ${meal.idMeal}:`,
                  err
                );
                return meal;
              }
            })
          );
          setMeals(detailedMeals);
        } else {
          setMeals(data.meals);
        }
      } else {
        setMeals([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFilterLoading(false);
      setLoading(false);
    }
  }, [selectedCategory, selectedArea]);

  const fetchSearchResults = useCallback(
    async (searchQuery) => {
      if (!searchQuery.trim()) {
        setFilteredMeals(meals);
        return;
      }

      try {
        setSearchLoading(true);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            searchQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to search meals");
        }

        const data = await response.json();

        if (data.meals) {
          setFilteredMeals(data.meals);
        } else {
          setFilteredMeals([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        // Fallback to client-side search
        const filtered = meals.filter(
          (meal) =>
            meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meal.strInstructions
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        setFilteredMeals(filtered);
      } finally {
        setSearchLoading(false);
      }
    },
    [meals]
  );

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const categoriesData = await categoriesResponse.json();
        if (categoriesData.categories) {
          setCategories(categoriesData.categories);
        }

        // Fetch areas
        const areasResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const areasData = await areasResponse.json();
        if (areasData.meals) {
          setAreas(areasData.meals);
        }

        // Fetch ingredients
        const ingredientsResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const ingredientsData = await ingredientsResponse.json();
        if (ingredientsData.meals) {
          setIngredients(ingredientsData.meals);
        }
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };

    fetchFilters();
  }, []);

  // Apply search and ingredient filtering to the meals list
  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults(searchTerm);
    } else {
      let filtered = meals;

      // Filter by ingredient (client-side)
      if (selectedIngredient) {
        filtered = filtered.filter((meal) =>
          meal.strInstructions
            ?.toLowerCase()
            .includes(selectedIngredient.toLowerCase())
        );
      }

      setFilteredMeals(filtered);
    }
  }, [meals, searchTerm, selectedIngredient, fetchSearchResults]);

  // Keep search input focused
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedArea("");
    setSelectedIngredient("");
    // Keep focus on search input after clearing
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore thousands of delicious recipes from around the world
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option
                    key={category.idCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>

              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 bg-white"
              >
                <option value="">All Areas</option>
                {areas.map((area) => (
                  <option key={area.strArea} value={area.strArea}>
                    {area.strArea}
                  </option>
                ))}
              </select>

              <select
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 bg-white"
              >
                <option value="">All Ingredients</option>
                {ingredients.slice(0, 50).map((ingredient) => (
                  <option
                    key={ingredient.idIngredient}
                    value={ingredient.strIngredient}
                  >
                    {ingredient.strIngredient}
                  </option>
                ))}
              </select>

              {(searchTerm ||
                selectedCategory ||
                selectedArea ||
                selectedIngredient) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredMeals.length} recipe{filteredMeals.length !== 1 ? "s" : ""}{" "}
            found
          </p>
          {(searchTerm ||
            selectedCategory ||
            selectedArea ||
            selectedIngredient) && (
            <p className="text-sm text-gray-500">Filtered results</p>
          )}
        </div>

        {/* Recipes Grid with Localized Loading */}
        <div className="relative">
          {(loading || filterLoading || searchLoading) && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
          )}

          {!loading &&
            !filterLoading &&
            !searchLoading &&
            filteredMeals.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  No recipes found
                </h2>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}

          {!loading &&
            !filterLoading &&
            !searchLoading &&
            filteredMeals.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMeals.map((meal) => (
                  <div key={meal.idMeal} className="h-full">
                    <RecipeCard recipe={meal} />
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
