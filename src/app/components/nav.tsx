
"use client";

import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdMenu } from "react-icons/md";
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

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await client.fetch(`
        *[_type == "product"] {
          _id,
          title,
          slug
        }
      `);
      setFilteredProducts(products);
    };

    fetchProducts();
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && !menuOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const totalCartItems = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalWishlistItems = wishlist?.length || 0;

  return (
    <header className="max-w-[1440px] h-[132px] flex flex-col items-center bg-white px-10 lg:w-full mx-auto relative">
      {/* Top bar */}
      <div className="lg:flex hidden border-b-[0.5px] border-[#0000004f] h-1/2 w-full mx-auto justify-between items-center">
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
                    <li key={product._id} className="p-1 hover:bg-gray-200">
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
      <div className="lg:hidden flex w-full justify-between items-center h-1/2">
        <h1 className="text-[#22202E] text-2xl font-semibold">Avion</h1>
        <MdMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
      </div>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white shadow-md p-4 z-10">
          <div className="mb-4">
            <div className="flex gap-2 items-center relative" ref={searchRef}>
              <IoSearch className="text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search products..."
                className="border rounded-md p-2 w-full focus:outline-none text-sm"
              />
              {dropdownOpen && searchTerm && (
                <div className="absolute top-12 left-0 bg-white shadow-lg rounded-md w-full p-2 z-50">
                  {filteredProducts.length > 0 ? (
                    <ul>
                      {filteredProducts.map((product) => (
                        <li key={product._id} className="p-1 hover:bg-gray-200">
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
          </div>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-[#5a526c]">
              Home
            </Link>
            <Link href="/productlist" className="hover:text-[#5a526c]">
              Ceramics
            </Link>
            <Link href="/product" className="hover:text-[#5a526c]">
              Popular
            </Link>
            <Link href="/about" className="hover:text-[#5a526c]">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#5a526c]">
              Contact Us
            </Link>
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="lg:flex hidden sm:hidden w-full justify-center items-center h-1/2">
        <nav className="flex gap-6 justify-center">
          <Link href="/" className="hover:text-[#5a526c]">
            Home
          </Link>
          <Link href="/productlist" className="hover:text-[#5a526c]">
            Ceramics
          </Link>
          <Link href="/product" className="hover:text-[#5a526c]">
            Popular
          </Link>
          <Link href="/about" className="hover:text-[#5a526c]">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#5a526c]">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;














