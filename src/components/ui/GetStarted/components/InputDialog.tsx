import BounceTransitionButton from "@/components/Reusable/BounceTransitionButton";
import React, { ReactNode } from "react";
import { Button } from "../../ShadcnComponents/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ShadcnComponents/dialog";

export interface LinkInputType {
  id: string;
  value?: string;
}

export interface InputDialogProps {
  header: string;
  description: string;
  content: ReactNode;
  isOpen: boolean;
  isUserPreferenceSet: boolean;
  toggleModal: (open: boolean) => void;
  enterPreference: () => void;
}

const InputDialog = ({
  header,
  description,
  content,
  isOpen,
  isUserPreferenceSet,
  toggleModal,
  enterPreference,
}: InputDialogProps) => {
  const handleOnEnterPreferenceClick = () => {
    toggleModal(true);
    enterPreference();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <div className="flex justify-end items-center w-[100%] p-4 mr-2 shadow-lg z-20">
        <DialogTrigger asChild>
          <BounceTransitionButton
            onClick={handleOnEnterPreferenceClick}
            isUserPreferenceSet={isUserPreferenceSet}
          />
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[80%] lg:w-[50%] max-h-[80%] min-h-[40%]">
        <DialogHeader className="flex flex-col justify-start items-center mx-auto">
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default InputDialog;
