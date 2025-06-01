import { useState } from "react";

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
    <div className="mx-auto py-20 flex flex-col lg:flex-row gap-16">
      {/* Vision Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl lg:text-5xl lg:w-[50%] font-extrabold text-gray-700">
          Our
          <span className="relative text-[#06a7dd] ml-3 inline-block">
            {" "}
            Vision
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 100 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5 Q 50 -2, 100 5"
                stroke="#59c3cc"
                strokeWidth="3"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
          </span>
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
          <br />
          <br />
          At the heart of Nexus is a dedication to excellence, customer
          satisfaction, and trust. We see a future where shipping is not just a
          necessity but a seamless experience that empowers businesses,
          strengthens relationships, and drives growth. Through our unwavering
          commitment, we are shaping the next era of logistics—one where every
          package, every mile, and every moment is accounted for with confidence
          and accuracy.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl lg:text-5xl lg:w-[50%] font-extrabold text-gray-700">
          Why
          <span className="relative text-[#06a7dd] ml-3 inline-block">
            {" "}
            Us?
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 100 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5 Q 50 -2, 100 5"
                stroke="#59c3cc"
                strokeWidth="3"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
          </span>
        </h2>

        <div className="space-y-4 mt-6">
          {whyChooseUs.map((item) => (
            <div key={item.id} className="bg-white">
              <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-500"
                onClick={() =>
                  setActiveAccordion(
                    activeAccordion === item.id ? null : item.id
                  )
                }
              >
                {item.title}
                <span className="text-xl">
                  {activeAccordion === item.id ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500   ${
                  activeAccordion === item.id ? "max-h-40 p-4" : "max-h-0 p-0"
                }`}
              >
                {activeAccordion === item.id && (
                  <p className="text-gray-600">{item.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vision;
