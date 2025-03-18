import React from "react";
import { Button } from "../../components/ui/button";

const Banner = () => {
  return (
    <section className="bg-[#202020] my-[20px] sm:my-[24px] md:my-[28px] lg:my-[32px] mx-[16px] sm:mx-[24px] md:mx-[32px] lg:mx-[48px] h-auto sm:h-[204px] md:h-64 relative overflow-hidden rounded-[10px]">
      {/* Mobile layout - stacked vertically */}
      <div className="flex flex-col p-6 md:hidden">
        <div className="mb-[40px] ">
          <h2 className="text-white text-xl font-semibold">
            Some Fancy Text
            <br />
          </h2>
          <div className="relative">
            <h2 className="text-white text-xl font-semibold absolute left-0 top-0">
              {" "}
              For CTA
            </h2>
            <h2 className="text-blue-500 text-3xl font-bold block mt-1 absolute left-[86px] top=[29px]">
              Keywords
            </h2>
          </div>
        </div>

        <div className="mb-[15px]">
          <p className="text-white text-sm mb-4">
            I am looking for UI engineers and data-oriented designers to come
            work with me on the Design Technol
          </p>

          {/* Full width button on mobile */}
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xl py-1.5 px-3 rounded">
            CTA Button
          </Button>
        </div>
      </div>

      {/* Original layout for tablets and larger - hidden on mobile */}
      <div className="hidden md:block h-full w-full">
        {/* Left text content - responsive positioning and font sizes */}
        <div className="absolute left-6 sm:left-10 md:left-16 lg:left-20 top-8 sm:top-12 md:top-16 lg:top-20 z-10">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
            Some Fancy Text
            <br />
            For CTA{" "}
            <span className="text-blue-500 text-2xl sm:text-3xl md:text-3xl lg:text-5xl block top-12 ml-30 absolute">
              Keywords
            </span>
          </h2>
        </div>

        {/* Right text content - responsive positioning and width */}
        <div className="absolute right-6 sm:right-10 md:right-16 lg:right-20 top-1/2 transform -translate-y-1/2 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-md z-10">
          <p className="text-white text-sm sm:text-base md:text-md lg:text-lg mb-3 sm:mb-4 md:mb-6">
            I am looking for UI engineers and data-oriented designers to come
            work with me on the Design Technol
          </p>

          {/* CTA Button - responsive sizing */}
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm md:text-base py-1.5 sm:py-2 px-3 sm:px-4 md:px-6 rounded">
            CTA Button
          </Button>
        </div>
      </div>

      {/* Metallic circular elements - responsive sizing, hidden on mobile */}
      <div className="hidden md:block absolute scale-positioned left-1/2 top-1/3 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700"
          style={{
            background:
              "radial-gradient(circle at center, #fff 0%, #888 50%, #444 100%)",
            boxShadow: "0 0 10px rgba(255,255,255,0.3)",
          }}
        ></div>
      </div>

      <div className="hidden md:block absolute scale-positioned left-1/3 bottom-1/4 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, #fff 0%, #888 50%, #444 100%)",
            boxShadow: "0 0 10px rgba(255,255,255,0.3)",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Banner;
