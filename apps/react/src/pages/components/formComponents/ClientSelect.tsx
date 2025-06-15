// import { useEffect } from "react";
// import { useFormContext, FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";
// import fieldConfigs from "../../../config/fieldConfig";
// import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

interface ClientSelect {
  name: string;
  value: any;
}

export default function ClientSelect({ data1 }: { data1: any }) {
  //     {
  //   boxIndex,
  //   index,
  //   name,
  //   value,
  //   // }: FormInputDetailProps) {
  // }: any
  const {
    register,
    watch,
    setValue,
    // formState: { errors },
  } = useFormContext();
  let selectedClient = watch("client");
  // data1?.userId ? (selectedClient = data1?.userId) : watch("client");
  console.log(selectedClient);

  const { data, isLoading } = useQuery({
    queryKey: ["client"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getClient`,
        {
          withCredentials: true,
        }
      );
      console.log("fdsafadsfasd", response.data);
      return response.data;
    },
  });
  if (isLoading) {
    return null;
  }
  console.log(data, "data");
  console.log("suruko", data1);

  // useEffect(() => {
  //   if (selectedClient) {
  //     setValue("client", data1?.client);
  //   }
  // }, [selectedClient, setValue]);

  return (
    <Select
      defaultValue={data1?.userId}
      value={selectedClient}
      onValueChange={(value) =>
        register("client").onChange({ target: { value, name: "client" } })
      }
    >
      <SelectTrigger
        id="client"
        className="border px-2 py-1 focus:ring-2 focus:border-transparent  w-full"
      >
        <SelectValue placeholder="Select a client" />
      </SelectTrigger>
      <SelectContent>
        {/* {Object.keys(optionsMap).map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))} */}
        {data.map((client: any) => (
          <SelectItem key={client.id} value={client.id}>
            {client.company}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  //   return <>{renderInputField()}</>;
}
