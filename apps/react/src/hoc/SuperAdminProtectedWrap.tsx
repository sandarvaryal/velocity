import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SuperAdminProtectedWrap = (WrappedComponent: React.ComponentType) => {
  return () => {
    const navigate = useNavigate();

    const { isError, isLoading } = useQuery({
      queryKey: ["verify"],
      queryFn: async () => {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/superAdmin/verify`,
          {
            withCredentials: true,
          }
        );
        return true;
      },
      retry: false,
    });

    useEffect(() => {
      if (!isLoading && isError) {
        toast.error("Unauthorized");
        navigate("/shipments");
      }
    }, [isError, isLoading]);

    return <WrappedComponent />;
  };
};

export default SuperAdminProtectedWrap;
