"use client";
import React from "react";
import { useCart } from "@/app/CartContext/CartContext";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <div className="text-center mt-10">Your cart is empty.</div>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">Cart Summary</h1>
        <ul className="mb-6 space-y-4">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product Image */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                {/* Product Details */}
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">£{item.price}</p>
                </div>
              </div>

              {/* Quantity and Total Price */}
              <div className="text-right">
                <p className="text-gray-700">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="font-bold text-gray-900">
                  Total: £{item.price * item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Clear Cart Button */}
        <button
          className="bg-[#2A254B] text-white px-6 py-2 rounded-lg gap-6"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <br />
        <br />
        <button className="bg-[#2A254B] text-white px-6 py-2 rounded-lg">
          <Link href="/payMent">Process</Link>
        </button>
      </div>
    </>
  );
};

export default CartPage;
