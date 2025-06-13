"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/hooks/use-wishlist";
import { RecipeCard } from "../components/RecipeCard";
import { Button } from "@/components/ui/button";
import { HeartCrack } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const WishlistPage = () => {
  const { wishlist, isHydrated } = useWishlist();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistRecipes = async () => {
      if (!isHydrated) return;

      if (wishlist.length === 0) {
        setRecipes([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const recipePromises = wishlist.map((id) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        ).then((res) => res.json())
      );
      const results = await Promise.all(recipePromises);
      const fetchedRecipes = results
        .map((result) => result.meals[0])
        .filter(Boolean);
      setRecipes(fetchedRecipes);
      setIsLoading(false);
    };
    fetchWishlistRecipes();
  }, [wishlist, isHydrated]);

  if (!isHydrated || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size={48} />
        <span className="mt-4 text-gray-500 text-lg font-medium">
          Loading wishlist...
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <AnimatePresence mode="popLayout">
        {recipes.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {recipes.map((recipe) => (
                <motion.div
                  key={recipe.idMeal}
                  className="h-full"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4"
          >
            <HeartCrack className="w-24 h-24 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-6">
              Explore recipes and add your favorites!
            </p>
            <Button asChild>
              <Link href="/recipes">Explore Recipes</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishlistPage;
