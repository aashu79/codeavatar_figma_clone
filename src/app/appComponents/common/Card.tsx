import React from "react";
import { CardProps } from "../../../types/globalTypes";

const Card = ({ title, description, isHighlighted }: CardProps) => {
  return (
    <div className="rounded-lg overflow-hidden  w-[330px] h-[409px]">
      <div
        className={`p-6 shadow-sm  ${
          isHighlighted ? "bg-orange-100" : "bg-white"
        }`}
      >
        <div
          className={`w-[100%] h-[180px] my-[20px]  mx-auto ${
            isHighlighted ? "bg-white" : "bg-gray-200"
          }`}
        ></div>
      </div>
      <div className="flex flex-col items-start p-2">
        <div className="flex items-center justify-start mb-1 ">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {isHighlighted && (
            <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-orange-500 rounded">
              Badge
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
