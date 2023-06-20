import { NextPageProps } from "@/types/components";
import React from "react";

export type CategoryDetailsProps = NextPageProps<{
  names: [string, string | undefined];
}>;

function CategoryDetails({ params }: CategoryDetailsProps) {
  const {
    names: [category, subCategory]
  } = params;

  return <div className="">
    
  </div>;
}

export default CategoryDetails;
