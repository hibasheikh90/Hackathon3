import React from "react";
import Image from "next/image";

// Define the type for the props that will be passed into the InfoCard component
interface InfoCardProps {
  imgSrc: string; // imgSrc should be a string (URL or file path)
  imgAlt: string; // imgAlt should be a string (alt text for the image)
  title: string; // title should be a string
  description: string; // description should be a string
}

// Card component to handle repetitive structure
const InfoCard: React.FC<InfoCardProps> = ({
  imgSrc,
  imgAlt,
  title,
  description,
}) => {
  return (
    <div className="w-full sm:w-[270px] flex flex-col items-start gap-4">
      <div className="relative w-[48px] h-[48px]">
        <Image src={imgSrc} alt={imgAlt} layout="fill" objectFit="contain" />
      </div>
      <h1 className="font-[Clash Display] font-normal text-[#2A254B] text-xl leading-7">
        {title}
      </h1>
      <p className="font-[Satoshi] font-normal text-[#2A254B] text-sm leading-6">
        {description}
      </p>
    </div>
  );
};

const Brand = () => {
  return (
    <div className="bg-[#ffffff]">
      {/* Title Section */}
      <div className="flex justify-center pt-14 px-4">
        <h1 className="font-[Clash Display] font-normal text-[#2A254B] text-3xl leading-8 text-center">
          What makes our brand different
        </h1>
      </div>

      {/* Info Cards Section */}
      <div className="flex flex-wrap justify-center sm:justify-between items-start gap-8 py-8 px-4">
        <InfoCard
          imgSrc="/Delivery.png"
          imgAlt="Delivery"
          title="Next day as standard"
          description="Order before 3pm and get your order the next day as standard"
        />
        <InfoCard
          imgSrc="/Checkmark.png"
          imgAlt="Made by true artisans"
          title="Made by true artisans"
          description="Handmade crafted goods made with real passion and craftsmanship"
        />
        <InfoCard
          imgSrc="/Purchase.png"
          imgAlt="Unbeatable prices"
          title="Unbeatable prices"
          description="For our materials and quality you won’t find better prices anywhere"
        />
        <InfoCard
          imgSrc="/Sprout.png"
          imgAlt="Recycled packaging"
          title="Recycled packaging"
          description="We use 100% recycled packaging to ensure our footprint is manageable"
        />
      </div>
    </div>
  );
};

export default Brand;
