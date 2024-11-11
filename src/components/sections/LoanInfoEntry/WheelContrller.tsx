import { Control, Controller, FieldValues, Path } from "react-hook-form";
import WheelAgePicker from "@/components/shared/WheelAgePicker";
import BottomSheet from "@/components/modal/BottomSheet";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  buttonText: string;
  onClose: () => void;
}

export const WheelContrller = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
  buttonText,
}: Props<ControlType>) => {
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => (
          <BottomSheet buttonText={buttonText} onClose={onClose}>
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
          </BottomSheet>
        )}
      />
    </>
  );
};
export default WheelContrller;
