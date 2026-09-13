"use client";

/** Word-stagger headline reveal — Framer Motion, SSR-safe (visible without JS). */
import { motion } from "framer-motion";

export default function AnimatedText({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2";
}) {
  const words = text.split(" ");
  const MTag = Tag === "h1" ? motion.h1 : Tag === "h2" ? motion.h2 : motion.span;
  return (
    <MTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MTag>
  );
}
