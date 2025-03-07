import React from "react";
import { Button } from "../../components/ui/button";

const Banner = () => {
  return (
    <section className="bg-black my-[32px] mx-[48px]  h-64 relative overflow-hidden  rounded-[10px]">
      {/* Left text content */}
      <div className="absolute left-20 top-20 z-10">
        <h2 className="text-white text-3xl font-semibold">
          Some Fancy Text
          <br />
          For CTA{" "}
          <span className="text-blue-500 text-5xl absolute ml-2">Keywords</span>
        </h2>
      </div>

      {/* Right text content */}
      <div className="absolute right-20 top-1/2 transform -translate-y-1/2 max-w-md z-10">
        <p className="text-white mb-6">
          I am looking for UI engineers and data-oriented designers to come work
          with me on the Design Technol
        </p>

        {/* CTA Button */}
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded">
          CTA Button
        </Button>
      </div>

      {/* Metallic circular elements */}
      <div className="absolute left-1/2 top-1/3 w-32 h-32 -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700"
          style={{
            background:
              "radial-gradient(circle at center, #fff 0%, #888 50%, #444 100%)",
            boxShadow: "0 0 10px rgba(255,255,255,0.3)",
          }}
        ></div>
      </div>

      <div className="absolute left-1/3 bottom-1/4 w-40 h-40">
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
