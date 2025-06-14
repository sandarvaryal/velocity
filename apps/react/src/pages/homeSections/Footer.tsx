import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-14 text-gray-100 bg-black p-[4rem] mt-[5rem]">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-[5rem]">
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-lg mb-1">
            Velocity Courier Pvt. Ltd.
          </h2>
          <p className="mb-1 text-[#abb2b9] text-[0.9rem]">
            Streamline your global shipping with our reliable cargo solutions
            tailored to meet your needs. From fast delivery to secure handling,
            we ensure every shipment arrives safely and on time—because your
            business deserves nothing less.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="flex items-center gap-2 ">Quick Links</p>
          <div className="flex flex-col text-[#abb2b9] gap-2">
            <a href="#Services">Services</a>
            <a href="#Steps">Steps</a>
            <a href="#Testimonials">Testimonials</a>
            <a href="#ContactUs">Contact Us</a>
          </div>

          {/* <p className="mt-2"> VelocityCargoAndCourier@gmail.com</p> */}
        </div>
        <div className="flex flex-col ">
          <div className="flex gap-10">
            <a
              href="https://www.facebook.com/velocitycargocourier"
              target="_blank"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com/velocitycargonepal/"
              target="_blank"
            >
              <FaInstagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@velocity.cargo.co" target="_blank">
              <FaTiktok size={20} />
            </a>
            <a href="https://wa.me/message/T3WNI4I4O2XZO1" target="_blank">
              <FaWhatsapp size={25} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600  mt-6 pt-4  mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* <div className="flex gap-6 text-[10px] sm:text-[12px]">
          <a href="#features" className="">
            Our Features
          </a>
          <a href="#about" className="">
            About Us
          </a>
          <a href="#vision" className="">
            Our Vison
          </a>
          <a href="#location" className="">
            Our Location
          </a>
        </div> */}

        <div className="flex items-center gap-2 mt-4 md:mt-0 ">
          <p className="text-[0.8rem]">
            &copy; Copyright Velocity Cargo And Couriers. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
