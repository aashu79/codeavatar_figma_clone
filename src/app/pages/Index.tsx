import React from "react";
import HeroImageSection from "../sections/HeroImageSection";
import GoodLabelSection from "../sections/GoodLabelSection";
import Banner from "../sections/Banner";

const Index = () => {
  const firstSectionData = [
    {
      id: "1",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "2",
      title: "title",
      description: "A small description",
      isHighlighted: true,
    },
    {
      id: "3",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "4",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "5",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "6",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "7",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "8",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "9",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "10",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "11",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "12",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
  ];

  const secondSectionData = [
    {
      id: "13",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "14",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "15",
      title: "title",
      description: "A small description",
      isHighlighted: true,
    },
    {
      id: "16",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
  ];

  const thirdSectionData = [
    {
      id: "17",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "18",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "19",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "20",
      title: "title",
      description: "A small description",
      isHighlighted: true,
    },
  ];

  const fourthSectionData = [
    {
      id: "21",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "22",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "23",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      id: "24",
      title: "title",
      description: "A small description",
      isHighlighted: false,
    },
  ];

  return (
    <>
      <HeroImageSection />

      <GoodLabelSection isButtonVisible={false} data={firstSectionData} />
      <hr className="my-[64px] mx-[20px] md:mx-[49px] border-t-[2px] border-dashed border-gray-400" />
      <GoodLabelSection isButtonVisible={true} data={secondSectionData} />
      <hr className="my-[64px] mx-[20px] md:mx-[49px] border-t-[2px] border-dashed border-gray-400" />
      <GoodLabelSection isButtonVisible={true} data={thirdSectionData} />
      <hr className="my-[64px] mx-[20px] md:mx-[49px] border-t-[2px] border-dashed border-gray-400" />
      <GoodLabelSection isButtonVisible={true} data={fourthSectionData} />
      <Banner />
    </>
  );
};

export default Index;
