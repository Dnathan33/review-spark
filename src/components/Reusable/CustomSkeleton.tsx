import React from "react";
import { Skeleton } from "../ui/ShadcnComponents/skeleton";

interface CustomSkeletonProps {
  height: string;
  width: string;
  bgColor: string;
}

const CustomSkeleton = ({ height, width, bgColor }: CustomSkeletonProps) => {
  return <Skeleton className={`${height} ${width} ${bgColor}`} />;
};

export default CustomSkeleton;
