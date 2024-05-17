import { PlaceDetail } from "@/types/place_types";
import React, { useState } from "react";
import { Pencil2Icon, RowsIcon } from "@radix-ui/react-icons";
import { motion, Variants } from "framer-motion";

const PlaceDescriptionCard = ({
  placeDetail,
}: {
  placeDetail: PlaceDetail;
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      initial={false}
      variants={divVariants}
      animate={[isHover ? "hover" : "rest"]}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="flex flex-col justify-start m-8 bg-white hover:cursor-pointer"
    >
      <p className="text-[18px] m-2">{placeDetail.name}</p>
      <div className="flex flex-row h-[200px] w-[450px] rounded-md border border-gray p-2">
        <div className="h-[100%] w-[50%] rounded-md">
          {placeDetail.placeUrls.length > 0 && (
            <img
              src={placeDetail.placeUrls[0]}
              className="h-full w-full object-contain rounded-md"
            />
          )}
        </div>
        <div className="flex flex-col justify-start items-start w-[50%] h-[200px] px-2 pt-[12px] text-[14px]">
          <div className="flex flex-row">
            <img src="/images/ribbon.jpeg" height={"30px"} width={"35px"} />{" "}
            <p>{placeDetail.awards[0].display_name}</p>
          </div>
          <div className="flex flex-row mt-[8px]">
            <Pencil2Icon className="h-[25px] w-[25px] ml-[4px] mr-[8px]" />
            {placeDetail.num_reviews} reviews
          </div>
          <div className="flex flex-row mt-[8px]">
            <RowsIcon className="h-[45px] w-[45px] ml-[8px] mr-[12px]" />
            {placeDetail.amenities.slice(0, 5).join(", ")}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const divVariants: Variants = {
  rest: {
    transition: { duration: 0.7 },
  },
  hover: {
    scale: 1.1,
    y: -8,
  },
  press: { scale: 1.1 },
};

export default PlaceDescriptionCard;
