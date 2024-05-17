import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface EaseAnimationComponentProps {
  component: ReactNode
  height: string
  width: string
  ease: [number, number, number, number]
  duration: number
  delay: number
}

const EaseAnimationComponent = ({component, height, width, ease, duration, delay}: EaseAnimationComponentProps) => {
  return (
    <motion.div
      className={`${height} ${width}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: ease,
      }}
    >
      {component}
    </motion.div>
  );
};

export default EaseAnimationComponent;
