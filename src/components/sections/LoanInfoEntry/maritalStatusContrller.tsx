import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectBottomSheet from "@/components/shared/SelectBottomSheet";
import { MaritalStatus } from "@/models";

import classNames from "classnames/bind";
import styles from "@/components/shared/SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  onClose: () => void;
}

const statusLabels: Record<MaritalStatus, string> = {
  SINGLE: "미혼",
  NEWLY_MARRIED: "신혼",
  MARRIED: "기혼",
  ENGAGED: "결혼 예정",
};

export const maritalStatusContrller = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
}: Props<ControlType>) => {
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => {
          const handleSelect = (status: MaritalStatus) => {
            field.onChange(status);
            onClose();
          };

          return (
            <SelectBottomSheet modalTitle={modalTitle} onClose={onClose}>
              {(["SINGLE", "NEWLY_MARRIED", "MARRIED", "ENGAGED"] as MaritalStatus[]).map((status) => (
                <li key={status} className={cx("option-button")} onClick={() => handleSelect(status)}>
                  {statusLabels[status]}
                </li>
              ))}
            </SelectBottomSheet>
          );
        }}
      />
    </>
  );
};
export default maritalStatusContrller;
