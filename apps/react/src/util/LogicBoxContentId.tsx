import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface LogicBoxContentIdProps {
  boxIndex: number;
  index: number;
}

export function LogicBoxContentId({ boxIndex, index }: LogicBoxContentIdProps) {
  const { register, setValue, watch } = useFormContext();

  const existingId = watch(`boxes[${boxIndex}].BoxesContent[${index}].id`);

  useEffect(() => {
    if (!existingId) {
      const uuid = uuidv4();
      const fieldName = `boxes[${boxIndex}].BoxesContent[${index}].id`;
      setValue(fieldName, uuid);
    }
  }, [existingId, setValue, boxIndex, index]);

  useEffect(() => {
    register(`boxes[${boxIndex}].BoxesContent[${index}].id`);
  }, [register, boxIndex, index]);

  return null;
}
