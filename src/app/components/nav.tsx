
"use client";

import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart, MdMenu } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/app/CartContext/CartContext";
import { useWishlist } from "@/app/wishlistcontext/page";
import { client } from "@/sanity/lib/client";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<{ _id: string; title: string; slug: { current: string } }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await client.fetch(
        `*[_type == "product"] { _id, title, slug }`
      );
      setFilteredProducts(products);
    };

    fetchProducts();
  }, []);

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      setDropdownOpen(true);
      setFilteredProducts((prev) =>
        prev.filter((product) => product.title.toLowerCase().includes(value))
      );
    } else {
      setDropdownOpen(false);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !menuOpen
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const totalCartItems = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalWishlistItems = wishlist?.length || 0;

  return (
    <header className="max-w-[1440px] flex flex-col items-center bg-white px-4 lg:px-10 mx-auto relative">
      {/* Top bar */}
      <div className="lg:flex hidden w-full justify-between items-center py-4 border-b">
        <div className="flex gap-2 items-center relative" ref={searchRef}>
          <IoSearch className="text-xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="border rounded-md p-2 w-60 focus:outline-none text-sm"
          />
          {dropdownOpen && searchTerm && (
            <div className="absolute top-12 left-0 bg-white shadow-lg rounded-md w-60 p-2 z-50">
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map((product) => (
                    <li
                      key={product._id}
                      className="p-1 hover:bg-gray-200"
                    >
                      <Link href={`/products/${product.slug.current}`}>
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>
        <h1 className="text-[#22202E] text-2xl font-semibold">Avion</h1>
        <div className="flex text-xl gap-3 relative">
          <Link href="/summry">
            <div className="relative">
              <MdOutlineShoppingCart />
              {totalCartItems > 0 && (
                <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </div>
          </Link>
          <Link href="/wsummry">
            <div className="relative">
              <AiOutlineHeart />
              {totalWishlistItems > 0 && (
                <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </div>
          </Link>
          <Link href="/">
            <CgProfile />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex w-full justify-between items-center py-4">
        <h1 className="text-[#22202E] text-2xl font-semibold">Avion</h1>
        <MdMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white shadow-md p-4 z-10">
          <div className="flex gap-2 items-center mb-4" ref={searchRef}>
            <IoSearch className="text-xl" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search products..."
              className="border rounded-md p-2 w-full focus:outline-none text-sm"
            />
            {dropdownOpen && searchTerm && (
              <div className="absolute top-12 left-0 bg-white  text-black shadow-lg rounded-md w-full p-2 z-50">
                {filteredProducts.length > 0 ? (
                  <ul>
                    {filteredProducts.map((product) => (
                      <li
                        key={product._id}
                        className="p-1 hover:bg-gray-200"
                      >
                        <Link href={`/products/${product.slug.current}`}>
                          {product.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No products found</p>
                )}
              </div>
            )}
          </div>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/productlist" className="hover:text-gray-300">
              Ceramics
            </Link>
            <Link href="/product" className="hover:text-gray-300">
              Popular
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="lg:flex hidden w-full justify-center items-center py-4">
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <Link href="/productlist" className="hover:text-gray-700">
            Ceramics
          </Link>
          <Link href="/product" className="hover:text-gray-700">
            Popular
          </Link>
          <Link href="/about" className="hover:text-gray-700">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-700">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;







