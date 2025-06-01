export function AboutUs() {
  return (
    <section className=" grid grid-cols-1 py-10 sm:py-20 lg:grid-cols-2 gap-10 items-center">
      {/* Left Section */}
      <div className="pt-10">
        <h2 className="text-3xl md:text-5xl  mb-6 font-extrabold text-gray-700">
          About
          <span className="relative text-[#06a7dd] ml-3 inline-block">
            Nexus Couriers
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
        <p className="text-gray-600">
          At Nexus Logistics, we are more than just a courier service—we are the
          bridge that connects businesses and individuals to the world. With
          years of experience in the logistics industry, we specialize in
          delivering seamless, efficient, and reliable shipping solutions across
          200+ countries. <br />
          <br />
          Our mission is simple: to make shipping stress-free, fast, and secure.
          Whether you're sending a small parcel or managing large-scale
          international shipments, Nexus Logistics ensures that your deliveries
          arrive on time, every time. <br />
          <br />
          With real-time tracking, you can monitor your shipments from pickup to
          delivery, giving you full visibility and peace of mind. Our global
          reach allows us to handle logistics across borders with ease, making
          international shipping hassle-free. We prioritize security and
          reliability, ensuring that every package is handled with care. Our
          customer-centric support team is always available to assist you at
          every step, providing guidance and updates whenever you need them.{" "}
          <br />
          <br />
        </p>
      </div>

      {/* Right Section */}
      <div className="">
        <div className="sm:py-10 ">
          <img
            src="/logistics.svg"
            alt="Team Collaboration"
            className="w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
