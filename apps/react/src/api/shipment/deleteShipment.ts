import axios from "axios";

export const deleteShipment = async (awbNum: number) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/deleteShipment/${awbNum}}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
