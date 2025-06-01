const Location = () => {
  return (
    <section className=" py-12 grid md:grid-cols-2 gap-12 items-center">
      {/* Left Column - Location Details */}
      <div className="space-y-6">
        <h2 className="text-3xl lg:text-5xl lg:w-[50%] font-extrabold text-gray-700">
          Our
          <span className="relative text-[#06a7dd] ml-3 inline-block">
            {" "}
            Location
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
        <p className="text-gray-600 text-lg">
          We’re located in the heart of Kathmandu, easily accessible and ready
          to welcome you. Our space is designed to offer comfort and
          convenience, ensuring an excellent experience for every visitor.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Address</h3>
            <p className="text-gray-600">Naya Bazar 16, Kathmandu, Nepal</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Operating Hours
            </h3>
            <p className="text-gray-600">Sunday: 9 AM - 8 PM</p>
            <p className="text-gray-600">Monday: 9 AM - 8 PM</p>
            <p className="text-gray-600">Tuesday: 9 AM - 8 PM</p>
            <p className="text-gray-600">Wednesday: 9 AM - 8 PM</p>
            <p className="text-gray-600">Thursday: 9 AM - 8 PM</p>
            <p className="text-gray-600">Friday: 9 AM - 8 PM</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
            <p className="text-gray-600">OFFICE NO: 01-4977771</p>
            <p className="text-gray-600">OFFICE NO: 01-4977771</p>
            <p className="text-gray-600">
              PHONE NO: +977-9846760771 / 9869049690
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Embedded Google Map */}
      <div className="w-full min-h-96 h-full overflow-hidden ">
        <iframe
          title="Google Map"
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.996491587166!2d85.29759659678956!3d27.717394600000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1969458ea627%3A0xe500463026b65ddf!2sNexus%20Export%20Trade!5e0!3m2!1sen!2snp!4v1740558846486!5m2!1sen!2snp"
        ></iframe>
      </div>
    </section>
  );
};

export default Location;
