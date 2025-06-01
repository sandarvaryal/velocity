import axios from "axios";

export const editShipment = async (variables: {
  awbNum: string;
  formData: any;
}) => {
  const { awbNum, formData } = variables;
  console.log(awbNum, formData);
  const response = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/editShipment/${awbNum}`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
