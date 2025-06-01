import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const whyChooseUs = [
  {
    id: 1,
    title: "Fast & Reliable Deliveries",
    content:
      "Time is crucial, and we ensure your packages reach their destination swiftly and securely. With real-time tracking and a dedicated logistics network, we guarantee timely deliveries you can trust.",
  },
  {
    id: 2,
    title: "Customer-Centric Service",
    content:
      "Your satisfaction is our priority. From seamless booking to proactive customer support, we provide a hassle-free shipping experience. We listen, adapt, and go the extra mile to meet your needs.",
  },
  {
    id: 3,
    title: "Safe & Secure Handling",
    content:
      "Your parcels are in safe hands. We use advanced security protocols, professional packaging, and careful handling to ensure that every shipment arrives in perfect condition, no matter the distance.",
  },
  {
    id: 4,
    title: "Nationwide & Global Reach",
    content:
      "No destination is out of reach. Whether it's local, interstate, or international shipping, our extensive network ensures smooth and efficient deliveries, connecting you to customers and businesses worldwide.",
  },
];

function Vision() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(1);

  return (
    <section className="py-20 flex flex-col lg:flex-row gap-16">
      {/* Vision Section */}
      <motion.div
        className="w-full lg:w-1/2"
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
          Our Vision
          <span className="inline-block w-12 h-[2px] bg-blue-500 ml-2"></span>
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Evolving the courier services!
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          At Nexus, we aspire to redefine the future of logistics by creating a
          world where shipping is seamless, efficient, and completely
          transparent. We believe that every delivery should be stress-free,
          with customers having full visibility and confidence in the process
          from start to finish. <br />
          <br />
          Our vision is to leverage cutting-edge technology to provide real-time
          tracking, ensuring that every shipment—big or small—is handled with
          precision and care. We are committed to building a logistics network
          that is not only fast and reliable but also secure and environmentally
          responsible. By continuously innovating, we aim to bridge the gap
          between businesses and their customers, making global connectivity
          easier than ever before.
        </p>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        className="w-full lg:w-1/2"
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
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Why choose us?
        </h2>
        <div className="space-y-4 mt-6">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white shadow rounded"
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
              <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-500"
                onClick={() =>
                  setActiveAccordion(
                    activeAccordion === item.id ? null : item.id
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-500" /> {item.title}
                </div>
                <span className="text-xl">
                  {activeAccordion === item.id ? "−" : "+"}
                </span>
              </button>
              <motion.div
                className={`overflow-hidden transition-all duration-500 ${
                  activeAccordion === item.id ? "max-h-40 p-4" : "max-h-0 p-0"
                }`}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeAccordion === item.id ? "auto" : 0,
                  opacity: activeAccordion === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {activeAccordion === item.id && (
                  <p className="text-gray-600">{item.content}</p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Vision;
