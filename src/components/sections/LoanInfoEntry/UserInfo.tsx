import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { grey, blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState } from "recoil";

import BottomSheet from "@/components/modal/BottomSheet";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import { formData } from "@/recoil/atoms";
import { ChildStatus, sendLoanAdviceReportRequest } from "@/models";

import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const cx = classNames.bind(styles);

interface UserInfoProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  buttonText: string;
  onClose: () => void;
}

const statusLabels: Record<ChildStatus, string> = {
  NO_CHILD: "무자녀",
  ONE_CHILD: "1자녀",
  TWO_CHILD: "2자녀",
  THREE_OR_MORE_CHILDREN: "3자녀 이상",
};

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
              {(["NO_CHILD", "ONE_CHILD", "TWO_CHILD", "THREE_OR_MORE_CHILDREN"] as ChildStatus[]).map((status) => (
                <li
                  key={status}
                  className={cx("option-button", { selected: field.value === status })}
                  onClick={() => field.onChange(status)}>
                  {statusLabels[status]}
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
