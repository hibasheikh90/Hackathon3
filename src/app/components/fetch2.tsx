"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/CartContext/CartContext"; // Import your Cart Context
import { useWishlist } from "@/app/wishlistcontext/page"; // Import the Wishlist Context
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Wishlist Icons
import { MdOutlineShoppingCart } from "react-icons/md"; // Shopping Cart Icon
import { Toaster, toast } from "react-hot-toast"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import styles for the toast

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  slug: { current: string };
}

interface FetchProductsResponse {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  slug: { current: string };
}

const Fetch2: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart(); // Access the addToCart function from context
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Access wishlist functions
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        // Define the desired slug order
        const slugOrder = ["4", "5", "6"];

        // Pass slugOrder to JSON.stringify
        const query = `*[_type == "product" && slug.current in ${JSON.stringify(slugOrder)}] {
          _id,
          title,
          "imageUrl": image.asset->url,
          price,
          slug
        }`;

        const result: FetchProductsResponse[] = await client.fetch(query);
        const sortedProducts = result
          .map((product) => ({
            id: product._id,
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            slug: product.slug,
          }))
          .sort(
            (a, b) =>
              slugOrder.indexOf(a.slug.current) -
              slugOrder.indexOf(b.slug.current)
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

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      slug: product.slug.current,
      quantity: 1,
    });

    // Show toast notification
    toast.success(`${product.title} added to cart!`, {
      position: "top-center",
    });
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.some((item) => item.slug === product.slug.current)) {
      removeFromWishlist(product.slug.current); // Remove from wishlist
      toast.success(`${product.title} removed from wishlist!`, {
        position: "top-center",
      });
    } else {
      addToWishlist({ ...product, slug: product.slug.current }); // Add to wishlist
      toast.success(`${product.title} added to wishlist!`, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="py-10 px-6">
      {/* Add Toaster to display notifications */}
      <Toaster />

      <div className="max-w-6xl mx-auto">
        <h3 className="ml-10 font-[Clash Display] font-normal text-3xl lg:text-4xl text-[#2A254B] mb-20">
          Our Popular Products
        </h3>

        {/* Show loading spinner if loading is true */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="loader">Loading...</div>{" "}
            {/* Add your loader here */}
          </div>
        )}

        {/* Show error message if there is an error */}
        {error && (
          <div className="text-center text-red-500 mt-10">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-wrap justify-between items-start gap-6">
          {products.map((product) => (
            <div
              key={product.slug.current} // Use slug.current as the unique key
              className={`rounded-lg overflow-hidden flex-shrink-0 ${
                product === products[0]
                  ? "w-full sm:w-[48%] lg:w-[530px]" // Larger width for the first card
                  : "w-full sm:w-[48%] lg:w-[280px]" // Standard width for other cards
              }`}
            >
              <Link href={`/products/${product.slug.current}`}>
                <div className="relative h-[375px]">
                  <Image
                    src={product.imageUrl || "/placeholder.png"} // Fallback for missing images
                    alt={product.title || "Product"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    priority
                  />
                </div>
              </Link>
              <div className="p-4">
                <h4 className="mt-4 text-lg font-semibold text-[#2A254B] text-center">
                  {product.title}
                </h4>
                <p className="text-md text-gray-600 text-center">
                  £{product.price}
                </p>

                {/* Add Wishlist Icon */}
                <div className="flex justify-center items-center mt-4 gap-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center gap-2 bg-[#2A254B] text-white px-4 py-2 rounded hover:bg-violet-950 transition-colors"
                  >
                    <MdOutlineShoppingCart />
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    {wishlist.some(
                      (item) => item.slug === product.slug.current
                    ) ? (
                      <AiFillHeart size={24} /> // Filled Heart Icon for wishlisted items
                    ) : (
                      <AiOutlineHeart size={24} /> // Outline Heart Icon for non-wishlisted items
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-[#F9F9F9] px-6 py-3 text-lg rounded hover:bg-gray-200">
            View Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fetch2;
