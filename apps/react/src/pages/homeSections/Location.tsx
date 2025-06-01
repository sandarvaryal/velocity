import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhone, LuClock4 } from "react-icons/lu";

function Location() {
  return (
    <div className="flex bg-red-100  mt-[2rem] mr-[5rem] ml-[5rem] rounded-[2rem] ">
      <div className="flex-1 flex flex-col gap-[2rem] justify-center pr-[3rem] p-[5rem]">
        <h2 className="text-[3rem]/[3rem] font-extrabold">Contact Us</h2>
        <p>
          Contact Us For Your First Shipping With Velocity Cargo And Courier
        </p>
        <div className="flex gap-[2rem]">
          <CiLocationOn className="bg-amber-700 text-[3rem] p-3 rounded-full" />
          <div>
            <span className="font-bold">Our Location</span>
            <p>Dhumbarahi-4 , Ward No. 4, Kathmandu, Nepal</p>
          </div>
        </div>
        <div className="flex gap-[2rem]">
          <HiOutlineMail className="bg-amber-700 text-[3rem] p-3 rounded-full" />
          <div>
            <span className="font-bold">Email Address</span>
            <p>VelocityCargoAndCourier.gmail.com</p>
          </div>
        </div>
        <div className="flex gap-[2rem]">
          <LuPhone className="bg-amber-700 text-[3rem] p-3 rounded-full" />
          <div>
            <span className="font-bold">Phone Number</span>
            <p>+977-9865009886 / +977-9765013741</p>
          </div>
        </div>
        <div className="flex gap-[2rem]">
          <LuClock4 className="bg-amber-700 text-[3rem] p-3 rounded-full" />
          <div>
            <span className="font-bold">Working Hours</span>
            <p>Sunday-Friday: 8:00AM - 8:00PM</p>
          </div>
        </div>
      </div>

      <motion.div
        className="w-full lg:w-1/2 min-h-[20rem] overflow-hidden flex-1"
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
    // <section className="py-20 flex flex-col lg:flex-row gap-16">
    //   {/* Location Section */}
    //   <motion.div
    //     className="w-full lg:w-1/2"
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: false, amount: 0.2 }}
    //     variants={{
    //       hidden: { opacity: 0, y: 60 },
    //       visible: {
    //         opacity: 1,
    //         y: 0,
    //         transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
    //       },
    //     }}
    //   >
    //     <h4 className="text-blue-500 uppercase tracking-widest text-sm font-bold">
    //       Our Location
    //       <span className="inline-block w-12 h-[2px] bg-blue-500 ml-2"></span>
    //     </h4>
    //     <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
    //       Find us with ease!
    //     </h2>
    //     <p className="mt-4 text-gray-600 leading-relaxed">
    //       We’re located in the heart of Kathmandu, easily accessible and ready
    //       to welcome you. Our space is designed to offer comfort and
    //       convenience, ensuring an excellent experience for every visitor.
    //     </p>

    //     <div className="mt-6 space-y-4">
    //       <div>
    //         <h3 className="text-lg font-semibold text-gray-700">Address</h3>
    //         <p className="text-gray-600">Naya Bazar 16, Kathmandu, Nepal</p>
    //       </div>

    //       <div>
    //         <h3 className="text-lg font-semibold text-gray-700">
    //           Operating Hours
    //         </h3>
    //         <p className="text-gray-600">Sunday - Friday: 9 AM - 8 PM</p>
    //       </div>

    //       <div>
    //         <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
    //         <p className="text-gray-600">OFFICE NO: 01-4977771</p>
    //         <p className="text-gray-600">
    //           PHONE NO: +977-9846760771 / 9869049690
    //         </p>
    //       </div>
    //     </div>
    //   </motion.div>

    //   {/* Google Map Section */}
    //   <motion.div
    //     className="w-full lg:w-1/2 min-h-[20rem] overflow-hidden"
    //     initial="hidden"
    //     whileInView="visible"
    //     viewport={{ once: false, amount: 0.2 }}
    //     variants={{
    //       hidden: { opacity: 0, y: 60 },
    //       visible: {
    //         opacity: 1,
    //         y: 0,
    //         transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
    //       },
    //     }}
    //   >
    //     <iframe
    //       title="Google Map"
    //       className="w-full h-full min-h-[20rem]"
    //       loading="lazy"
    //       allowFullScreen
    //       referrerPolicy="no-referrer-when-downgrade"
    //       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.996491587166!2d85.29759659678956!3d27.717394600000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1969458ea627%3A0xe500463026b65ddf!2sNexus%20Export%20Trade!5e0!3m2!1sen!2snp!4v1740558846486!5m2!1sen!2snp"
    //     ></iframe>
    //   </motion.div>
    // </section>
  );
}

export default Location;
