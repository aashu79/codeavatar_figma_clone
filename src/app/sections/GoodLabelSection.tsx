import React from "react";
import Card from "../appComponents/common/Card";
import { CardProps } from "../../types/globalTypes";
import { Button } from "../../components/ui/button";

interface sectionProps {
  isButtonVisible: boolean;
  data: CardProps[];
}

const GoodLabelSection = ({ isButtonVisible, data }: sectionProps) => {
  return (
    <div className="my-[32px] mx-auto w-full">
      <div className="flex gap-2 items-center mx-auto w-[20%]">
        <h1>A Good Label</h1>
        <Button className="bg-white text-black border-gray-300 border-[1px]">
          Value
        </Button>
      </div>

      {/* card section  */}

      <div className="flex flex-wrap gap-4 mt-[32px]  justify-center">
        {data?.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            isHighlighted={card.isHighlighted}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        {isButtonVisible && (
          <Button className="bg-white h-[56px] w-[129px]  py-[16px] px-[39px] text-black rounded-[40px] hover:bg-gray-200 transition-colors hover:cursor-pointer">
            Button
          </Button>
        )}
      </div>
    </div>
  );
};

export default GoodLabelSection;
