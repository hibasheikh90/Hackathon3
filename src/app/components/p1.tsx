import Image from "next/image";

const Page = () => {
  return (
    <div>
      {/* Main Section */}
      <div className="p-3">
        {/* Header Image */}
        <div className="mb-4">
          <Image
            src="/f.png"
            alt="Header Image"
            width={1920}
            height={1080}
            className="object-cover mt-3"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-10 md:px-20 py-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 md:text-lg">
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Category
            </button>
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Product type
            </button>
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Price
            </button>
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Brand
            </button>
          </div>

          {/* Sorting Section */}
          <div className="flex items-center gap-2 text-sm md:text-lg mt-4 md:mt-0">
            <span>Sorting by:</span>
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Date added
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
    </div>
  );
};

export default Page;
