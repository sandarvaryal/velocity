// import { useEffect, useRef, useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { loginUser } from "../api/user/login";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// export default function Login() {
//   const emailRef = useRef<HTMLInputElement | null>(null);
//   const passwordRef = useRef<HTMLInputElement | null>(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const { isError, isLoading } = useQuery({
//     queryKey: ["verify"],
//     queryFn: async () => {
//       await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
//         withCredentials: true,
//       });
//       return true;
//     },
//     retry: false,
//   });

//   useEffect(() => {
//     if (!isLoading && !isError) {
//       navigate("/user/shipment");
//     }
//   }, [isError, isLoading, navigate]);

//   const { mutate } = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data: any) => {
//       toast.success(data.message);
//       navigate("/user/shipment");
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message);
//       console.error("login failed", error.response?.data?.message);
//     },
//   });

//   const submitFunction = (e: React.FormEvent) => {
//     e.preventDefault();

//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (email && password) {
//       mutate({ email, password });
//     } else {
//       console.error("missing credentials");
//     }
//   };

//   return (
//     <form onSubmit={submitFunction} className="  h-[95vh]  bg-[#111111] flex">
//       <div className="flex sm:mt-10 w-[100%] items-center sm:px-12">
//         <div className="px-6 py-2 sm:pl-10 flex flex-col  order-1 md:order-2 bg w-[100%] mx-[30rem]">
//           <div className="mb-8 text-center md:text-left flex flex-col">
//             {/* <img
//               src="/velocity-logo.svg"
//               alt="velocity Logo"
//               className="h-32 md:h-40 md:mx-0 mx-auto sm:mx-0"
//             /> */}
//             {/* <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mt-4">
//               Velocity Cargo And Courier
//             </h1> */}
//             <p className="text-[#abb2b9] mt-4 text-[3rem] font-black">
//               Welcome To <span className="text-[#F97316]">Velocity</span>
//             </p>
//           </div>

//           <div>
//             <div className="mb-6">
//               {/* <label className="block text-gray-700 text-sm md:text-base">
//                 E-mail
//               </label> */}
//               <input
//                 type="email"
//                 ref={emailRef}
//                 className="w-full p-3 mt-1 border-b text-[#abb2b9] border-stone-100 rounded bg-transparent focus:outline-none"
//                 placeholder="Enter your e-mail"
//               />
//             </div>

//             <div className="mb-8 relative">
//               {/* <label className="block text-gray-700 text-sm md:text-base">
//                 Password
//               </label> */}
//               <input
//                 type={showPassword ? "text" : "password"}
//                 ref={passwordRef}
//                 className="w-full p-3 mt-1 border-b text-[#abb2b9]  border-stone-100 rounded bg-transparent focus:outline-none pr-10"
//                 placeholder="Enter your password"
//               />
//               <span
//                 className="absolute right-3 top-5 cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <AiOutlineEyeInvisible size={20} />
//                 ) : (
//                   <AiOutlineEye size={20} />
//                 )}
//               </span>
//             </div>
//             {/* F97316
// EA6309       */}
//             <button
//               type="submit"
//               className="w-full bg-white hover:bg-[#EA6309] text-black font-bold py-3 rounded-[1.5rem] transition cursor-pointer mt-1.5"
//             >
//               Log In
//             </button>
//           </div>
//         </div>

//         {/* <div className="flex items-center justify-center order-2 md:order-1">
//             <img
//               src="/nexuscourierperson.jpeg"
//               alt="Login Illustration"
//               className="w-[80%]"
//             />
//           </div> */}
//       </div>
//     </form>
//   );
// }

//eta bata

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser } from "../api/user/login";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
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

  useEffect(() => {
    if (!isLoading && !isError) {
      navigate("/user/shipment");
    }
  }, [isError, isLoading, navigate]);

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      // toast.success(data.message);
      toast.success("Logged in successfully!");
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/user/shipment");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
      console.error("login failed", error.response?.data?.message);
    },
  });

  const submitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      mutate({ email, password });
    } else {
      console.error("missing credentials");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#111111] flex items-center justify-center p-4"
    >
      <form
        onSubmit={submitFunction}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#1a1a1a] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#abb2b9]">
            Welcome To <span className="text-[#F97316]">Velocity</span>
          </h1>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6"
          >
            <input
              type="email"
              ref={emailRef}
              className="w-full p-3 text-[#abb2b9] bg-transparent border-b border-stone-100 focus:outline-none focus:border-[#F97316] transition-colors duration-300 placeholder:text-[#abb2b9]/60"
              placeholder="Enter your e-mail"
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8 relative"
          >
            <input
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              className="w-full p-3 text-[#abb2b9] bg-transparent border-b border-stone-100 focus:outline-none focus:border-[#F97316] transition-colors duration-300 placeholder:text-[#abb2b9]/60 pr-10"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#abb2b9] hover:text-[#F97316] transition-colors duration-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </motion.div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-2xl hover:bg-[#EA6309] hover:text-white transition-all duration-300"
          >
            Log In
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
