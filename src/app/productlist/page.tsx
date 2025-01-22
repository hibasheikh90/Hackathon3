"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import P1 from "../../app/components/p1";
import Link from "next/link";
import { useCart } from "@/app/CartContext/CartContext"; // Import useCart hook
import { useWishlist } from "@/app/wishlistcontext/page"; // Import useWishlist hook
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Wishlist icons

interface Product {
  title: string;
  imageUrl: string;
  price: number;
  slug: string;
}

interface FetchProductsResponse {
  title: string;
  imageUrl: string;
  price: number;
  slug: string;
}

const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Client check state
  const { addToCart } = useCart(); // Get addToCart function from context
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Wishlist logic

  useEffect(() => {
    setIsClient(true); // Client-side logic only
  }, []);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);

        // The order of slugs to maintain
        const slugOrder = [
          "0",
          "1",
          "2",
          "3",
          "8",
          "9",
          "7",
          "10",
          "11",
          "12",
          "13",
          "14",
        ];

        const query = `*[_type == "product" && slug.current in ${JSON.stringify(
          slugOrder
        )}] {
          title,
          "imageUrl": image.asset->url,
          price,
          "slug": slug.current
        }`;

        const result: FetchProductsResponse[] = await client.fetch(query);

        // Sort products based on the slugOrder array
        const sortedProducts = result.sort(
          (a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug)
        );

        setProducts(sortedProducts);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product): void => {
    addToCart({ id: product.slug, ...product, quantity: 1 });
    if (isClient) {
      toast.success(`${product.title} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const toggleWishlist = (product: Product): void => {
    const isInWishlist = wishlist.some((item) => item.slug === product.slug);
    if (isInWishlist) {
      removeFromWishlist(product.slug);
      toast.info(`"${product.title}" removed from your wishlist!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      addToWishlist({ id: product.slug, ...product });
      toast.success(`"${product.title}" added to your wishlist!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {/* Only render ToastContainer on the client */}
      {isClient && <ToastContainer />}

      {/* P1 Component */}
      <P1 />

      {/* Main Content */}
      <div className="p-10 w-full">
        <h1 className="text-start py-4 sm:py-6 mt-4 sm:mt-6 text-2xl sm:text-3xl text-[#2A254B]">
          New Ceramics
        </h1>

        {/* Loading and Error States */}
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-[#2A254B]">{error}</p>}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isInWishlist = wishlist.some(
              (item) => item.slug === product.slug
            );

            return (
              <div key={product.slug} className="p-4">
                <Link href={`/products/${product.slug}`}>
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

                {/* Wishlist and Cart Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <div
                    onClick={() => toggleWishlist(product)}
                    className="cursor-pointer text-2xl text-red-500 hover:text-red-600"
                  >
                    {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#2A254B] text-white px-4 py-2 mt-4 rounded hover:bg-[#3b3660] "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
