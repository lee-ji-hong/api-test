import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectBottomSheet from "@/components/shared/SelectBottomSheet";
import { HouseType } from "@/models";

import classNames from "classnames/bind";
import styles from "@/components/shared/SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  onClose: () => void;
}

const statusLabels: Record<HouseType, string> = {
  APARTMENT: "아파트",
  OFFICETEL: "오피스텔",
  HOUSEHOLD_HOUSE: "연립다세대",
  FAMILY_HOUSE: "단독/다가구",
};

export const rentHousingTypeController = <ControlType extends FieldValues>({
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
          const handleSelect = (status: HouseType) => {
            field.onChange(status);
            onClose();
          };

          return (
            <SelectBottomSheet modalTitle={modalTitle} onClose={onClose}>
              {(["APARTMENT", "OFFICETEL", "HOUSEHOLD_HOUSE", "FAMILY_HOUSE"] as HouseType[]).map((status) => (
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
export default rentHousingTypeController;
