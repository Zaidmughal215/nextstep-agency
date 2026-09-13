"use client";

/** Physics hover — scale 1.02, y -6, spring. Wraps cards. */
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SpringCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
