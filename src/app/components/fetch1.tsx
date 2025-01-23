
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useCart } from "@/app/CartContext/CartContext";
import { useWishlist } from "@/app/wishlistcontext/page";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify"; // Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

// Define product interface
interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  slug: {
    current: string;
  };
}

// Define the expected response from the Sanity query
interface FetchProductsResponse {
  title: string;
  imageUrl: string;
  price: number;
  slug: {
    current: string;
  };
}

const Fetch1: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        const query = `*[_type == "product" && slug.current in ["0", "1", "2", "3"]] {
          title,
          "imageUrl": image.asset->url,
          price,
          slug
        }`;
        const result: FetchProductsResponse[] = await client.fetch(query);
        const productsWithId = result.map((product, index) => ({
          ...product,
          id: index.toString(),
        }));
        setProducts(productsWithId);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(
      (item) => item.slug === product.slug.current
    );

    if (isInWishlist) {
      removeFromWishlist(product.slug.current);
      toast.info(`"${product.title}" removed from your wishlist!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        slug: product.slug.current,
      });
      toast.success(`"${product.title}" added to your wishlist!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-10 w-full">
      <h1 className="text-start py-6 sm:py-10 mt-8 sm:mt-14 text-2xl sm:text-3xl text-[#2A254B]">
        New Ceramics
      </h1>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isInWishlist = wishlist.some(
            (item) => item.slug === product.slug.current
          );

          return (
            <div
              key={product.slug.current}
              className="rounded-md overflow-hidden shadow-md p-4"
            >
              <Link href={`/products/${product.slug.current}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={305}
                  height={462}
                  className="w-full h-auto rounded-md object-cover"
                />
                <h2 className="mt-4 text-lg font-bold text-gray-800">
                  {product.title}
                </h2>
                <p className="text-md text-gray-600 mt-2">£{product.price}</p>
              </Link>

              {/* Icons and Button Container */}
              <div className="flex items-center justify-between mt-4">
                {/* Wishlist Icon */}
                <div
                  onClick={() => toggleWishlist(product)}
                  className="cursor-pointer text-2xl text-red-500 hover:text-red-600"
                >
                  {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      slug: product.slug.current,
                      quantity: 1,
                    });
                    toast.success(`"${product.title}" added to your cart!`, {
                      position: "top-right",
                      autoClose: 3000,
                    });
                  }}
                  className="bg-[#2A254B] text-white px-4 py-2 rounded hover:bg-violet-900 transition-colors"
                >
                  <MdOutlineShoppingCart />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Fetch1;
