import React from "react";
import { CardProps } from "../../../types/globalTypes";
import {
  Card as CardComponent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const Card = ({ title, description, isHighlighted }: CardProps) => {
  return (
    <CardComponent className="rounded-lg border-none  bg-[#f8f8f8]  shadow-none overflow-hidden w-[100%] md:mx-auto md:max-w-[438px]   md:max-h-[409px]">
      <CardHeader
        className={`p-6 shadow-sm hidden md:block  ${
          isHighlighted ? "bg-orange-100" : "bg-white"
        }`}
      >
        <div
          className={`w-[100%]  h-[180px] my-[20px]  mx-auto ${
            isHighlighted ? "bg-white" : "bg-gray-200"
          }`}
        />
      </CardHeader>
      <CardFooter className="flex gap-[12px] md:gap-[16px]  ">
        <div className="w-12 h-12 relative bg-neutral-200 rounded-lg" />

        <div className="md:p-2 items-start md:border-none w-full border-b ">
          <div className="flex items-center justify-start mb-1 ">
            <h3 className="text-lg md:text-xl font-medium text-gray-900">
              {title}
            </h3>
            {isHighlighted && (
              <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-orange-500 rounded">
                Badge
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </CardFooter>
    </CardComponent>
  );
};

export default Card;
