"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  slug: string;
}

interface WishlistContextType {
  wishlist: ReadonlyArray<WishlistItem>;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (slug: string) => void;
  clearWishlist: () => void;
  isInWishlist: (slug: string) => boolean; // Make sure this line exists
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist =
      typeof window !== "undefined" ? localStorage.getItem("wishlist") : null;
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((wishlistItem) => wishlistItem.slug === item.slug)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (slug: string) => {
    setWishlist((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearWishlist = () => setWishlist([]);

  const isInWishlist = (slug: string): boolean => {
    return wishlist.some((item) => item.slug === slug);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
