import axios from "axios";

export const getShipments = async (page: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/getShipments`,
    {
      withCredentials: true,
      params: { page },
    }
  );
  return response.data;
};

export const getShipment = async (awbNum: any) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/getShipment/${awbNum}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
