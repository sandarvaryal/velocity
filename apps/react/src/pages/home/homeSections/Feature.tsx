import { TbWorldSearch } from "react-icons/tb";
import { SiTrustpilot } from "react-icons/si";
import { IoTimer } from "react-icons/io5";

export default function Feature() {
  return (
    <section className="pt-20  ">
      {/* Heading */}
      <div className=" flex flex-col md:flex-row gap-5 md:gap-10 md:items-center mb-18">
        <h2 className="text-3xl md:text-5xl md:w-[50%] font-extrabold text-gray-700">
          Global Logistics and <br />
          easy
          <span className="relative text-[#06a7dd] ml-3 inline-block">
            Solutions
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
        <p className="text-gray-600 mt-4 sm:text-lg md:w-[50%]">
          Nexus specializes in providing efficient and reliable courier services
          that connect Nepal to every corner of the globe, ensuring your
          packages reach their destination promptly and securely.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid  lg:grid-cols-3 gap-8  mx-auto">
        {/* Feature Card 1 */}
        <div className="bg-neutral-50 p-6  shadow relative">
          <div className="flex items-center gap-2">
            <TbWorldSearch className="text-3xl" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Real-Time
              <span className="text-[#06a7dd]"> Tracking</span>
            </h3>
          </div>
          <p className="text-gray-600 mt-4 text-base">
            With Nexus, you can track your shipments in real-time, giving you
            peace of mind and confidence that your deliveries are in safe hands.
            Our advanced tracking system provides up-to-the-minute updates,
            allowing you to monitor every step of the journey—from start to
            final delivery.
          </p>
          {/*  */}
        </div>

        {/* Feature Card 2 */}
        <div className="bg-neutral-50 p-6  shadow relative">
          <div className="flex items-center gap-2">
            <SiTrustpilot className="text-3xl" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Reliable
              <span className="text-[#06a7dd]"> Shipping</span>
            </h3>
          </div>
          <p className="text-gray-600 mt-4 text-base">
            Your shipments are always in safe hands when its with us. Our
            trusted logistics network ensures that every package is handled with
            care, minimizing risks and delays. Whether it's a local or
            international delivery, we prioritize security and reliability at
            every step of the journey.
          </p>
          {/*  */}
        </div>

        {/* Feature Card 3 */}
        <div className="bg-neutral-50 p-6  shadow relative">
          <div className="flex items-center gap-2">
            <IoTimer className="text-3xl" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Fast & Efficient
              <span className="text-[#06a7dd]"> Delivery</span>
            </h3>
          </div>
          <p className="text-gray-600 mt-4 text-base">
            Time is valuable, and Nexus ensures your shipments arrive as quickly
            as possible. With optimized routing and real-time tracking, we
            reduce delays and improve efficiency, allowing you to receive your
            packages faster than ever.
          </p>
          {/*  */}
        </div>
      </div>
    </section>
  );
}
