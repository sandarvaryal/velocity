import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: Credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
    credentials,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
