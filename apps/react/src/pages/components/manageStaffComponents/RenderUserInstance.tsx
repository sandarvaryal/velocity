import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationModal from "../../../components/main/ConfirmationModal";

export default function RenderUserInstance({
  user,
  queryKey,
}: {
  user: any;
  queryKey: string;
}) {
  const queryClient = useQueryClient();

  const [selectedValue, setSelectedValue] = useState(user.role);
  const [edited, setEdited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  //   const navigate = useNavigate();

  const changed = (e: any) => {
    setSelectedValue(e.target.value);
    return;
  };

  useEffect(() => {
    if (selectedValue !== user.role) {
      setEdited(true);
    } else {
      setEdited(false);
    }
  }, [selectedValue, user.role]);

  const handleDelete = async () => {
    if (!deleteUserId) return;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/superAdmin/deleteUser/${deleteUserId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-5 items-center hover:bg-gray-50">
      <div className="px-2 py-3 text-sm text-center">{user.username}</div>
      <div className="px-2 py-3 text-sm text-center">{user.email}</div>
      <div className="px-2 py-3 text-sm text-center">{user.phone}</div>

      {/* {user.email === "dexeratech@gmail.com" ||
      user.email === "thenexuscourier@gmail.com" ? (
        <>
          <div className="px-2 py-3 text-sm text-center">{user.role}</div>
        </>
      ) : ( */}
      <>
        <select
          className="px-2 py-3 border text-sm  font-semibold uppercase border-neutral-300 "
          value={selectedValue}
          onChange={changed}
        >
          <option value="admin" className="text-center">
            admin
          </option>
          <option value="superAdmin" className="text-center ">
            superAdmin
          </option>
        </select>

        <div className="px-2 py-3 text-sm  items-center justify-center flex gap-3">
          <button
            type="button"
            className={`px-4 font-semibold py-2 cursor-pointer ${edited ? "cursor-pointer bg-indigo-700" : "bg-neutral-500"} text-white`}
            onClick={async () => {
              if (!edited) {
                return;
              }
              try {
                const response = await axios.put(
                  `${import.meta.env.VITE_BACKEND_URL}/superAdmin/changeAccountRole/${user.id}`,
                  {
                    role: selectedValue,
                  },
                  {
                    withCredentials: true,
                  }
                );

                //   toast.success("User Edited Successfully");
                toast.success(response?.data?.message);
                //   navigate("/superAdmin/manageStaffs", {
                //     replace: true,
                //   });
                //   navigate("/superAdmin/manageStaffs");
                queryClient.invalidateQueries({
                  queryKey: [queryKey],
                });
              } catch (error: any) {
                toast.error(error?.response?.data?.message);
                console.error(error);
              }
            }}
          >
            Save
          </button>

          <button
            type="button"
            className="px-4 font-semibold py-2 cursor-pointer  bg-red-500 text-white "
            onClick={() => {
              setDeleteUserId(user.id);
              setIsModalOpen(true);
            }}
          >
            Delete
          </button>
        </div>
      </>
      {/* )} */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
