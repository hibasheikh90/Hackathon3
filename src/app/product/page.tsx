"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Brand from "../components/brand";
import Club from "../components/club";
import Fetch3 from "../components/fetch3";

const Page = () => {
  const [isClient, setIsClient] = useState(false); // For ensuring client-side code

  useEffect(() => {
    setIsClient(true); // Set client-side state after mounting
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full min-h-screen text-[#ffffff]">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-64 lg:h-auto">
          <Image
            src="/img Left.png"
            alt="The Dandy Chair"
            layout="intrinsic" // Use intrinsic for better compatibility
            width={721}
            height={759}
            className="object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 text-[#2A254B]">
          {/* Title and Price */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold font-[Clash Display]">
              The Dandy Chair
            </h1>
            <p className="text-lg sm:text-xl font-normal font-[Satoshi] text-[#12131A]">
              £250
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-medium font-[Clash Display]">
              Description
            </h2>
            <p className="text-sm sm:text-base font-[Satoshi] text-[#505977]">
              A timeless design, with premium materials features as one of our
              most popular and iconic pieces. The dandy chair is perfect for any
              stylish living space with beech legs and lambskin leather
              upholstery.
            </p>
            <ul className="mt-4 list-disc pl-5 text-sm sm:text-base font-[Satoshi] text-[#505977]">
              <li>Premium material</li>
              <li>Handmade upholstery</li>
              <li>Quality timeless classic</li>
            </ul>
          </div>

          {/* Dimensions */}
          <div className="mb-6">
            <h2 className="text-lg font-medium font-[Clash Display]">
              Dimensions
            </h2>
            <div className="flex flex-wrap gap-4 mt-2">
              <div>
                <p className="text-sm font-[Clash Display]">Height</p>
                <p className="text-sm font-[Clash Display]">110cm</p>
              </div>
              <div>
                <p className="text-sm font-[Clash Display]">Width</p>
                <p className="text-sm font-[Clash Display]">75cm</p>
              </div>
              <div>
                <p className="text-sm font-[Clash Display]">Depth</p>
                <p className="text-sm font-[Clash Display]">50cm</p>
              </div>
            </div>
          </div>

          {/* Amount and Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-medium">Amount:</h3>
              <div className="flex items-center border rounded-md px-3 py-1 bg-[#F9F9F9]">
                <button className="text-[#CAC6DA]">-</button>
                <span className="mx-2 text-[#CAC6DA]">-</span>
                <button className="text-[#CAC6DA]">-</button>
              </div>
            </div>
            <button className="bg-[#2A254B] text-white px-6 py-3 rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Rendering for Client Side */}
      {isClient && (
        <>
          <div className="p-6 sm:p-10">
            <h1 className="text-start py-6 sm:py-10 mt-8 sm:mt-14 text-2xl sm:text-3xl text-[#2A254B]">
              You might also like
            </h1>
          </div>
          <Fetch3 />
          <Brand />
          <Club />
        </>
      )}
    </div>
  );
};

export default Page;
