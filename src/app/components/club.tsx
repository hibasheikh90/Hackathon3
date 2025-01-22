import React from "react";

const Club = () => {
  return (
    <div className="w-full h-auto bg-[#f9f9f9] flex items-center justify-center py-10">
      <div className="w-full max-w-[1273px] h-auto bg-[#ffffff] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-[571px] text-center gap-4">
          <h1 className="font-[Clash Display] font-normal text-2xl md:text-4xl leading-10 text-[#2A254B]">
            Join the club and get the benefits
          </h1>
          <p className="font-[Satoshi] font-normal text-sm md:text-base leading-6 text-[#2A254B] mt-4">
            Sign up for our newsletter and receive exclusive offers on new
            ranges, sales, pop-up stores, and more
          </p>
        </div>

        <div className="w-full max-w-[472px] mt-6 flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="you@gmail.com"
            className="bg-[#f9f9f9] w-full md:w-80 h-12 p-5 rounded-sm"
          />
          <button className="bg-[#2A254B] text-white h-12 w-full md:w-32 rounded-sm">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Club;
