import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { grey, blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState } from "recoil";

import BottomSheet from "@/components/shared/BottomSheet";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import { formData } from "@/recoil/atoms";
import { sendLoanAdviceReportRequest } from "@/models";

import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const cx = classNames.bind(styles);

interface UserInfoProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  buttonText?: string;
  onClose: () => void;
}

export const UserInfo = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
  buttonText,
}: UserInfoProps<ControlType>) => {
  const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);

  const handleCheckboxChange = () => {
    setRecoilFormData((prevState) => ({
      ...prevState,
      hasNewborn: !prevState.hasNewborn, // 신생아 포함 여부 토글
    }));
    console.log(recoilFormData);
  };
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => (
          <BottomSheet modalTitle={modalTitle} buttonText={buttonText} onClose={onClose} {...field}>
            <Spacing size={30} />
            <ul className={cx("options")}>
              {(["무자녀", "1자녀", "2자녀", "3자녀 이상"] as string[]).map((status) => (
                <li
                  key={status}
                  className={cx("option-button", { selected: field.value === status })}
                  onClick={() => field.onChange(status)}>
                  {status}
                </li>
              ))}
            </ul>
            <div className={cx("checkbox-container")}>
              <Checkbox
                {...label}
                defaultChecked={recoilFormData.hasNewborn}
                size="large"
                onChange={handleCheckboxChange}
                sx={{
                  color: grey[300],
                  "&.Mui-checked": {
                    color: blue[700],
                  },
                }}
              />
              <Text text="신생아 포함 여부" />
            </div>
          </BottomSheet>
        )}
      />
    </>
  );
};
export default UserInfo;
