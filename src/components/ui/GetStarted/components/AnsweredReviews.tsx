import CustomSkeleton from "@/components/Reusable/CustomSkeleton";
import EaseAnimationComponent from "@/components/Reusable/EaseAnimationComponent";
import { PlaceDetail, PlaceReview } from "@/types/place_types";
import React from "react";
import CarouselImage from "./CarouselImage";
import PlaceDescriptionCard from "./PlaceDescriptionCard";
import { Flipper, Flipped } from "react-flip-toolkit";

interface AnsweredReviewsProps {
  name?: string;
  reviews: PlaceReview[];
  isLoading: boolean;
  selectedPlaceDetails: PlaceDetail[];
}

const AnsweredReviews = ({
  name,
  reviews,
  isLoading,
  selectedPlaceDetails,
}: AnsweredReviewsProps) => {
  const getReviewsSkeletons = () => {
    const divs = [];
    for (let i = 0; i < 3; i++) {
      divs.push(
        <div key={i}>
          <CustomSkeleton
            height="h-24"
            width="w-[100%]"
            bgColor="bg-gradient-to-r from-cyan-200 to-cyan-50 opacity-30"
          />
        </div>
      );
    }
    return divs;
  };

  return (
    <div className="flex flex-col justify-start items-center w-[90%] h-[100%] z-20">
      {isLoading ? (
        <div className="flex items-start h-[45%] w-[80%] space-x-4 ">
          <CustomSkeleton
            height="h-[100%]"
            width="w-[50%]"
            bgColor="bg-gradient-to-r from-cyan-200 to-cyan-50 opacity-30"
          />

          <div className="space-y-2 w-[50%]">{getReviewsSkeletons()}</div>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-start h-[45%] w-[80%] rounded-md">
          <EaseAnimationComponent
            height="h-[100%]"
            width="w-[45%]"
            component={
              <CarouselImage
                images={selectedPlaceDetails.map((place) => place.placeUrls[0])}
              />
            }
            ease={[0, 0.71, 0.2, 1.01]}
            duration={0.5}
            delay={0.3}
          />
          <div className="flex flex-col w-[50%] p-4 overflow-scroll">
            <p className="text-[18px] mb-2">{name}</p>

            {reviews.map((review) => {
              return (
                <EaseAnimationComponent
                  key={review.id}
                  height="h-[100%]"
                  width="w-[100%]"
                  component={
                    <div className="w-[100%] p-6 rounded-md border border-gray text-[14px] my-2">
                      {review.reviewContent}
                    </div>
                  }
                  duration={0.8}
                  delay={0.6}
                  ease={[0, 0.21, 0.7, 1.01]}
                />
              );
            })}
          </div>
        </div>
      )}

      <Flipper flipKey={"flip-place-detail"} className="w-[95%]">
        <div className="flex flex-row justify-start items-start overflow-x-scroll w-[100%] mt-12">
          {selectedPlaceDetails.map((detail) => {
            return (
              <EaseAnimationComponent
                height="h-[100%]"
                width=""
                component={<PlaceDescriptionCard placeDetail={detail} />}
                ease={[0, 0.71, 0.2, 1.01]}
                duration={0.5}
                delay={0.3}
              />
            );
          })}
        </div>
      </Flipper>
    </div>
  );
};

export default AnsweredReviews;
