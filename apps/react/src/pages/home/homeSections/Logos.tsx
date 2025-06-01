import React from "react";
import { motion } from "framer-motion";

const logos = ["CARGO", "EXPR", "LOGISTA", "DELIV", "FastSh", "DRONE"];

const Logos: React.FC = () => {
  return (
    <section className="py-2 sm:py-4 overflow-hidden">
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
            <div
              key={index}
              className="text-xl font-semibold text-gray-900 uppercase tracking-wider rounded-md"
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Logos;
