"use client";
import React from "react";
import Card from "../appComponents/common/Card";
import { CardProps } from "../../types/globalTypes";
import { Button } from "../../components/ui/button";
import { useGetAllProductsQuery } from "../apiServices/productServices";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Link from "next/link";

interface sectionProps {
  isButtonVisible: boolean;
  data: CardProps[];
}

const GoodLabelSection = ({ isButtonVisible, data }: sectionProps) => {
  const {
    data: productData,
    error,
    isLoading,
  } = useGetAllProductsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  // console.log(productData);

  const {
    siteVisitors: { uniqueVisitors, totalVisits },
    referrals,
  } = useSelector((state: RootState) => state.globalState);
  console.log(referrals);
  return (
    <section className="my-[32px] mx-[20px] md:!mx-[40px] lg:mx-[48px]">
      <header className="inline-block md:flex justify-start md:justify-center items-center">
        <div className="flex gap-2 sm:justify-start items-center mx-auto">
          <h1>A Good Label</h1>
          <Button className="bg-white text-black border-gray-300 border-[1px] hover:text-white hover:cursor-pointer">
            Value
          </Button>
        </div>
      </header>

      {/* card section  */}

      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-[20px] md:!gap-[24px] my-[12px] md:my-[32px] justify-start md:justify-center">
        {data?.map((card, index) => (
          <Card
            id={card.id}
            key={index}
            title={card.title}
            description={card.description}
            isHighlighted={card.isHighlighted}
          />
        ))}
      </div>
      <footer className="flex justify-center items-center">
        {isButtonVisible && (
          <Button className="bg-white hidden md:block h-[56px] w-[129px]  py-[16px] px-[39px] text-black rounded-[40px] hover:bg-gray-200 transition-colors hover:cursor-pointer">
            Button
          </Button>
        )}
      </footer>
    </section>
  );
};

export default GoodLabelSection;
