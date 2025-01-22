"use client";

import React from "react";
import { useWishlist } from "@/app/wishlistcontext/page";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mt-4">
          Start adding products to your wishlist!
        </p>
        <Link href="/" className="text-[#2A254B] underline mt-6 block">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.slug}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              {/* Product Image */}
              <Image
                src={item.imageUrl || "/placeholder.png"}
                alt={item.title}
                width={200}
                height={200}
                className="rounded-lg mb-4"
              />
              {/* Product Info */}
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-4">Price: £{item.price}</p>
              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  className="bg-[#2A254B] text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    removeFromWishlist(item.slug);
                    toast.info(`${item.title} removed from wishlist.`);
                  }}
                >
                  Remove
                </button>
                <Link
                  href={`/products/${item.slug}`}
                  className="bg-[#2A254B] text-white px-4 py-2 rounded-lg"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WishlistPage;
