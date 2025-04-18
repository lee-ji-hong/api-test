import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useState } from "react";
import { useRecoilState } from "recoil";

import BottomSheet from "@/components/modal/BottomSheet";
import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { formData } from "@/recoil/atoms";
import { IMAGES } from "@/constants/images";
import { ChildStatus, sendLoanAdviceReportRequest } from "@/models";

import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
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
  const [childStatus, setChildStatus] = useState("");

  const handleCheckboxChange = () => {
    if (childStatus === "NO_CHILD") {
      alert("자녀를 선택해주세요");
    } else {
      setRecoilFormData((prevState) => ({
        ...prevState,
        hasNewborn: !prevState.hasNewborn,
      }));
    }
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
                  onClick={() => {
                    field.onChange(status);
                    setChildStatus(status);
                    if (status === "NO_CHILD") {
                      setRecoilFormData((prevState) => ({
                        ...prevState,
                        hasNewborn: false,
                      }));
                    }
                  }}>
                  {statusLabels[status]}
                </li>
              ))}
            </ul>
            <div className={cx("checkbox-container")} onClick={handleCheckboxChange}>
              <Image className={cx("img", `check-${recoilFormData.hasNewborn}`)} imageInfo={IMAGES?.Checkbox_btn} />
              <div>
                <Text text="신생아 포함 여부" />
              </div>
            </div>
          </BottomSheet>
        )}
      />
    </>
  );
};
export default UserInfo;
