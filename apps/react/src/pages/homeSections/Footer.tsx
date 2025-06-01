import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-14 text-gray-100 bg-black p-[4rem] mt-[5rem]">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="font-semibold text-lg mb-1">
            Velocity Cargo And Courier Pvt. Ltd.
          </h2>
          <p className="mb-1">Dhumbarahi Chowk, Kathmandu, Nepal</p>
        </div>
        <div>
          <p className="flex items-center gap-2">📞 +977-9865009886 / </p>
          <p className="flex items-center gap-2">📞 +977-9765013741</p>

          <p className="mt-2"> VelocityCargoAndCourier@gmail.com</p>
        </div>
        <div className="flex flex-col md:items-end">
          <div className="flex gap-4">
            <a href="https://www.facebook.com/nexusexporttradepvtltd">
              <FaFacebookF size={20} />
            </a>

            <a href="https://www.instagram.com/nexus_export_trade_pvt_ltd/">
              <FaInstagram size={20} />
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

        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <img src="/velocity-logo.svg" alt="Velocity" className="h-8" />
          <p className="text-xs">
            &copy; Copyright Velocity Cargo And Couriers. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
