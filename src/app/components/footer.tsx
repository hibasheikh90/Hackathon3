
import Link from "next/link";
import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSkype,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2A254B] py-8">
      {/* Grid layout for sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-5 sm:px-20">
        {/* Menu Section */}
        <div>
          <h1 className="text-white text-lg font-semibold">Menu</h1>
          <ul className="mt-4 space-y-2 text-sm text-white">
            <li>
              <Link href="/product">
                <span className="hover:underline cursor-pointer">Popular this week</span>
              </Link>
            </li>
            <li>
              <Link href="/productlist">
                <span className="hover:underline cursor-pointer">All Products</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h1 className="text-white text-lg font-semibold">Our Company</h1>
          <ul className="mt-4 space-y-2 text-sm text-white">
            <li>
              <Link href="/about">
                <span className="hover:underline cursor-pointer">About Us</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="hover:underline cursor-pointer">Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Mailing List Section */}
        <div>
          <h1 className="text-white text-lg font-semibold">Join our mailing list</h1>
          <div className="mt-5 flex items-center gap-2">
            <input
              type="email"
              placeholder="you@gmail.com"
              className="bg-gray-500 flex-1 h-10 p-4 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-white h-10 px-6 text-sm font-semibold rounded-md hover:bg-gray-200 transition"
            >
              SignUp
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t-2 border-gray-700 mt-8 pt-6 px-5 sm:px-20 flex flex-wrap justify-between items-center">
        {/* Copyright Text */}
        <p className="text-white text-sm text-center sm:text-left w-full sm:w-auto">
          &copy; 2022 Avion LTD. All Rights Reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
          <FaLinkedin className="text-white text-2xl hover:text-blue-500 transition" />
          <FaFacebookSquare className="text-white text-2xl hover:text-blue-400 transition" />
          <FaInstagram className="text-white text-2xl hover:text-pink-500 transition" />
          <FaSkype className="text-white text-2xl hover:text-blue-300 transition" />
          <FaTwitter className="text-white text-2xl hover:text-blue-400 transition" />
          <FaPinterest className="text-white text-2xl hover:text-red-500 transition" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
