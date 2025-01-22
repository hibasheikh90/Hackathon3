import Image from "next/image";
import Link from "next/link";

const Herosection = () => {
  return (
    <div className="w-full h-[704px] bg-[#ffffff]">
      <div className="w-full lg:w-[1280px] h-[584px] mt-4 mx-auto bg-[#2A254b] flex flex-col lg:flex-row items-center px-8 relative">
        {/* Left Side: Text and Button */}
        <div className="w-full lg:w-[602px] mt-6 lg:mt-28 mb-9 lg:mb-40">
          <div className="flex-1 z-10 pl-8 lg:pl-10 mb-12 lg:mb-40">
            {/* Heading */}
            <h2 className="font-[Clash Display] font-normal leading-8 lg:leading-10 text-[24px] lg:text-[32px] text-[#ffffff]">
              The furniture brand for the <br /> future with timeless designs
            </h2>

            {/* Button */}
            <Link href="/productlist">
              <button className="w-[150px] h-[48px] lg:w-[170px] lg:h-[56px] bg-gray-500 flex items-center justify-center text-xs lg:text-sm font-medium text-[#fafafa] mb-6 mt-6 lg:mt-10">
                View Collection
              </button>
            </Link>
          </div>
          <div className="w-full lg:w-[602px] font-[satoshi] font-normal text-xs lg:text-sm leading-6 lg:leading-7 text-[#ffffff] mt-6 lg:mt-40 pl-8 lg:pl-10">
            A new era in eco-friendly furniture with Avelon, the French luxury
            retail brand with nice fonts, tasteful colors, and a beautiful way
            to display things digitally using modern web technologies.
          </div>
        </div>

        {/* Right Side: Image (Visible only on desktop) */}
        <div className="w-full lg:w-[520px] mb-6 lg:mb-0 hidden lg:block absolute right-0 top-0 z-0">
          <Image
            src="/hero.png"
            alt="hero"
            height={584}
            width={520}
            className="object-contain"
          />
        </div>

        {/* Mobile Image */}
        <div className="lg:hidden w-full absolute bottom-2 left-0 z-0">
          <Image
            src="/hero.png"
            alt="hero"
            height={300} // Adjust image height on mobile
            width={300} // Adjust image width on mobile
            className="object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Herosection;
