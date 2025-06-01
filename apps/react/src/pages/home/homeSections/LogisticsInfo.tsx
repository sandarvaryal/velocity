import { motion } from "framer-motion";
import { FaBox, FaMapMarkerAlt } from "react-icons/fa";

export default function LogisticsInfo() {
  return (
    <section className="bg-gray-100 py-14 ">
      <div className=" mx-auto flex flex-col-reverse md:flex-row items-start gap-12">
        {/* Left Side - Text */}
        <motion.div
          className="md:w-1/2"
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
          <h4 className="text-blue-500 uppercase tracking-widest text-sm font-bold">
            How It Works
            <span className="inline-block w-12 h-[2px] bg-blue-500 ml-2"></span>
          </h4>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Digital Freight That Saves Your Time!
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
            Logistics solutions ensure that goods move efficiently from one
            place to another using the latest technology...
          </p>

          {/* Feature Icons */}
          <div className="flex flex-col gap-6 mt-8">
            {[
              {
                icon: <FaBox className="text-white text-2xl" />,
                title: "Reliable Service",
                desc: "Seamless logistics with cutting-edge technology.",
              },
              {
                icon: <FaMapMarkerAlt className="text-white text-2xl" />,
                title: "Real-Time Tracking",
                desc: "Stay updated with instant location insights.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.3,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <div className="w-14 h-14 flex items-center justify-center bg-blue-600 p-4 rounded-full shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          className="md:w-1/2 relative"
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
            src="/airp.jpg"
            alt="Workers in warehouse"
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
            <FaBox className="text-3xl mb-2" />
            <h3 className="text-2xl md:text-4xl font-bold">458m</h3>
            <p className="text-xs md:text-sm">Delivered Goods</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
