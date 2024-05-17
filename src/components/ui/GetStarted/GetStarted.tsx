"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AnsweredReviews from "./components/AnsweredReviews";
import { LinkInputType } from "./components/InputDialog";
import { PlaceDetail, PlaceReview } from "@/types/place_types";
import AddUserPreference from "./components/AddUserPreference";
import AddPlaceUrls from "./components/AddPlaceUrls";
import { parseTadvisorLocationID } from "@/serverApi/tripAdvisor/trip-advisor-apis";
import BounceTransitionButton from "@/components/Reusable/BounceTransitionButton";
import shuffle from "lodash.shuffle";

type UIStep = "user-preference" | "url-input" | "recommendation";

export const GetStarted = () => {
  const [userPref, setUserPref] = useState<string | undefined>(undefined);
  const [placeUrlsProvided, setPlaceUrlProvided] = useState<LinkInputType[]>(
    []
  );
  const [uiStep, setUiStep] = useState<UIStep>("user-preference");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<PlaceReview[]>([]);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<
    PlaceDetail[]
  >([]);

  const shuffleList = () =>
    setSelectedPlaceDetails(shuffle(selectedPlaceDetails));

  // useEffect(() => {
  //   if (!isLoading) return;

  //   while (isLoading) {
  //     shuffleList();
  //   }
  // }, [isLoading]);

  const onAskForReviews = async (question: string) => {
    setUserPref(question);
    setIsLoading(true);
    try {
      const response = await axios.post("/api/answer", {
        userPrefs: userPref,
        placeUrls: placeUrlsProvided.map((place) => place.value),
      });

      response.data.value;

      setAnswer([
        {
          id: "",
          reviewContent: response.data.value,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
    }
  };

  const getPlaceDetail = async (placeUrl: string | undefined) => {
    try {
      if (!placeUrl) return;
      const placeDetail = await axios.post("/api/place/detail", {
        placeUrl,
      });
      const detail = placeDetail.data.value as PlaceDetail;
      setSelectedPlaceDetails((preValue) => [...preValue, detail]);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSetUserPref = (preference: string | undefined) => {
    setUserPref(preference);
    setUiStep("url-input");
  };

  const handleSetPlaceUrlProvided = (url: LinkInputType) => {
    setPlaceUrlProvided((prev) => [...prev, url]);
    getPlaceDetail(url.value);
  };

  const handleRemovePlaceUrl = (link: LinkInputType) => {
    if (!link.value) return;

    const updatedPlaceUrls = placeUrlsProvided.filter(
      (placeLink) => placeLink.id !== link.id
    );
    setPlaceUrlProvided(updatedPlaceUrls);

    const getLocationIdFromUrl = parseTadvisorLocationID(link.value);
    const updatedPlaceDetails = selectedPlaceDetails.filter(
      (place) => place.location_id !== getLocationIdFromUrl
    );
    setSelectedPlaceDetails(updatedPlaceDetails);
  };

  const handleSubmitPlaceUrl = (url: LinkInputType | undefined) => {
    if (url) {
      handleSetPlaceUrlProvided(url);
    }
    if (userPref) onAskForReviews(userPref);
    setUiStep("recommendation");
  };

  const getUIStep = () => {
    switch (uiStep) {
      case "user-preference":
        return (
          <AddUserPreference value={userPref} setUserPref={handleSetUserPref} />
        );
      case "url-input":
        return (
          <AddPlaceUrls
            providedLinks={placeUrlsProvided}
            setPlaceUrl={handleSetPlaceUrlProvided}
            submit={handleSubmitPlaceUrl}
            removePlaceUrl={handleRemovePlaceUrl}
          />
        );
      case "recommendation":
        return (
          <AnsweredReviews
            name="Recommendation"
            isLoading={isLoading}
            reviews={answer}
            selectedPlaceDetails={selectedPlaceDetails}
          />
        );
      default:
        break;
    }
  };

  return (
    <div
      style={{
        overflow: "hidden",
        height: "calc(100svh - 20px)",
      }}
      className="relative w-[100vw] flex flex-col justify-between items-center py-4"
    >
      {uiStep === "recommendation" && (
        <div className="flex justify-start items-start w-[100%] ml-8">
          <BounceTransitionButton
            onClick={() => {
              setUiStep("user-preference");
            }}
            isUserPreferenceSet={Boolean(uiStep)}
          />
        </div>
      )}
      {getUIStep()}
      <div
        className={`absolute bottom-0 w-[100%] h-[30%] bg-gradient-to-t from-cyan-200 to-cyan-50 opacity-30 z-10`}
      >
        <div className="flex flex-row w-full">
          {reviewCards.map((review, i) => {
            return (
              <img
                key={review.id}
                src={review.path}
                className={`${review.rotationDegree} h-[70px] `}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};;

interface ReviewCardData {
  path: string;
  id: string;
  rotationDegree: string;
}
const reviewCards: ReviewCardData[] = [
  {
    path: "/images/ava-review.png",
    id: "rev-1",
    rotationDegree: "rotate-[-20deg]",
  },
  {
    path: "/images/elizabeth-review.png",
    id: "rev-2",
    rotationDegree: "rotate-[45deg]",
  },
  {
    path: "/images/ava-review.png",
    id: "rev-3",
    rotationDegree: "rotate-[-10deg]",
  },
  {
    path: "/images/elizabeth-review.png",
    id: "rev-4",
    rotationDegree: "rotate-[35deg]",
  },
  { path: "/images/ava-review.png", id: "", rotationDegree: "rotate-[-20deg]" },
  {
    path: "/images/elizabeth-review.png",
    id: "rev-5",
    rotationDegree: "rotate-[40deg]",
  },
  {
    path: "/images/ava-review.png",
    id: "rev-6",
    rotationDegree: "rotate-[10deg]",
  },
];