import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { MdOutlineLogout } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  const { isError } = useQuery({
    queryKey: ["verify"],
    queryFn: async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
        withCredentials: true,
      });
      return true;
    },
    retry: false,
  });

  // Check if user is a super admin
  const { data: isSuperAdmin, isError: superAdminError } = useQuery({
    queryKey: ["superVerify"],
    queryFn: async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/superAdmin/verify`, {
        withCredentials: true,
      });
      return true;
    },
    retry: false,
  });

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        null,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      toast.success("Logged Out Successfully");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Logout failed");
      console.error("Logout failed:", error.response?.data?.message);
    },
  });

  // Prevent footer from rendering on the homepage by conditionally rendering content inside footer
  if (location.pathname === "/") {
    return null;
  }

  return (
    <footer className="flex items-center justify-between max-w-[100rem] h-12 m-auto px-4 sm:px-6 py-2 border-t border-neutral-50">
      {!isError && (
        <>
          <button
            className="font-semibold flex sm:text-base items-center gap-2 px-2 py-1 text-sm text-red-500 cursor-pointer"
            onClick={() => logout()}
          >
            <MdOutlineLogout />
            Logout
          </button>

          {isSuperAdmin && !superAdminError && (
            <button
              className="font-semibold text-sm sm:text-base flex items-center gap-2 px-2 py-1 text-indigo-700 cursor-pointer ml-auto"
              onClick={() => navigate("/superAdmin/manageStaffs")}
            >
              <FaUsers />
              Manage Users
            </button>
          )}
        </>
      )}
    </footer>
  );
}
