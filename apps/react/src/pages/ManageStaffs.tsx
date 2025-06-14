import { useQuery } from "@tanstack/react-query";
import SuperAdminProtectedWrap from "../hoc/SuperAdminProtectedWrap";
import axios from "axios";
import toast from "react-hot-toast";
import RenderUserInstance from "./components/manageStaffComponents/RenderUserInstance";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa";

function unprotectedManageStaff() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/superAdmin/getUsers`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    placeholderData: [],
  });

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    toast.error("Error fething Users");
  }

  const navigate = useNavigate();
  // const prioritizedEmails = [
  //   "thenexuscourier@gmail.com",
  //   "dexeratech@gmail.com",
  // ];

  // const sortedData = [...data].sort((a, b) => {
  //   const aPriority = prioritizedEmails.includes(a.email) ? 0 : 1;
  //   const bPriority = prioritizedEmails.includes(b.email) ? 0 : 1;
  //   return aPriority - bPriority;
  // });

  return (
    <>
      <div className="flex max-w-[100rem] m-auto px-6 py-2 justify-between items-center ">
        <h1 className=" font-semibold text-gray-700 flex items-center gap-2 pt-2 ">
          <span className="text-lg flex items-center gap-1 sm:text-xl">
            <FaUsers /> Manage Users
          </span>
        </h1>
        <button
          className="border px-4 py-2 text-sm text-white font-semibold  bg-indigo-600 cursor-pointer"
          onClick={() => {
            navigate("/user/createUser");
          }}
        >
          Create New User
        </button>
      </div>

      <div className="bg-white rounded-md overflow-hidden max-w-[100rem] text-center m-auto px-6 py-2">
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-5 bg-gray-100 p-3 rounded-md font-semibold text-sm">
              <span>Username</span>
              <span>Email Address</span>
              <span>Phone Number</span>
              <span>User Role</span>
              <span>Actions</span>
            </div>
            {data.map((user: any) => (
              <div key={user.id} className=" border-b border-neutral-300">
                <RenderUserInstance user={user} queryKey="user" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const ManageStaffs = SuperAdminProtectedWrap(unprotectedManageStaff);
