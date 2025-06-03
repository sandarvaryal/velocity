import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { LuChartNoAxesColumnDecreasing } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export function Blog() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getBlog`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    // placeholderData: [],
  });
  if (isError) {
    toast.error("Error fething Users");
  }
  //   if (isLoading) {
  //     return <>wait</>;
  //   }
  const navigate = useNavigate();

  console.log("blog", data);

  return (
    <>
      <div>
        <span>
          title: {data?.blog[0]?.title ? data.blog[0].title : ""} description:{" "}
        </span>

        <div dangerouslySetInnerHTML={{ __html: data.blog[0].description }} />
      </div>
    </>
  );
}
