"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useCart } from "@/app/CartContext/CartContext";
import { useWishlist } from "@/app/wishlistcontext/page";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface Product {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  slug: string;
}

interface Params {
  slug: string;
}

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  slug: string;
}

const getProduct = async (slug: string): Promise<Product | null> => {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    title,
    price,
    description,
    "imageUrl": image.asset->url,
    "slug": slug.current
  }`;
  return client.fetch(query, { slug });
};

const ProductPage: React.FC<{ params: Promise<Params> }> = ({ params }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    // Unwrap params
    const fetchParams = async () => {
      const unwrappedParams = await params;
      setSlug(unwrappedParams.slug);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchProductData = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await getProduct(slug);
        if (!fetchedProduct) {
          setError("Product not found.");
        } else {
          setProduct(fetchedProduct);
        }
      } catch {
        setError("Error fetching product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  const handleWishlist = () => {
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug);
      toast.info(`${product.title} removed from wishlist.`);
    } else {
      const wishlistItem: WishlistItem = {
        id: product.slug,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        slug: product.slug,
      };
      addToWishlist(wishlistItem);
      toast.success(`${product.title} added to wishlist.`);
    }
  };

  return (
    <>
      <div className="bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <Image
              src={product.imageUrl || "/placeholder.png"}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <button
                onClick={handleWishlist}
                className="text-2xl text-red-500"
              >
                {isInWishlist(product.slug) ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            </div>
            <p className="text-base text-black mb-4">
            Discover the perfect blend of style and affordability with <br/>
             our premium sofas, chairs, stools, and vases. Designed for  <br />
             elegance and durability, they&apos;re crafted to enhance your home. <br />
             Enjoy quality at a price that fits your budget!
              {product.description}
            </p>
            <p className="text-xl font-medium text-gray-700 mb-6">
              Price: £{product.price}
            </p>
            <div className="flex gap-4">
              <button
                className="bg-[#2A254B] text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  addToCart({
                    id: product.slug,
                    title: product.title,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    quantity: 1,
                    slug: product.slug,
                  });
                  toast.success(`${product.title} added to cart!`);
                }}
              >
                Add to Cart
              </button>
              <Link href="/summry">
                <button className="bg-[#2A254B] text-white px-4 py-2 rounded-lg">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductPage;
