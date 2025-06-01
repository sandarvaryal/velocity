import React from "react";
import { motion } from "framer-motion";

const logos = [
  "/services-logos/fed.png",
  "/services-logos/dpex.png",
  "/services-logos/dhll.png",
  "/services-logos/ups.png",
  "/services-logos/aramex.png",
  "/services-logos/dpd.png",
  "/services-logos/sagawa.png",
];

const Logos: React.FC = () => {
  return (
    <section className="py-2   overflow-hidden">
      <div className="relative w-full flex items-center">
        <motion.div
          className="flex space-x-24 min-w-max"
          animate={{
            x: ["0%", "-40%"],
            opacity: [1, 1],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo ${index + 1}`}
              className="h-14 w-32 object-contain "
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Logos;
