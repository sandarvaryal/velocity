import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function ModalFilter({ isOpen, onClose, onApply }: ModalProps) {
  const [localFilters, setLocalFilters] = useState({
    awbNumber: "",
    consignorName: "",
    consignorPhone: "",
    consigneeName: "",
    consigneePhone: "",
    to: "",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50 ">
      <div className="bg-[#F5F5F7] shadow-lg p-8 w-full max-w-4xl relative rounded-sm">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <MdOutlineClose className="text-2xl text-red-500 font-bold sm:text-3xl cursor-pointer" />
        </button>

        <h2 className="text-base font-medium mb-4 sm:text-lg">
          Search Filters
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {[
            { id: "awbNumber", label: "Awb Number" },
            { id: "consignorName", label: "Consignor Name" },
            { id: "consignorPhone", label: "Consignor Phone" },
            { id: "consigneeName", label: "Consignee Name" },
            { id: "consigneePhone", label: "Consignee Phone" },
            { id: "to", label: "Consignee Country" },
          ].map(({ id, label }) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="text-xs font-medium sm:text-sm">
                {label}
              </label>
              <input
                id={id}
                type="text"
                placeholder={label}
                className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-sm p-2 w-full text-sm sm:text-base outline-none transition"
                value={localFilters[id as keyof typeof localFilters]}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    [id]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex gap-4 text-sm  ">
            <div className="flex flex-col text-sm md:flex-row text-left justify-start md:items-center">
              <label htmlFor="dateTo" className=" mr-2">
                From
              </label>
              <input
                className="border min-w-28 text-sm border-gray-300 cursor-pointer py-1 px-2"
                type="date"
                id="dateFrom"
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    dateFrom: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex text-sm flex-col md:flex-row  justify-end md:items-center">
              <label htmlFor="dateTo" className=" mr-2">
                To
              </label>
              <input
                className="border min-w-36 text-sm border-gray-300 cursor-pointer py-1 px-2"
                type="date"
                id="dateTo"
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    dateTo: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => onApply(localFilters)}
            className="px-4 py-2 bg-[#00AEE4] transition-all text-white text-sm sm:text-base hover:bg-blue-400 cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
