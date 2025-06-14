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

const EmptyWishlist = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-64 h-64"
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        </motion.div>

        {/* Main illustration */}
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10"
          initial="hidden"
          animate="visible"
        >
          {/* Main circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#2e2e2e"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Inner circle with amber */}
          <motion.circle
            cx="100"
            cy="100"
            r="45"
            fill="none"
            stroke="#ffb500"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Heart icon - larger and lower */}
          <motion.path
            d="M100,92 C88,80 72,80 72,97 C72,114 100,126 100,126 C100,126 128,114 128,97 C128,80 112,80 100,92 Z"
            fill="#eb383c"
            stroke="#eb383c"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Break line - larger and centered plus */}
          <motion.path
            d="M100,100 L100,118 M90,109 L110,109"
            stroke="#ffb500"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
          />

          {/* Decorative dots - alternating colors */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 100 + 50 * Math.cos(angle);
            const y = 100 + 50 * Math.sin(angle);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill={i % 2 === 0 ? "#2e2e2e" : "#ffb500"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1 + i * 0.1,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Floating elements - all amber */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: '#ffb500',
                  top: `${30 + i * 20}%`,
                  left: `${20 + i * 30}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.svg>

        {/* Floating elements */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{
                top: `${30 + i * 20}%`,
                left: `${20 + i * 30}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-bold text-zinc-700">
          Wishlist is Empty
        </h2>
        <p className="text-zinc-500 text-lg max-w-md mx-auto">
          Explore recipes and add your favorites!
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6"
        >
          <Button
            asChild
            className="bg-amber-300 hover:bg-amber-400 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/recipes">
              Explore Recipes
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

import React from 'react'

export default function WishlistClient() {
 
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
        <Spinner size={48} />
        <span className="mt-4 text-gray-500 text-lg font-medium">
          Loading wishlist...
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4  sm:p-6 min-h-[60vh]">
      <h1 className="text-5xl font-bold text-gray-900 mb-1">
        My <span>Wishlist</span>
      </h1>
      <p className="text-lg md:text-lg text-zinc-600 mb-8">
        Explore recipes and add your favorites!
      </p>
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
          <EmptyWishlist />
        )}
      </AnimatePresence>
    </div>
  );

}


