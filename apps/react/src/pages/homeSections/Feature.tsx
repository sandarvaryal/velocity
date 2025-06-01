import { motion } from "framer-motion";
import { TbWorldSearch } from "react-icons/tb";
import { SiTrustpilot } from "react-icons/si";
import { IoTimer } from "react-icons/io5";

export default function Feature() {
  const features = [
    {
      icon: <TbWorldSearch className="text-white text-2xl" />,
      title: "Real-Time Tracking",
      desc: "Track your shipments in real-time with Nexus, ensuring you stay updated on every movement of your package, from dispatch to delivery.",
    },
    {
      icon: <SiTrustpilot className="text-white text-2xl" />,
      title: "Reliable Shipping",
      desc: "We prioritize secure and timely delivery with a trusted logistics network, ensuring your package arrives safely and on time.",
    },
    {
      icon: <IoTimer className="text-white text-2xl" />,
      title: "Fast & Efficient Delivery",
      desc: "Experience optimized routing and real-time tracking that reduce delays, making sure your shipments reach their destination swiftly.",
    },
  ];

  return (
    <section className="py-20">
      <div className="flex flex-col md:flex-row gap-10 md:items-start mb-18">
        <div className="md:w-1/2">
          <h4 className="text-blue-500 uppercase tracking-widest text-sm font-bold">
            Our Features
            <span className="inline-block w-12 h-[2px] bg-blue-500 ml-2"></span>
          </h4>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Smart Logistics for Effortless Shipping
          </h2>
        </div>
        <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base md:w-1/2">
          From real-time tracking to reliable and fast deliveries, our logistics
          solutions are designed to keep your shipments moving efficiently and
          securely.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-6 shadow flex items-start gap-4 rounded-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-600"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              ></motion.div>
              <div className="w-14 h-14 flex items-center justify-center bg-blue-600 p-4 rounded-full shadow-lg">
                {feature.icon}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
