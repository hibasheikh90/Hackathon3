"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/CartContext/CartContext";
import { useWishlist } from "@/app/wishlistcontext/page"; // Wishlist Context
import { ToastContainer, toast } from "react-toastify"; // Toastify
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Icons
import { MdOutlineShoppingCart } from "react-icons/md"; // Shopping Cart Icon
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  slug?: {
    current: string;
  };
}

interface FetchProductsResponse {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  slug?: {
    current: string;
  };
}

const Fetch3: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart(); // Cart Context
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Wishlist Context

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        const query = `*[_type == "product" && slug.current in ["0", "1", "2", "3"]] {
          _id,
          title,
          "imageUrl": image.asset->url,
          price,
          slug
        }`;
        const result: FetchProductsResponse[] = await client.fetch(query);
        setProducts(
          result.map((item) => ({
            id: item._id,
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price,
            slug: item.slug,
          }))
        );
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
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      slug: product.slug?.current || "",
    });
    toast.success(`${product.title} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);

    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.title} removed from wishlist!`);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        slug: product.slug?.current || "",
      });
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  return (
    <div className="p-10 w-full">
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4">
            {product.slug?.current ? (
              <Link href={`/products/${product.slug.current}`}>
                <div>
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
                </div>
              </Link>
            ) : (
              <div>
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
              </div>
            )}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-[#2A254B] text-white px-4 py-2 rounded hover:bg-[#2A254B] transition"
              >
                <MdOutlineShoppingCart />
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                {wishlist.some((item) => item.id === product.id) ? (
                  <AiFillHeart size={24} />
                ) : (
                  <AiOutlineHeart size={24} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Fetch3;
