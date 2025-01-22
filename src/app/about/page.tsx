import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="w-full py-10 px-6 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
        <h1 className="text-xl md:text-2xl font-semibold text-center lg:text-left lg:ml-12 mb-6 lg:mb-0">
          A brand built on the love of craftsmanship, <br />
          quality, and outstanding customer service
        </h1>
        <button className="w-full max-w-[192px] h-[56px] px-6 py-4 bg-[#f9f9f9] text-[#2A254B] font-[Satoshi] font-normal text-sm md:text-base leading-6 rounded-md lg:ml-auto">
          View our product
        </button>
      </div>

      <div className="w-full h-auto pt-14 pr-4 pb-14 pl-4 sm:pr-10 sm:pl-10 md:pr-20 md:pl-20 gap-4 bg-white flex flex-col lg:flex-row items-center lg:items-start">
        {/* Left Section */}
        <div className="w-full lg:w-[634px] h-[438px] bg-[#2A254B] p-6 sm:p-10 lg:p-16 flex flex-col justify-between">
          <div className="text-center lg:text-left h-[224px] w-full">
            <h1 className="font-[Clash Display] font-normal text-xl lg:text-2xl xl:text-3xl leading-10 text-white mt-6 lg:mt-5">
              It started with a small idea
            </h1>
            <p className="font-[Satoshi] font-normal text-sm lg:text-base xl:text-lg leading-6 text-white mt-2">
              A global brand with local beginnings, our story began in a small
              studio in South London in early 2014.
            </p>
          </div>
          <div className="mt-auto lg:mt-auto flex justify-center lg:justify-start">
            <button className="w-auto px-6 py-2 bg-gray-600 text-white font-[Satoshi] text-sm lg:text-base xl:text-lg leading-6 rounded-md">
              View collection
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[630px] h-auto mt-8 lg:mt-0">
          <Image
            src="/Image Block.png"
            alt="no signal"
            width={634}
            height={478}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Service Section */}
      <div className="flex flex-col md:flex-row w-full h-auto items-center px-6 py-10 space-y-8 md:space-y-0">
        <div className="w-full md:w-1/2">
          <Image
            src="/Image (3).png"
            alt="Service"
            className="w-full h-auto"
            width={720}
            height={603}
          />
        </div>
        <div className="border-2 w-full md:w-1/2 p-6 md:p-12 bg-gray-50">
          <h2 className="text-xl md:text-2xl text-custom-purple font-semibold">
            Our service isnt just personal, its actually <br /> hyper-personally
            exquisite
          </h2>
          <p className="text-custom-purple mt-6">
            When we started Avion, the idea was simple: Make high-quality
            furniture affordable and available for the mass market.
          </p>
          <p className="mt-4">
            Handmade, and lovingly crafted furniture and homeware is what we
            live, breathe, and design. Our Chelsea boutique became the hub for
            the London interior design community.
          </p>
          <button className="bg-white h-12 w-40 rounded-sm mt-8 text-custom-purple border border-custom-purple hover:bg-gray-100">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full py-12">
        <h2 className="text-center text-custom-purple text-2xl font-semibold mb-8">
          What makes our brand different
        </h2>
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {[
            {
              Image: "/Delivery.png",
              title: "Next day as standard",
              desc: "Order before 3pm and get your order the next day as standard.",
              height: 24,
              width: 24,
            },
            {
              Image: "/Checkmark.png",
              title: "Made by true artisans",
              desc: "Handmade crafted goods made with real passion and craftsmanship.",
              height: 24,
              width: 24,
            },
            {
              Image: "/Purchase.png",
              title: "Unbeatable prices",
              desc: "For our materials and quality you wont find better prices anywhere.",
              height: 24,
              width: 24,
            },
            {
              Image: "/Sprout.png",
              title: "Recycled packaging",
              desc: "We use 100% recycled materials to ensure our footprint is more manageable.",
              height: 24,
              width: 24,
            },
          ].map((item, index) => (
            <div
              key={index}
              className=" w-72 h-auto rounded-md shadow-md p-6 text-center"
            >
              <Image
                src={item.Image}
                alt={item.title}
                height={item.height}
                width={item.width}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-custom-purple">
                {item.title}
              </h3>
              <p className="text-sm text-custom-purple mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="w-full h-auto bg-gray-100 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-md">
          <h2 className="text-center text-custom-purple text-2xl font-semibold">
            Join the club and get the benefits
          </h2>
          <p className="text-center text-custom-purple mt-6 text-sm md:text-base">
            Sign up for our newsletter and receive exclusive offers on new
            ranges, sales, pop-up stores, and more.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
            <input
              type="email"
              placeholder="you@gmail.com"
              className="bg-gray-100 w-80 h-12 px-4 rounded-md focus:ring-2 focus:ring-custom-purple"
            />
            <button className="bg-purple-700 h-12 w-32 rounded-md text-white hover:bg-purple-600">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
