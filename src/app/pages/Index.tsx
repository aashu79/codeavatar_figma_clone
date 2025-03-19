import React from "react";
import HeroImageSection from "../sections/HeroImageSection";
import GoodLabelSection from "../sections/GoodLabelSection";
import Banner from "../sections/Banner";

const Index = () => {
  const firstSectionData = [
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: true,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
  ];

  const secondSectionData = [
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: true,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
  ];

  const thirdSectionData = [
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: true,
    },
  ];

  const fourthSectionData = [
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
      description: "A small description",
      isHighlighted: false,
    },
    {
      title: "Title",
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
