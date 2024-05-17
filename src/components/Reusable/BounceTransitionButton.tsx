import React from "react";
import { useState } from "react";
import { motion, Variants, Transition } from "framer-motion";

interface BounceTransitionButtonProps {
  onClick: () => void;
  isUserPreferenceSet: boolean;
}

const BounceTransitionButton = ({
  isUserPreferenceSet,
  onClick,
}: BounceTransitionButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.button
      initial={false}
      className="p-2 rounded-md"
      animate={[
        isUserPreferenceSet ? "preferenceSet" : "preferenceNotSet",
        isHover ? "hover" : "rest",
      ]}
      whileTap="press"
      variants={buttonVariants}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onClick={onClick}
    >
      <motion.div
        className="icon"
        variants={{
          preferenceSet: { opacity: 0, transition: iconFadeTransition },
          hover: isUserPreferenceSet
            ? { opacity: 0, transition: iconFadeTransition }
            : { opacity: 1 },
        }}
      ></motion.div>
      <div className="label">
        <motion.span
          variants={labelTextVariants}
          className="default text-[14px]"
        >
          {isUserPreferenceSet && (
            <motion.span variants={successTextVariants} className="success">
              Update{" "}
            </motion.span>
          )}
          Preference
        </motion.span>
      </div>
    </motion.button>
  );
};

const iconFadeTransition: Transition = { duration: 0.2, delay: 0.3 };

const buttonVariants: Variants = {
  rest: {
    filter: "grayscale(100%) contrast(70%)",
    transition: { duration: 0.7 },
    backgroundColor: "#000",
  },
  hover: {
    filter: "grayscale(0%) contrast(100%)",
    backgroundColor: "#000",
    scale: 1.2,
    y: -8,
  },
  press: { scale: 1.1 },
};

const labelTextVariants: Variants = {
  preferenceNotSet: { x: 24, color: "#fff" },
  preferenceSet: { x: -46, color: "#fff" },
};

const successTextVariants: Variants = {
  preferenceNotSet: { opacity: 0, color: "#fff" },
  preferenceSet: { opacity: 1, color: "#fff" },
};

export default BounceTransitionButton;
