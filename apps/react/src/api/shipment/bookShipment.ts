import axios from "axios";

export const bookShipment = async (formData: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/bookShipment`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
