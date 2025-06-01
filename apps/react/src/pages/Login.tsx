import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser } from "../api/user/login";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
      navigate("/shipments");
    }
  }, [isError, isLoading, navigate]);

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      toast.success(data.message);
      navigate("/shipments");
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
    <form onSubmit={submitFunction} className="  h-[90vh]  bg-[#111111] flex">
      <div className="flex sm:mt-10 w-[100%] items-center sm:px-12">
        <div className="px-6 py-2 sm:pl-10 flex flex-col  order-1 md:order-2 bg w-[100%] mx-[30rem]">
          <div className="mb-8 text-center md:text-left flex flex-col">
            {/* <img
              src="/velocity-logo.svg"
              alt="velocity Logo"
              className="h-32 md:h-40 md:mx-0 mx-auto sm:mx-0"
            /> */}
            {/* <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mt-4">
              Velocity Cargo And Courier
            </h1> */}
            <p className="text-[#abb2b9] mt-4 text-[3rem] font-black">
              Welcome To <span className="text-[#F97316]">Velocity</span>
            </p>
          </div>

          <div>
            <div className="mb-6">
              {/* <label className="block text-gray-700 text-sm md:text-base">
                E-mail
              </label> */}
              <input
                type="email"
                ref={emailRef}
                className="w-full p-3 mt-1 border-b text-[#abb2b9] border-stone-100 rounded bg-transparent focus:outline-none"
                placeholder="Enter your e-mail"
              />
            </div>

            <div className="mb-8 relative">
              {/* <label className="block text-gray-700 text-sm md:text-base">
                Password
              </label> */}
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                className="w-full p-3 mt-1 border-b text-[#abb2b9]  border-stone-100 rounded bg-transparent focus:outline-none pr-10"
                placeholder="Enter your password"
              />
              <span
                className="absolute right-3 top-5 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            {/* F97316
EA6309       */}
            <button
              type="submit"
              className="w-full bg-white hover:bg-[#EA6309] text-black font-bold py-3 rounded-[1.5rem] transition cursor-pointer mt-1.5"
            >
              Log In
            </button>
          </div>
        </div>

        {/* <div className="flex items-center justify-center order-2 md:order-1">
            <img
              src="/nexuscourierperson.jpeg"
              alt="Login Illustration"
              className="w-[80%]"
            />
          </div> */}
      </div>
    </form>
  );
}
