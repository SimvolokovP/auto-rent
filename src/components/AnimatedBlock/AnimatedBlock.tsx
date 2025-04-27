import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface AnimatedBlockProps {
  children: ReactNode;
}

const AnimatedBlock: FC<AnimatedBlockProps> = ({ children }) => {
  const variants = {
    open: { opacity: 1, transition: { duration: 0.5 } },
    closed: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBlock;
