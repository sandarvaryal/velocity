import FormInputBoxContent from "./formComponents/FormInputBoxContent";
import { useFormContext } from "react-hook-form";
import { LogicBoxContentId } from "../../util/LogicBoxContentId";
import DescHsCode from "./formComponents/DescHsCode";

export default function BoxContent({
  boxInstance,
  handleAddDetail,
  handleDeleteDetail,
  formFor,
}: {
  boxInstance: any;
  formFor: "BookShipment" | "EditShipment";
  handleAddDetail: (boxId: string) => void;
  handleDeleteDetail: (
    boxId: string,
    detailId: string,
    boxIndex: number,
    index: number
  ) => void;
}) {
  const { watch } = useFormContext();
  const boxes = watch("boxes") || [];
  const allQuantityValues = boxes.flatMap((box: any) =>
    box.BoxesContent
      ? box.BoxesContent.map((content: any) => content.quantity)
      : []
  );
  const totalQuantity = allQuantityValues.reduce(
    (acc: number, current: number) => acc + Number(current),
    0
  );

  const allUnitWeightValues = boxes.flatMap((box: any) =>
    box.BoxesContent
      ? box.BoxesContent.map((content: any) => content.unitWeight)
      : []
  );
  const totalUnitWeight = allUnitWeightValues.reduce(
    (acc: number, current: number) => acc + Number(current),
    0
  );

  const allTotalValues = boxes.flatMap((box: any) =>
    box.BoxesContent
      ? box.BoxesContent.map((content: any) => content.total)
      : []
  );
  const total = allTotalValues.reduce(
    (acc: number, current: number) => acc + Number(current),
    0
  );

  return (
    <div className="overflow-x-scroll border-gray-300 rounded-md">
      <h3 className="font-semibold mt-4 mb-2 text-lg">Boxes Content</h3>

      <div className="min-w-max sm:min-w-fit">
        {/* Header */}
        <div className="grid grid-cols-[10rem_20rem_1fr_1fr_1fr_1fr_1fr_1fr] text-center gap-2 bg-gray-100 p-2 w-full font-semibold text-sm shadow border-b border-gray-300">
          <span>BOX AWB No</span>
          <span>Description</span>
          <span>HS Code</span>
          <span>Quantity</span>
          <span>Unit Weight</span>
          <span>Rate</span>
          <span>Total</span>
          <span>Actions</span>
        </div>

        {/* Data Rows */}
        {boxInstance.map((box: any, boxIndex: number) => {
          const boxAwbNumber = watch(`boxes[${boxIndex}].boxAwbNumber`);
          return (
            <div key={box.id} className="mb-6">
              {/* Box Header */}
              <div className="grid px-2 grid-cols-[10rem_20rem_1fr_1fr_1fr_1fr_1fr_1fr] text-center gap-2 bg-gray-100 items-center ">
                <span className=" border-y w-full  h-full flex items-center justify-center border-gray-300  outline-none">
                  {formFor === "BookShipment"
                    ? `BOX-${boxIndex + 1}`
                    : boxAwbNumber}
                </span>
                <button
                  type="button"
                  className="border px-2 py-1 text-[#06a7dd] cursor-pointer hover:bg-blue-100  transition duration-150"
                  onClick={() => handleAddDetail(box.id)}
                >
                  Add Detail
                </button>
              </div>

              {/* Box Content */}
              {box.BoxesContent.length === 0 ? (
                <p className="text-gray-500 p-2">No details available.</p>
              ) : (
                box.BoxesContent.map((detail: any, index: number) => (
                  <div
                    key={detail.id}
                    className="grid grid-cols-[10rem_20rem_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 text-center items-center  px-2"
                  >
                    <LogicBoxContentId boxIndex={boxIndex} index={index} />

                    <span>{index + 1}</span>

                    <DescHsCode boxIndex={boxIndex} index={index} />

                    <FormInputBoxContent
                      boxIndex={boxIndex}
                      index={index}
                      value={detail.quantity}
                      name="quantity"
                    />
                    <FormInputBoxContent
                      boxIndex={boxIndex}
                      index={index}
                      value={detail.unitWeight}
                      name="unitWeight"
                    />
                    <FormInputBoxContent
                      boxIndex={boxIndex}
                      index={index}
                      value={detail.unitRate}
                      name="unitRate"
                    />
                    <FormInputBoxContent
                      boxIndex={boxIndex}
                      index={index}
                      value={detail.total}
                      name="total"
                    />

                    <button
                      className="border px-2 h-full text-red-500 cursor-pointer hover:bg-red-100  transition duration-150"
                      onClick={() =>
                        handleDeleteDetail(box.id, detail.id, boxIndex, index)
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          );
        })}
        <div className="grid grid-cols-[10rem_20rem_1fr_1fr_1fr_1fr_1fr_1fr] text-center gap-2 bg-gray-100 min-h-8 w-full  items-center  p-2  text-sm shadow border-b border-gray-300">
          <span className="font-semibold">Total</span>
          <span></span>
          <span></span>
          <span>{totalQuantity}</span>
          <span>{totalUnitWeight}</span>
          <span></span>
          <span>{total}</span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
