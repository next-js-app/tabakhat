"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Clock, ChefHat, Search, Loader2, Tag } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { RecipeCard } from "@/app/components/RecipeCard";
import { Listbox } from '@headlessui/react';

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

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
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-1">
            Discover Amazing Recipes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore thousands of delicious recipes from around the world
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-6 h-6" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-zinc-200 rounded-xl focus:ring-1 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300 transition-all duration-200 text-zinc-800 bg-zinc-50 placeholder-zinc-400 text-lg shadow-sm outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Category Filter - Headless UI Listbox */}
              <div className="relative w-full sm:w-auto">
                <ChefHat className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5 pointer-events-none z-10" />
                <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className="pl-10 pr-8 py-3 border border-zinc-200 rounded-xl focus:ring-1 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300 transition-all duration-200 bg-white text-zinc-700 shadow-sm w-full sm:w-auto flex items-center justify-between cursor-pointer">
                        <span>{selectedCategory || 'All Categories'}</span>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-900 text-xs">▼</span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-base">
                        <Listbox.Option key="all" value="" className={({ active, selected }) => classNames(active ? 'bg-amber-50 text-amber-700' : 'text-zinc-700', selected ? 'font-semibold bg-amber-100' : '', 'cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg transition-colors duration-150')}>
                          {({ selected }) => (<><span className="block truncate">All Categories</span>{selected ? (<span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300">✔</span>) : null}</>)}
                        </Listbox.Option>
                        {categories.map((category) => (
                          <Listbox.Option key={category.idCategory} value={category.strCategory} className={({ active, selected }) => classNames(active ? 'bg-amber-50 text-amber-700' : 'text-zinc-700', selected ? 'font-semibold bg-amber-100' : '', 'cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg transition-colors duration-150')}>
                            {({ selected }) => (<><span className="block truncate">{category.strCategory}</span>{selected ? (<span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300">✔</span>) : null}</>)}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>

              {/* Area Filter - Headless UI Listbox */}
              <div className="relative w-full sm:w-auto">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5 pointer-events-none z-10" />
                <Listbox value={selectedArea} onChange={setSelectedArea}>
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className="pl-10 pr-8 py-3 border border-zinc-200 rounded-xl focus:ring-1 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300 transition-all duration-200 bg-white text-zinc-700 shadow-sm w-full sm:w-auto flex items-center justify-between cursor-pointer">
                        <span>{selectedArea || 'All Areas'}</span>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-900 text-xs">▼</span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-base">
                        <Listbox.Option key="all" value="" className={({ active, selected }) => classNames(active ? 'bg-amber-50 text-amber-700' : 'text-zinc-700', selected ? 'font-semibold bg-amber-100' : '', 'cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg transition-colors duration-150')}>
                          {({ selected }) => (<><span className="block truncate">All Areas</span>{selected ? (<span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300">✔</span>) : null}</>)}
                        </Listbox.Option>
                        {areas.map((area) => (
                          <Listbox.Option key={area.strArea} value={area.strArea} className={({ active, selected }) => classNames(active ? 'bg-amber-50 text-amber-700' : 'text-zinc-700', selected ? 'font-semibold bg-amber-100' : '', 'cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg transition-colors duration-150')}>
                            {({ selected }) => (<><span className="block truncate">{area.strArea}</span>{selected ? (<span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300">✔</span>) : null}</>)}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>

              {/* Ingredient Filter - Headless UI Listbox */}
              <div className="relative w-full sm:w-auto">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5 pointer-events-none z-10" />
                <Listbox value={selectedIngredient} onChange={setSelectedIngredient}>
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className="pl-10 pr-8 py-3 border border-zinc-200 rounded-xl focus:ring-1 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300 transition-all duration-200 bg-white text-zinc-700 shadow-sm w-full sm:w-auto flex items-center justify-between cursor-pointer">
                        <span>{selectedIngredient || 'All Ingredients'}</span>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-900 text-xs">▼</span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-base">
                        <Listbox.Option key="all" value="" className={({ active, selected }) => classNames(active ? 'bg-amber-50 text-amber-700' : 'text-zinc-700', selected ? 'font-semibold bg-amber-100' : '', 'cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg transition-colors duration-150')}>
                          {({ selected }) => (<><span className="block truncate">All Ingredients</span>{selected ? (<span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300">✔</span>) : null}</>)}
                        </Listbox.Option>
                        {ingredients.slice(0, 50).map((ingredient) => (
                          <Listbox.Option key={ingredient.idIngredient} value={ingredient.strIngredient} className={({ active, selected }) => classNames(active ? 'bg-amber-50 text-amber-700' : 'text-zinc-700', selected ? 'font-semibold bg-amber-100' : '', 'cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-lg transition-colors duration-150')}>
                            {({ selected }) => (<><span className="block truncate">{ingredient.strIngredient}</span>{selected ? (<span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300">✔</span>) : null}</>)}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>

              {(searchTerm ||
                selectedCategory ||
                selectedArea ||
                selectedIngredient) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-3 bg-amber-300 text-white rounded-xl hover:bg-amber-400 transition-colors font-medium shadow-md mt-2 sm:mt-0"
                  >
                    <Loader2 className="w-4 h-4" />
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
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-amber-300 mb-4" />
              <span className="text-lg text-zinc-600 font-medium">Loading Recipes</span>
            </div>
          )}

          {!loading &&
            !filterLoading &&
            !searchLoading &&
            filteredMeals.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">
                  {/* Custom SVG illustration for no recipes found */}
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <circle cx="32" cy="32" r="28" fill="#f8fafc" stroke="#ffb500" strokeWidth="2" />
                    <ellipse cx="32" cy="44" rx="16" ry="6" fill="#e4e4e7" />
                    <circle cx="24" cy="28" r="2" fill="#2e2e2e" />
                    <circle cx="40" cy="28" r="2" fill="#2e2e2e" />
                    <path d="M26 38 Q32 42 38 38" stroke="#ffb500" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  No recipes found
                </h2>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-amber-300 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors font-medium"
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