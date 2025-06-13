"use client";

import { useState, useEffect } from "react";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    if (wishlist.length > 0 || localStorage.getItem("wishlist")) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  /**
   * @param {string} mealId
   */
  const addToWishlist = (mealId) => {
    if (!wishlist.includes(mealId)) {
      setWishlist([...wishlist, mealId]);
    }
  };

  /**
   * @param {string} mealId
   */
  const removeFromWishlist = (mealId) => {
    setWishlist(wishlist.filter((id) => id !== mealId));
  };

  /**
   * @param {string} mealId
   */
  const isItemInWishlist = (mealId) => {
    return wishlist.includes(mealId);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isItemInWishlist };
};
