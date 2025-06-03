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
    // <div className="flex bg-white h-[27rem] mt-[2rem] mr-[5rem] ml-[5rem] rounded-[2rem]"></div>
    <></>
  );
}

export default Vision;
