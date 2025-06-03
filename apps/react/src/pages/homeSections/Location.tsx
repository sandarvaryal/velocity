import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { LuMail } from "react-icons/lu";
import { LuPhone, LuClock4 } from "react-icons/lu";

function Location() {
  return (
    <div
      className="flex bg-red-100  rounded-[2rem] flex-col lg:flex-row"
      id="ContactUs"
    >
      <div className="flex-1 flex flex-col gap-[2rem] justify-center pr-[3rem] p-[3rem] sm:p-[2rem] lg:p-[5rem]">
        <h2 className="text-[2rem]/[2.5rem] sm:text-[2.5rem]/[3rem] lg:text-[3rem]/[3rem] font-extrabold">
          Contact Us
        </h2>
        <p className="text-[1rem] sm:text-[1.1rem]">
          Contact Us For Your First Shipping With Velocity Cargo And Courier
        </p>
        <div className="flex gap-[1.5rem] sm:gap-[2rem] items-center">
          <CiLocationOn className="bg-amber-700 text-[2.5rem] sm:text-[3rem] p-2 sm:p-3 rounded-full" />
          <div>
            <span className="font-bold text-[0.9rem] sm:text-[1rem]">
              Our Location
            </span>
            <p className="text-[0.85rem] sm:text-[1rem]">
              Dhumbarahi-4 , Ward No. 4, Kathmandu, Nepal
            </p>
          </div>
        </div>
        <div className="flex gap-[1.5rem] sm:gap-[2rem] items-center">
          <LuMail className="bg-amber-700 text-[2.5rem] sm:text-[3rem] p-2 sm:p-3 rounded-full" />
          <div>
            <span className="font-bold text-[0.9rem] sm:text-[1rem]">
              Email Address
            </span>
            <p className="text-[0.85rem] sm:text-[1rem]">
              VelocityCargoAndCourier@gmail.com
            </p>
          </div>
        </div>
        <div className="flex gap-[1.5rem] sm:gap-[2rem] items-center">
          <LuPhone className="bg-amber-700 text-[2.5rem] sm:text-[3rem] p-2 sm:p-3 rounded-full" />
          <div>
            <span className="font-bold text-[0.9rem] sm:text-[1rem]">
              Phone Number
            </span>
            <p className="text-[0.85rem] sm:text-[1rem]">
              +977-9865009886 / +977-9765013741
            </p>
          </div>
        </div>
        <div className="flex gap-[1.5rem] sm:gap-[2rem] items-center">
          <LuClock4 className="bg-amber-700 text-[2.5rem] sm:text-[3rem] p-2 sm:p-3 rounded-full" />
          <div>
            <span className="font-bold text-[0.9rem] sm:text-[1rem]">
              Working Hours
            </span>
            <p className="text-[0.85rem] sm:text-[1rem]">
              Sunday-Friday: 8:00AM - 8:00PM
            </p>
          </div>
        </div>
      </div>

      <motion.div
        className="w-full min-h-[20rem] overflow-hidden flex-1"
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
        <iframe
          title="Google Map"
          className="w-full h-full min-h-[20rem]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.996491587166!2d85.29759659678956!3d27.717394600000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1969458ea627%3A0xe500463026b65ddf!2sNexus%20Export%20Trade!5e0!3m2!1sen!2snp!4v1740558846486!5m2!1sen!2snp"
        ></iframe>
      </motion.div>
    </div>
  );
}

export default Location;
