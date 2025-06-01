"use client";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

export default function Details() {
  return (
    <section className="py-14">
      <div className="mx-auto flex flex-col-reverse lg:flex-row items-start gap-12">
        {/* Left Image with Scale Animation */}
        <motion.div
          className="lg:w-1/2 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
            },
          }}
        >
          <img
            src="/deliveryperson.jpeg"
            alt="Delivery Service"
            className="w-full shadow-2xl"
          />

          {/* Floating Info Box */}
          <motion.div
            className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-blue-600 text-white p-4 md:p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <FaCheck className="text-3xl mb-2" />
            <h3 className="text-2xl md:text-4xl font-bold">10k+</h3>
            <p className="text-xs md:text-sm">Happy Customers</p>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="lg:w-1/2 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
            },
          }}
        >
          {/* Section Title with Animated Line */}
          <h4 className="text-blue-500 uppercase tracking-widest text-sm font-bold">
            Details
            <motion.span
              className="inline-block w-12 h-[2px] bg-blue-500 ml-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
            ></motion.span>
          </h4>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Maximizing efficiency in delivery services!
          </h2>

          {/* Description */}
          <p className="text-gray-600 my-4 leading-relaxed text-sm md:text-base">
            At Nexus Courier, we redefine speed, reliability, and precision in
            logistics. Our streamlined delivery solutions ensure on-time
            shipments, secure package handling, and seamless tracking from start
            to finish. With a 100% quality control system and a team of highly
            skilled professionals, we guarantee an unmatched courier experience.
          </p>

          {/* Animated Statistics with More Padding */}
          <div className="flex gap-12 my-6">
            {[
              {
                percentage: 100,
                label: "Quality Control System",
                description: "Guaranteed On-time Delivery",
              },
              {
                percentage: 100,
                label: "Highly Professional Staff",
                description: "Guaranteed Good Package Care",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.8, delay: index * 0.3 },
                  },
                }}
              >
                {/* Circular Progress */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#ddd"
                      strokeWidth="5"
                    />
                    {/* Animated Progress Circle */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="5"
                      strokeDasharray="238.8"
                      strokeDashoffset="238.8"
                      initial={{ strokeDashoffset: 238.8 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>
                  {/* Percentage Text */}
                  <span className="absolute text-xl font-bold text-gray-900 tracking-wide">
                    {stat.percentage}%
                  </span>
                </div>
                {/* Label */}
                <p className="mt-2 text-xs  sm:text-lg font-semibold text-gray-900">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Checklist with Slide-In Animation */}
          <motion.ul
            className="mb-6 space-y-2"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
            viewport={{ once: false }}
          >
            {[
              "Ensures strict adherence to industry standards.",
              "Experienced and well-trained professionals",
              "Specialized expertise in logistics and handling",
              "Friendly and responsive customer support.",
              "Strong commitment to customer satisfaction.",
            ].map((text, index) => (
              <motion.li
                key={index}
                className="flex items-center text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                <FaCheck className="text-blue-600 mr-2" /> {text}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
