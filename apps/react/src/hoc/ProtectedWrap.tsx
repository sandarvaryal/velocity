import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ProtectedWrap = (WrappedComponent: React.ComponentType) => {
  return () => {
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

    // useEffect(() => {
    if (!isLoading && isError) {
      // toast.error("Unauthorized");
      navigate("/login");
    }
    // }, [isError, isLoading]);

    return <WrappedComponent />;
  };
};

export default ProtectedWrap;
