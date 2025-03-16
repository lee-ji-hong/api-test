import { Control, Controller, FieldValues, Path } from "react-hook-form";
import WheelAgePicker from "@/components/shared/WheelAgePicker";

import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "@/pages/LoanInfoEntryTypeBPage/LoanInfoEntryTypeBPage.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  onClose: () => void;
}

export const WheelContrller = <ControlType extends FieldValues>({
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
        render={({ field }) => (
          <>
            <Spacing size={41} />
            <Text className={cx("txt-title")} text={modalTitle} />
            <Spacing size={20} />
            <WheelAgePicker
              initialValue={9}
              onChange={(value) => {
                field.onChange(value);
                onClose;
              }}
            />
            <Spacing size={20} />
          </>
        )}
      />
    </>
  );
};
export default WheelContrller;
