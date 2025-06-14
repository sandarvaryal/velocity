// import SuperAdminProtectedWrap from "../hoc/SuperAdminProtectedWrap";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import axios from "axios";
// import RegisterFormInput from "./components/manageStaffComponents/RegisterFormInput";
// import RegisterSelect from "./components/manageStaffComponents/RegisterSelect";
// import { useNavigate } from "react-router-dom";

// const registerUserSchema = z.object({
//   username: z.string().min(1, { message: "Username is required" }),
//   email: z.string().email({ message: "Invalid Email" }),
//   password: z.string().min(1, { message: " Password is required" }),
//   phone: z.string().refine((val) => !isNaN(Number(val)), {
//     message: "Phone number must be a valid number",
//   }),
//   role: z.enum(["admin", "superAdmin"]),
// });

// function UnprotectedCreateUser() {
//   const navigate = useNavigate();
//   const methods = useForm<any>({
//     resolver: zodResolver(registerUserSchema),
//     mode: "onSubmit",
//   });

//   const mutate = useMutation({
//     mutationFn: async (formData: any) => {
//       //   const response = await axios.put(
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/superAdmin/register`,
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     },

//     onSuccess: (data: any) => {
//       toast.success(data.message);
//       navigate("/superAdmin/ManageStaffs");
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message);
//       console.error("Shipment Edit Failed", error.response?.data?.message);
//     },
//   });

//   const onSubmit = (formData: any) => {
//     //   return true;
//     console.log(formData);
//     mutate.mutate(formData);
//   };
//   return (
//     <>
//       <FormProvider {...methods}>
//         <form onSubmit={methods.handleSubmit(onSubmit)}>
//           <div>
//             <div>
//               <RegisterFormInput name={"username"} label={"Username"} />
//             </div>
//             <div>
//               <RegisterFormInput name={"email"} label={"Email"} />
//             </div>
//             <div>
//               <RegisterFormInput name={"password"} label={"Password"} />
//             </div>
//             <div>
//               <RegisterFormInput name={"phone"} label={"Phone Number"} />
//             </div>
//             <div>
//               <RegisterSelect name={"role"} label={"Role"} />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
//           >
//             Submit
//           </button>
//         </form>
//       </FormProvider>
//     </>
//   );
// }

// export const CreateUser = SuperAdminProtectedWrap(UnprotectedCreateUser);

//eta bata

// import SuperAdminProtectedWrap from "../hoc/SuperAdminProtectedWrap";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import axios from "axios";
// import RegisterFormInput from "./components/manageStaffComponents/RegisterFormInput";
// import RegisterSelect from "./components/manageStaffComponents/RegisterSelect";
// import { useNavigate } from "react-router-dom";

// import { FaUser } from "react-icons/fa";

// const registerUserSchema = z.object({
//   username: z.string().min(1, { message: "Username is required" }),
//   email: z.string().email({ message: "Invalid Email" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" }),
//   phone: z.string().refine((val) => !isNaN(Number(val)), {
//     message: "Phone number must be a valid number",
//   }),
//   role: z.enum(["admin", "superAdmin"]),
// });

// function UnprotectedCreateUser() {
//   const navigate = useNavigate();
//   const methods = useForm({
//     resolver: zodResolver(registerUserSchema),
//     mode: "onSubmit",
//   });

//   const mutate = useMutation({
//     mutationFn: async (formData: any) => {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/superAdmin/register`,
//         formData,
//         { withCredentials: true }
//       );
//       return response.data;
//     },
//     onSuccess: (data: any) => {
//       toast.success(data.message);
//       navigate("/superAdmin/ManageStaffs");
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || "Registration failed");
//       console.error("Registration Failed", error.response?.data?.message);
//     },
//   });

//   const onSubmit = (formData: any) => {
//     mutate.mutate(formData);
//   };

//   return (
//     <div className="flex  justify-center min-h-screen p-4 bg-gray-100">
//       <div className="bg-white h-full mt-32 shadow p-4 sm:p-6 w-full max-w-md">
//         <h2 className="text-2xl flex items-center gap-3 font-bold  text-gray-800 mb-6">
//           <FaUser />
//           <span>Create New User</span>
//         </h2>

//         <FormProvider {...methods}>
//           <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
//             <RegisterFormInput name="username" label="Username" />
//             <RegisterFormInput name="email" label="Email" />
//             <RegisterFormInput name="password" label="Password" />
//             <RegisterFormInput name="phone" label="Phone Number" />
//             <RegisterSelect name="role" label="Role" />

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 hover:bg-blue-600 text-white font-semibold py-2  transition-all cursor-pointer"
//             >
//               Create User
//             </button>
//           </form>
//         </FormProvider>
//       </div>
//     </div>
//   );
// }

// export const CreateUser = SuperAdminProtectedWrap(UnprotectedCreateUser);

//eta bata

import SuperAdminProtectedWrap from "../hoc/SuperAdminProtectedWrap";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import RegisterFormInput from "./components/manageStaffComponents/RegisterFormInput";
import RegisterSelect from "./components/manageStaffComponents/RegisterSelect";
import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";

const registerUserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  phone: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Phone number must be a valid number",
  }),
  role: z.enum(["admin", "superAdmin"]),

  company: z.string().min(1, { message: "Company is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  zip: z.string().min(1, { message: "Zip is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  address1: z.string().min(1, { message: "Address is required" }),
  url: z.string().min(1, { message: "Url is required" }),
});

function UnprotectedCreateUser() {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(registerUserSchema),
    mode: "onSubmit",
  });

  const mutate = useMutation({
    mutationFn: async (formData: any) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/superAdmin/register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      navigate("/user/ManageStaffs");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error("Registration Failed", error.response?.data?.message);
    },
  });

  const onSubmit = (formData: any) => {
    mutate.mutate(formData);
  };

  return (
    <div className="flex  justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white h-full mt-14  shadow p-4 sm:p-6 w-full max-w-md">
        <h2 className="text-2xl flex items-center gap-3 font-bold  text-gray-800 mb-6">
          <FaUser />
          <span>Create New User</span>
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <RegisterFormInput name="username" label="Username" />
            <RegisterFormInput name="email" label="Email" />
            <RegisterFormInput name="password" label="Password" />
            <RegisterFormInput name="phone" label="Phone Number" />
            <RegisterSelect name="role" label="Role" />

            <RegisterFormInput name="company" label="Company" />
            <RegisterFormInput name="country" label="country" />
            <RegisterFormInput name="zip" label="zip" />
            <RegisterFormInput name="state" label="State" />
            <RegisterFormInput name="city" label="city" />
            <RegisterFormInput name="address1" label="address1" />
            <RegisterFormInput name="url" label="url" />

            <button
              type="submit"
              className="w-full text-sm bg-indigo-600 hover:bg-blue-600 text-white font-semibold py-2  transition-all cursor-pointer"
            >
              Create User
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export const CreateUser = SuperAdminProtectedWrap(UnprotectedCreateUser);
