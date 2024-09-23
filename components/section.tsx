"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const MotionDiv = motion.div;

const Section = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => (
  <MotionDiv
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay }}
    className="mb-6" // Tailwind class for margin-bottom
  >
    {children}
  </MotionDiv>
);

export default Section;
