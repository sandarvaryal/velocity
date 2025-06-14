import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("pugyo", searchQuery);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/awbExists`,
        { awbNumber: searchQuery },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate(`/test/testEditShipment/${searchQuery}`);
        return;
      }
    } catch (e) {
      toast.error("No Shipment Found");
    }
    setSearchQuery("");
  };
  return (
    <form {...props} onSubmit={handleSubmit}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Type to search..."
          className="h-8 pl-7"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}
