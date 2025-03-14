import React from "react";
import { CardProps } from "../../../types/globalTypes";
import {
  Card as CardComponent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const Card = ({ title, description, isHighlighted }: CardProps) => {
  return (
    <CardComponent className="rounded-lg bg-[#f8f8f8] border-none shadow-none overflow-hidden w-full mx-auto max-w-[438px] max-h-[409px]">
      <CardHeader
        className={`p-6 shadow-sm  ${
          isHighlighted ? "bg-orange-100" : "bg-white"
        }`}
      >
        <div
          className={`w-[100%] h-[180px] my-[20px]  mx-auto ${
            isHighlighted ? "bg-white" : "bg-gray-200"
          }`}
        />
      </CardHeader>
      <CardFooter className="flex gap-[16px]">
        <div className="w-12 h-12 relative bg-neutral-200 rounded-lg" />

        <div className=" items-start p-2">
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
      </CardFooter>
    </CardComponent>
  );
};

export default Card;
