"use client";

import { useState, useEffect, useCallback } from "react";

// Create a global state to ensure all components share the same wishlist
let globalWishlist = [];
let globalListeners = new Set();

const notifyListeners = () => {
  globalListeners.forEach((listener) => listener(globalWishlist));
};

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(globalWishlist);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          globalWishlist = parsed;
          setWishlist(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Listen for global state changes
  useEffect(() => {
    const listener = (newWishlist) => {
      setWishlist(newWishlist);
    };

    globalListeners.add(listener);

    return () => {
      globalListeners.delete(listener);
    };
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        if (wishlist.length > 0) {
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
        } else {
          localStorage.removeItem("wishlist");
        }
      } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
      }
    }
  }, [wishlist, isHydrated]);

  /**
   * @param {string} mealId
   */
  const addToWishlist = useCallback((mealId) => {
    if (!mealId || typeof mealId !== "string") return;

    const newWishlist = globalWishlist.includes(mealId)
      ? globalWishlist
      : [...globalWishlist, mealId];

    globalWishlist = newWishlist;
    setWishlist(newWishlist);
    notifyListeners();
  }, []);

  /**
   * @param {string} mealId
   */
  const removeFromWishlist = useCallback((mealId) => {
    if (!mealId || typeof mealId !== "string") return;

    const newWishlist = globalWishlist.filter((id) => id !== mealId);
    globalWishlist = newWishlist;
    setWishlist(newWishlist);
    notifyListeners();
  }, []);

  /**
   * @param {string} mealId
   */
  const isItemInWishlist = useCallback((mealId) => {
    if (!mealId || typeof mealId !== "string") return false;
    return globalWishlist.includes(mealId);
  }, []);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
    isHydrated,
  };
};
