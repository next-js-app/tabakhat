"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";

/**
 * @param {{ recipe: { idMeal: string; strMeal: string; strMealThumb:string; strCategory: string; } }} props
 */
export const RecipeCard = ({ recipe }) => {
  const { addToWishlist, removeFromWishlist, isItemInWishlist, isHydrated } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const cardRef = useRef(null);
  const [spotlightStyle, setSpotlightStyle] = useState({});

  // Update local state when wishlist changes
  useEffect(() => {
    if (isHydrated) {
      const currentState = isItemInWishlist(recipe.idMeal);
      setIsInWishlist(currentState);
    }
  }, [isHydrated, isItemInWishlist, recipe.idMeal]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightStyle({
      "--spotlight-x": `${x}px`,
      "--spotlight-y": `${y}px`,
    });
  };

  const handleWishlistToggle = () => {
    if (!isHydrated) return;
    
    const newState = !isInWishlist;
    setIsInWishlist(newState);
    
    if (newState) {
      addToWishlist(recipe.idMeal);
    } else {
      removeFromWishlist(recipe.idMeal);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative w-full cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <div className="absolute inset-0 bg-brand-yellow/30 blur-xl animate-subtle-glow rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>

      <Card
        className="relative z-10 w-full aspect-[4/2] overflow-hidden rounded-2xl bg-black shadow-lg"
        style={spotlightStyle}
      >
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 260px"
        />

        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(200px circle at var(--spotlight-x) var(--spotlight-y), hsla(48, 100%, 50%, 0.25), transparent 80%)`,
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

        {isHydrated && (
          <motion.div
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-20 h-9 w-9 rounded-full bg-white/30 backdrop-blur-sm transition-all hover:bg-white/50 flex items-center justify-center cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleWishlistToggle();
              }
            }}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className={`h-5 w-5 transition-colors ${
                isInWishlist ? "text-amber-500" : "text-white/80"
              }`}
              fill={isInWishlist ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              initial={false}
              animate={{
                scale: isInWishlist ? [1, 1.2, 1] : 1,
                rotate: isInWishlist ? [0, 10, -10, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </motion.svg>
          </motion.div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
          <p className="font-semibold text-brand-yellow text-sm">
            {recipe.strCategory}
          </p>
          <h3 className="text-lg font-bold leading-tight tracking-tight mb-2">
            {recipe.strMeal}
          </h3>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border border-yellow-400 bg-transparent opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0  group-hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full"
          >
            <Link href={`/recipes/${recipe.idMeal}`}>
              Show Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
