import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const getFlagUrl = (countryCode: string) => {
  const [url, setUrl] = useState<string | undefined>(undefined);

  const { mutate } = useMutation({
    mutationFn: async (countryCode: string) => {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/flag/images",
        { iso2: countryCode }
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      setUrl(data.data.flag);
    },
    onError: (error: any) => {
      console.error("Error fetching flag data: ", error);
    },
  });

  mutate(countryCode);

  return url;
};
