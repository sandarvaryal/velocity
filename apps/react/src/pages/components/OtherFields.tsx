import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import ClientSelect from "./formComponents/ClientSelect";
import { useSelector } from "react-redux";

const optionsMap: Record<string, string[]> = {
  "Velocity self": [
    "nepal post",
    "dhl",
    "dpex",
    "fedex",
    "ups",
    "dpd.uk",
    "dpd.de",
    "SAGAWA",
    "eshipper",
    "canpar",
    "eshipper obibox",
    "aramex",
  ],
  "jfk B": ["fedex"],
  "jfk C": ["fedex"],
  syd: ["dpexonline"],
  mel: ["dpex"],
  "lhr hv": ["dhl", "dpd.uk"],
  Canada: ["eshipper", "canpar", "eshipper obibox"],
  fra: ["ups"],
  ams: ["dpd.de"],
  // delhi: [""],
  dxb: ["ups"],
  // "bom Mumbai" :[""],
  // sin: [""],
  tlhr: ["fedex", "dhl"],
};

const DynamicSelect = ({ data, formFor }: { data: any; formFor: string }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedHub = watch("hub");
  const selectedService = watch("service");
  const boxes = watch("boxes") || [];
  const boxAwbNumbers = boxes.map((box: any) => {
    return box?.boxAwbNumber || "";
  });
  const uniqueBoxAwbNumbers = Array.from(new Set(boxAwbNumbers)).join(", ");
  useEffect(() => {
    if (formFor === "EditShipment") {
      setValue("trackingNumber", uniqueBoxAwbNumbers);
    }
  }, [uniqueBoxAwbNumbers, formFor, boxes]);

  const navigate = useNavigate();

  const handleClone = () => {
    const consignorData = watch("consignor");
    const consigneeData = watch("consignee");

    const cloneData = {
      consignor: { ...consignorData },
      consignee: { ...consigneeData },
    };

    navigate("/bookShipments", { state: { cloneData: cloneData } });
  };

  const [servicesOptions, setServicesOptions] = useState<string[]>([]);
  console.log(servicesOptions);

  useEffect(() => {
    if (!data) return;

    const fields = {
      id: data.id ? data.id : "uuidv4()",

      awbNumber: data.awbNumber,
      hub: data.hub,
      service: data.service,
      "verificationStatus.shipmentVerified":
        data.verificationStatus?.shipmentVerified ?? false,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined) {
        setValue(key, value);
      }
    });
    // if (data.hub) {
    //   setServicesOptions(optionsMap[data.hub] || []);
    // }
  }, [data, setValue]);

  useEffect(() => {
    if (selectedHub) {
      setServicesOptions(optionsMap[selectedHub] || []);

      setValue("service", data?.service);
      // setValue("hub", data?.hub);
    }
  }, [selectedHub, setValue]);

  if (!data) {
    setValue("id", "uuidv4()");
  }

  const hubError = errors?.hub?.message as string | undefined;
  const serviceError = errors?.service?.message as string | undefined;

  // const handleDivisionChange = (value: any) => {
  //   selectedHub(value);
  //   setValue("Hub", value);
  // };

  // const { isError: superAdminError, isLoading: superAdminLoading } = useQuery({
  //   queryKey: ["verify"],
  //   queryFn: async () => {
  //     await axios.get(`${import.meta.env.VITE_BACKEND_URL}/superAdmin/verify`, {
  //       withCredentials: true,
  //     });
  //     return true;
  //   },
  //   retry: false,
  // });
  // if (superAdminLoading) {
  //   return null;
  // }
  const isSuperAdmin = useSelector(
    (state: any) => state.isSuperAdmin.superAdmin
  );

  return (
    <>
      <div className=" flex flex-col gap-4">
        {/* {!superAdminError && !superAdminLoading ? (
          <ClientSelect data1={data} />
        ) : (
          ""
        )} */}
        {isSuperAdmin ? <ClientSelect data1={data} /> : ""}

        {formFor === "EditShipment" ? (
          <button
            type="button"
            className="border px-2 py-1 text-white bg-[#06a7ddcc] cursor-pointer"
            onClick={handleClone}
          >
            Clone
          </button>
        ) : null}

        {/* AWB Number Input */}
        <div className="flex flex-col gap-2">
          {isSuperAdmin ? (
            <>
              <label htmlFor="awbNumber" className=" font-medium">
                AWB Number
              </label>
              <Input
                // value={data.awbNumber}
                defaultValue={data.awbNumber}
                className="border px-2 py-1 focus:ring-2 focus:border-transparent outline-none w-full"
                type="text"
                id="awbNumber"
                placeholder="AWB Number"
                {...register("awbNumber")}
              />
            </>
          ) : (
            // <span className="border px-2 py-1 focus:ring-2 focus:border-transparent outline-none w-full">
            //   {data.awbNumber ? data.awbNumber : "AwbNumber"}
            // </span>
            ""
          )}
        </div>

        {/* Hub Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="hub" className="  font-medium">
            Hub
          </label>
          {/* <select
          className="border border-gray-300 px-2  py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 outline-none w-full"
          id="hub"
          {...register("hub")}
        >
          <option value="">Select a Hub</option>
          {Object.keys(optionsMap).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
          <Select
            value={selectedHub}
            onValueChange={(value) =>
              register("hub").onChange({ target: { value, name: "hub" } })
            }
            // {...register("hub")}
          >
            <SelectTrigger
              id="hub"
              className="border px-2 py-1 focus:ring-2 focus:border-transparent  w-full"
            >
              <SelectValue placeholder="Select a Hub" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(optionsMap).map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hubError && <p className="text-red-500 text-xs mt-1">{hubError}</p>}
        </div>

        {/* Services Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="font-medium">
            Services
          </label>
          {/* <select
          className="border text-gray-500 border-gray-300 px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full"
          id="service"
          {...register("service")}
        >
          <option value="">Select a Service</option>
          {servicesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
          <Select
            value={selectedService}
            onValueChange={(value) =>
              register("service").onChange({
                target: { value, name: "service" },
              })
            }
            // {...register("hub")}
          >
            <SelectTrigger
              id="service"
              className="border px-2 py-1 focus:ring-2 focus:border-transparent outline-none w-full"
            >
              <SelectValue placeholder="Select a Service" />
            </SelectTrigger>
            <SelectContent>
              {servicesOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {serviceError && (
            <p className="text-red-500 text-xs mt-1">{serviceError}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="trackingNumber">Forwarding Number</label>
          <span className="flex items-center border rounded-md bg-sidebar min-h-11 px-2 py-1 outline-none w-full">
            {formFor === "EditShipment" ? uniqueBoxAwbNumbers : ""}
          </span>

          {/* <input
        className="border bg-neutral-50 border-gray-300  px-2 py-2  outline-none w-full"
        id="trackingNumber"
        type="text"
        readOnly
      /> */}
          <input
            id="trackingNumber"
            type="hidden"
            {...register("trackingNumber")}
            readOnly
          />
        </div>

        {/* Verification Checkbox */}
        {/* {formFor === "EditShipment" && (
        <div className="flex items-center gap-2 ">
          <input
            type="checkbox"
            id="verified"
            {...register("verificationStatus.shipmentVerified")}
            className="w-5 h-5 text-blue-600 border-gray-300 px-2 focus:ring-blue-500"
          />
          <label htmlFor="verified" className="text-gray-700 font-medium">
            Verify Shipment
          </label>
        </div>
      )} */}
      </div>
    </>
  );
};

export default DynamicSelect;
