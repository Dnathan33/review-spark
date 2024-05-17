import CustomSkeleton from "@/components/Reusable/CustomSkeleton";
import React, { useState } from "react";
import { Button } from "../../ShadcnComponents/button";
import { Input } from "../../ShadcnComponents/input";
import { Skeleton } from "../../ShadcnComponents/skeleton";
import AddPlaceUrls from "./AddPlaceUrls";
import InputDialog, { LinkInputType } from "./InputDialog";

interface PlaceQueryInputProps {
  setUserQuery: (text: string) => void;
  isLoading: boolean;
}

const PlaceQueryInput = ({ setUserQuery, isLoading }: PlaceQueryInputProps) => {
  const [question, setQuestion] = useState<string | undefined>(undefined);
  return (
    <div className="flex flex-row justify-center items-center w-[90%] md:w-[50%] lg:w-[50%] xl:w-[50%]">
      <Input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setQuestion(event.target.value)
        }
        className="flex-1 my-4"
      />
      {isLoading ? (
        <div className="ml-4">
          <CustomSkeleton
            height="h-[40px]"
            width="w-[100px]"
            bgColor="bg-gradient-to-r from-[#217C82] to-cyan-50"
          />
        </div>
      ) : (
        <Button
          onClick={() => {
            if (question) setUserQuery(question);
          }}
          className="w-[100px] ml-4"
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default PlaceQueryInput;
