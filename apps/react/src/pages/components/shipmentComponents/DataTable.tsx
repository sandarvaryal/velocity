"use client";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaPlaneDeparture, FaHome } from "react-icons/fa";

// import {
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import { queryClient } from "@/Providers";

import {
  // ColumnDef,
  flexRender,
  getCoreRowModel,
  // getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/DataTablePagination";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   //   data: TData[];
//   data: any;
//   onApply: any;
// }
import { IoFilter } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   onApply,
// }: DataTableProps<TData, TValue>) {
export function DataTable({
  columns,
  data,
  onApply,
  totalPage,
  setRows,
  page,
  setPage,
}: any) {
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  // const [choose, setChoose] = useState({
  //   verified: false,
  //   departure: false,
  //   delivered: false,
  // });
  // const [selectedIds, setSelectedIds] = useState([])
  const [verified, setVerified] = useState(false);
  const [departure, setDeparture] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [open, setOpen] = useState(false);

  const [localFilters, setLocalFilters] = useState({
    awbNumber: "",
    consignorName: "",
    consignorPhone: "",
    consigneeName: "",
    consigneePhone: "",
    to: "",
  });

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    // getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
  });
  if (rowSelection) {
    console.log("rowSelection", rowSelection);
  }
  useEffect(() => {
    const selectedData = data.filter((_: any, index: any) =>
      Object.keys(rowSelection).includes(index.toString())
    );
    setSelectedRows(selectedData);
  }, [rowSelection]);
  console.log(selectedRows);

  const ids = selectedRows.map((instance: any) => {
    return instance.id;
  });

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteBulk`, {
        withCredentials: true,
        data: {
          ids,
        },
      });
      toast.success("Shipment Deleted Successfully");
      // queryClient.invalidateQueries({
      //   queryKey: ["shipments"],
      // });
      queryClient.invalidateQueries({
        queryKey: ["shipments"],
      });
    } catch (error) {
      toast.error("Failed to delete shipment/s");
      console.error(error);
    }
  };

  // const currentPageSize = table.getState().pagination.pageSize;
  // console.log(currentPageSize, "pageSize");
  // const pageSize = table.getState().pagination.pageSize;
  // setRows(pageSize);
  // useEffect(() => {
  //   // queryClient.refetchQueries({
  //   //   queryKey: [
  //   //     "shipments",
  //   //     {
  //   //       rows: table.getState().pagination.pageSize,
  //   //       page: 1,
  //   //       awbNumber: "",
  //   //       consignorName: "",
  //   //       consignorPhone: "",
  //   //       consigneeName: "",
  //   //       consigneePhone: "",
  //   //       to: "",
  //   //       dateFrom: "",
  //   //       dateTo: "",
  //   //     },
  //   //   ],
  //   // });
  //   // setFilter({
  //   //   rows: table.getState().pagination.pageSize,
  //   //   page: 1,
  //   //   awbNumber: "",
  //   //   consignorName: "",
  //   //   consignorPhone: "",
  //   //   consigneeName: "",
  //   //   consigneePhone: "",
  //   //   to: "",
  //   //   dateFrom: "",
  //   //   dateTo: "",
  //   // });
  //   setFilter((prevFilter: any) => {
  //     return { ...prevFilter, rows: pageSize };
  //   });
  //   // console.log("yesyesyesyesyesyesyes");
  // }, [pageSize]);

  const handleSubmitBulk = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/editBulk`,
        { ids, verified, departure, delivered },
        { withCredentials: true }
      );
      toast.success("Shipment updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["shipments"],
      });
    } catch (error) {
      toast.error("Failed to update shipment");
      console.error(error);
    }
  };
  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setVerified(false);
      setDeparture(false);
      setDelivered(false);
    }
  };

  return (
    <>
      {/* <button className="h-2 bg-white flex self-start w-10"></button> */}
      <div className="flex gap-5">
        <Sheet>
          <SheetTrigger>
            {" "}
            <Button className="flex text-primary self-start bg-sidebar border-2 hover:bg-foreground hover:border-foreground cursor-pointer">
              <IoFilter />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Search Filters</SheetTitle>
              <SheetDescription>
                <div className="my-10 flex flex-col gap-5">
                  {[
                    {
                      id: "awbNumber",
                      label: "Awb Number",
                      placeholder: "AwbNumber...",
                    },
                    {
                      id: "consignorName",
                      label: "Consignor Name",
                      placeholder: "Name...",
                    },
                    {
                      id: "consignorPhone",
                      label: "Consignor Phone",
                      placeholder: "Phone Number...",
                    },
                    {
                      id: "consigneeName",
                      label: "Consignee Name",
                      placeholder: "Name...",
                    },
                    {
                      id: "consigneePhone",
                      label: "Consignee Phone",
                      placeholder: "Phone Number...",
                    },
                    {
                      id: "to",
                      label: "Consignee Country",
                      placeholder: "Country...",
                    },
                  ].map(({ id, label, placeholder }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label
                        htmlFor={id}
                        className="text-xs font-medium sm:text-sm"
                      >
                        {label}
                      </label>
                      <Input
                        id={id}
                        type="text"
                        placeholder={placeholder}
                        className="placeholder:text-muted-foreground/50 border  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-sm p-2 w-full text-sm sm:text-base outline-none transition"
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
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    onClick={() => onApply(localFilters)}
                    className=" cursor-pointer hover:bg-white hover:text-primary "
                  >
                    Apply Filters
                  </Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {Object.keys(rowSelection).length !== 0 ? (
          <div className="flex justify-between w-full">
            <Dialog open={open} onOpenChange={handleDialogChange}>
              <DialogTrigger>
                <Button className="cursor-pointer hover:bg-white hover:border-primary border-2 hover:text-primary dark:hover-none dark:hover:border-white">
                  Choose
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Shipment</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col gap-5">
                      <p className="mt-5">
                        Shipments on edit:
                        {selectedRows.map((row: any) => {
                          const awb = row.awbNumber;
                          return <span> {awb},</span>;
                        })}{" "}
                      </p>
                      <div className="flex justify-around">
                        <button
                          onClick={() => {
                            setVerified(!verified);
                          }}
                        >
                          <RiVerifiedBadgeFill
                            className={`cursor-pointer hover:text-primary transition-all ease-in-out duration-300 ${verified ? "text-primary" : ""}`}
                            size={"3rem"}
                          />
                        </button>
                        <button
                          onClick={() => {
                            setDeparture(!departure);
                          }}
                        >
                          <FaPlaneDeparture
                            className={`cursor-pointer hover:text-primary transition-all ease-in-out duration-300 ${departure ? "text-primary" : ""}`}
                            size={"3rem"}
                          />
                        </button>
                        <button
                          onClick={() => {
                            setDelivered(!delivered);
                          }}
                        >
                          <FaHome
                            className={`cursor-pointer hover:text-primary transition-all ease-in-out duration-300 ${delivered ? "text-primary" : ""}`}
                            size={"3rem"}
                          />
                        </button>
                      </div>
                      <div className="flex gap-2 justify-end mt-5">
                        <DialogClose>
                          <Button className="cursor-pointer bg-white hover:bg-white/50 text-black font-black">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button
                            onClick={handleSubmitBulk}
                            className="cursor-pointer bg-primary hover:bg-primary/50 font-black"
                          >
                            Confirm
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            {/* <Button className="cursor-pointer hover:bg-white hover:border-primary border-2 hover:text-primary dark:hover-none dark:hover:border-white">
              Choose
            </Button> */}
            {/* <Button className="cursor-pointer bg-black dark:bg-white dark:text-black dark:hover:bg-primary dark:hover:text-white ">
              Delete
            </Button> */}
            <Dialog>
              <DialogTrigger>
                <Button className="cursor-pointer bg-black dark:bg-white dark:text-black dark:hover:bg-primary dark:hover:text-white ">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col gap-5">
                      <p className="mt-5">
                        This action cannot be undone. This will permanently
                        delete shipment/s:
                        {selectedRows.map((row: any) => {
                          const awb = row.awbNumber;
                          return <span> {awb},</span>;
                        })}{" "}
                      </p>
                      <div className="flex gap-2 justify-end">
                        <DialogClose>
                          <Button
                            data-slot="dialog-close"
                            className="cursor-pointer bg-white hover:bg-white/50 text-black font-black"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button
                            onClick={handleConfirmDelete}
                            className="cursor-pointer bg-primary hover:bg-primary/50 font-black"
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <></>
        )}
      </div>
      <DataTablePagination
        table={table}
        totalPage={totalPage}
        data={data}
        page={page}
        setPage={setPage}
        setRows={setRows}
      />

      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border">
          <Table className="rounded-2xl border overflow-hidden">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination
          table={table}
          totalPage={totalPage}
          page={page}
          setPage={setPage}
          setRows={setRows}
        />
      </div>
    </>
  );
}
