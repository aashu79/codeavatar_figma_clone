"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CardProps } from "../../../types/globalTypes";
import {
  Card as CardComponent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useDispatch } from "react-redux";

const Card = ({ id, title, description, isHighlighted }: CardProps) => {
  const dispatch = useDispatch();
  const handleViewCount = (id: number | string) => {
    dispatch({
      type: "globalState/increaseViewCount",
      payload: { id: Number(id) },
    });
  };

  return (
    <div
      onClick={() => {
        handleViewCount(id);
      }}
    >
      <Link href={`/detail/${id}`}>
        <CardComponent className="rounded-lg  bg-[#f4f4f5d1]  border-none py-1     shadow-none overflow-hidden w-[100%] md:mx-auto md:!max-w-[438px]   md:!max-h-[409px] ">
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
          <CardFooter className="flex gap-[12px] ">
            <div className="w-[48px] h-[48px]  bg-neutral-200 rounded-lg " />

            <div className="md:px-2 items-start md:border-none w-full border-b pb-3">
              <div className="flex items-center justify-start ">
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
      </Link>
    </div>
  );
};

export default Card;
