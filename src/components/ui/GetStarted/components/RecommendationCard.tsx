import React from "react";

export interface PlaceInfo {
  id: string;
  name: string;
  imageUrl: string;
  reviews: number;
}

function RecommendationCard({name, imageUrl, reviews}: PlaceInfo) {
  return (
    <div className="flex flex-col justify-start items-start w-[90%] md:w-[250px] lg:w-[250px] xl:w-[250px] h-[350px] rounded-md hover:cursor-pointer">
      <img src={imageUrl} className="h-[250px] rounded-md mb-[12px]" />
      <p className="font-bold text-[18px]">{name}</p>
      <p className="text-[14px]">{reviews} reviews</p>
      <p className="text-[14px]">⭐️⭐️⭐️⭐️⭐️</p>
    </div>
  );
}

export default RecommendationCard;
