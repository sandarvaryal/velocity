import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlaneDeparture } from "react-icons/fa6";
import { MdAssignmentAdd, MdDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Nav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const { isError, isLoading } = useQuery({
    queryKey: ["verify"],
    queryFn: async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
        withCredentials: true,
      });
      return true;
    },
    retry: false,
  });

  const [searchInput, setSearchInput] = useState("");

  const handleNavSearch = async () => {
    if (!searchInput) {
      toast.error("Please enter a tracking number");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/awbExists`,
        { awbNumber: searchInput },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate(`/user/editShipment/${searchInput}`);
        return;
      }
    } catch (e) {
      toast.error("No Shipment Found");
    }
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (isLoading) return <></>;

  //bg-[#5D6894]
  return (
    // <nav className=" bg-[#111111] flex gap-2 flex-col sm:flex-row justify-between sm:items-center max-w-[100rem] sm:h-20 sm:px-6 sm:py-2 ">
    //   {/* Left Side - Logo */}
    //   <div className="flex justify-between items-center w-full sm:w-auto">
    //     <span
    //       className="cursor-pointer justify-center flex items-center gap-2"
    //       onClick={() => navigate("/")}
    //     >
    //       <img
    //         src="/velocity-logo-white.png"
    //         alt="Velocity Logo"
    //         className="h-60"
    //       />
    //     </span>

    //     <button
    //       className="sm:hidden text-2xl transition-transform duration-300"
    //       onClick={() => setIsOpen(!isOpen)}
    //     >
    //       {isOpen ? <IoClose /> : <GiHamburgerMenu />}
    //     </button>
    //   </div>

    //   {/* Middle - Navigation Links */}
    //   <div
    //     className={`flex flex-col min-h-full sm:flex-row sm:gap-14 justify-between w-full sm:w-auto
    //       transition-[max-height] duration-300 ease-in-out overflow-hidden ${
    //         isOpen
    //           ? "max-h-40 min-h-fit opacity-100"
    //           : "max-h-0 opacity-0 sm:opacity-100"
    //       } sm:max-h-full sm:flex`}
    //   >
    //     {!isError ? (
    //       <>
    //         <div className="flex items-center gap-2">
    //           <input
    //             className="border-b border-gray-500 focus:border-blue-500 focus:outline-none transition-all duration-300 w-full text-center"
    //             placeholder="AwbNumber"
    //             value={searchInput}
    //             onChange={(e) => setSearchInput(e.target.value)}
    //           />
    //           <button className="cursor-pointer" onClick={handleNavSearch}>
    //             <FaSearch className="hover:text-gray-400 transition-all" />
    //           </button>
    //         </div>
    //         <button
    //           className={`flex border-y border-gray-300 sm:border-none text-sm font-semibold px-2 sm:text-base items-center gap-2 py-1 cursor-pointer ${
    //             isActive("/dashboard")
    //               ? "text-[#0d78bc]"
    //               : "hover:bg-gray-100 transition-all"
    //           }`}
    //           onClick={() => navigate("/dashboard")}
    //         >
    //           <MdDashboard />
    //           Dashboard
    //         </button>
    //         <button
    //           className={`flex border-b border-gray-300 font-semibold sm:border-none px-2 text-sm sm:text-base items-center gap-2 py-1 cursor-pointer ${
    //             isActive("/shipments")
    //               ? "text-[#0d78bc]"
    //               : "hover:bg-gray-100 transition-all"
    //           }`}
    //           onClick={() => navigate("/shipments")}
    //         >
    //           <FaPlaneDeparture />
    //           Shipments
    //         </button>
    //         <button
    //           className={`flex border-gray-300 sm:border-none font-semibold text-sm px-2 sm:text-base items-center gap-2 py-1 cursor-pointer ${
    //             isActive("/bookShipments")
    //               ? "text-[#0d78bc]"
    //               : "hover:bg-gray-100 transition-all"
    //           }`}
    //           onClick={() => navigate("/bookShipments")}
    //         >
    //           <MdAssignmentAdd />
    //           Book Shipment
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         {location.pathname === "/" && (
    //           <div className="flex sm:items-center justify-between sm:gap-10  font-semibold flex-col sm:flex-row">
    //             <a
    //               href="#features"
    //               className="border-t text-[#abb2b9] hover:text-white sm:border-none text-sm font-semibold  sm:text-base items-center gap-2 py-1 cursor-pointer"
    //             >
    //               Our Features
    //             </a>
    //             <a
    //               href="#about"
    //               className="border-t text-[#abb2b9] hover:text-white sm:border-none text-sm font-semibold  sm:text-base items-center gap-2 py-1 cursor-pointer"
    //             >
    //               About Us
    //             </a>
    //             <a
    //               href="#vision"
    //               className="border-t text-[#abb2b9] hover:text-white sm:border-none text-sm font-semibold  sm:text-base items-center gap-2 py-1 cursor-pointer"
    //             >
    //               Our Vision
    //             </a>
    //             <a
    //               href="#location"
    //               className="border-t text-[#abb2b9] hover:text-white sm:border-none text-sm font-semibold  sm:text-base items-center gap-2 py-1 cursor-pointer"
    //             >
    //               Our Location
    //             </a>
    //           </div>
    //         )}

    //         <button
    //           className=" bg-[#F97316] hover:bg-[#EA6309] p-6 rounded-[0.5rem] self-center block  text-white border-y border-gray-300 sm:border-none  font-bold  sm:text-base items-center gap-2 py-2 cursor-pointer"
    //           onClick={() => navigate("/login")}
    //         >
    //           LOGIN
    //         </button>
    //       </>
    //     )}
    //   </div>
    // </nav>
    <nav className="bg-[#111111] w-full px-4 py-3 sm:py-2 sm:px-6 flex justify-between items-center max-w-[100rem] relative z-50">
      {/* Left Section - Logo */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <span
          className="cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <img src="/vello.png" alt="Velocity Logo" className="h-10 sm:h-12" />
        </span>

        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden text-white text-3xl z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex sm:gap-10 items-center">
        {!isError ? (
          <>
            <div className="flex items-center gap-2">
              <input
                className="border-b border-gray-500 focus:border-blue-500 focus:outline-none transition-all duration-300 text-white bg-transparent placeholder-gray-400 text-sm text-center"
                placeholder="AwbNumber"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="cursor-pointer" onClick={handleNavSearch}>
                <FaSearch className="text-white hover:text-gray-400 transition-all" />
              </button>
            </div>
            <button
              className={`flex text-white font-semibold items-center gap-2 text-sm cursor-pointer ${
                isActive("/user/dashboard")
                  ? "text-[#0d78bc]"
                  : "hover:text-gray-400"
              }`}
              onClick={() => navigate("/user/dashboard")}
            >
              <MdDashboard />
              Dashboard
            </button>
            <button
              className={`flex text-white font-semibold items-center gap-2 text-sm cursor-pointer ${
                isActive("/user/shipment")
                  ? "text-[#0d78bc]"
                  : "hover:text-gray-400"
              }`}
              onClick={() => navigate("/user/shipment")}
            >
              <FaPlaneDeparture />
              Shipments
            </button>
            <button
              className={`flex text-white font-semibold items-center gap-2 text-sm cursor-pointer ${
                isActive("/user/bookShipments")
                  ? "text-[#0d78bc]"
                  : "hover:text-gray-400"
              }`}
              onClick={() => navigate("/user/bookShipment")}
            >
              <MdAssignmentAdd />
              Book Shipment
            </button>
          </>
        ) : (
          <>
            {location.pathname === "/" && (
              <div className="flex items-center gap-6">
                <a
                  href="#services"
                  className="text-[#abb2b9] hover:text-white text-sm"
                >
                  Service
                </a>
                <a
                  href="#Steps"
                  className="text-[#abb2b9] hover:text-white text-sm"
                >
                  Steps
                </a>
                <a
                  href="#Testimonials"
                  className="text-[#abb2b9] hover:text-white text-sm"
                >
                  Testimonials
                </a>
                <a
                  href="#ContactUs"
                  className="text-[#abb2b9] hover:text-white text-sm"
                >
                  Contact Us
                </a>
              </div>
            )}
            <button
              className="bg-[#F97316] hover:bg-[#EA6309] px-4 py-2 rounded text-white font-bold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </>
        )}
      </div>

      {/* Mobile Slide-In Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#111111] shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden flex flex-col gap-4 px-4 pt-24 pb-10`}
      >
        {!isError ? (
          <>
            <div className="flex items-center gap-2">
              <input
                className="border-b border-gray-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-400 text-sm text-center w-full"
                placeholder="AwbNumber"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="cursor-pointer" onClick={handleNavSearch}>
                <FaSearch className="text-white hover:text-gray-400 transition-all" />
              </button>
            </div>
            <button
              className={`flex text-white font-semibold items-center gap-2 text-sm cursor-pointer ${
                isActive("/user/dashboard") ? "text-[#0d78bc]" : ""
              }`}
              onClick={() => {
                navigate("/user/dashboard");
                setIsOpen(false);
              }}
            >
              <MdDashboard />
              Dashboard
            </button>
            <button
              className={`flex text-white font-semibold items-center gap-2 text-sm cursor-pointer ${
                isActive("/shipments") ? "text-[#0d78bc]" : ""
              }`}
              onClick={() => {
                navigate("/shipments");
                setIsOpen(false);
              }}
            >
              <FaPlaneDeparture />
              Shipments
            </button>
            <button
              className={`flex text-white font-semibold items-center gap-2 text-sm cursor-pointer ${
                isActive("/bookShipments") ? "text-[#0d78bc]" : ""
              }`}
              onClick={() => {
                navigate("/bookShipments");
                setIsOpen(false);
              }}
            >
              <MdAssignmentAdd />
              Book Shipment
            </button>
          </>
        ) : (
          <>
            {location.pathname === "/" && (
              <>
                <a
                  href="#features"
                  className="text-[#abb2b9] hover:text-white text-sm"
                >
                  Our Features
                </a>
                <a
                  href="#about"
                  className="text-[#abb2b9] hover:text-white text-sm"
                >
                  About Us
                </a>
                <a
                  href="#vision"
                  className="text-[#abb2b9] hover:text-white text-sm"
                >
                  Our Vision
                </a>
                <a
                  href="#location"
                  className="text-[#abb2b9] hover:text-white text-sm"
                >
                  Our Location
                </a>
              </>
            )}
            <button
              className="bg-[#F97316] hover:bg-[#EA6309] px-4 py-2 rounded text-white font-bol"
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
            >
              LOGIN
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
