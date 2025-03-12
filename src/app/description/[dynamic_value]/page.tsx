import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ dynamic_value: string }>;
}) => {
  const { dynamic_value } = await params;

  return <div className="h-[70vh]">Dynamic value is: {dynamic_value}</div>;
};

export default page;
