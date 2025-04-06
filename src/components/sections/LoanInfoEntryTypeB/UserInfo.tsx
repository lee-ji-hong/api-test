import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { IMAGES } from "@/constants/images";
import { formData } from "@/recoil/atoms";
import { ChildStatus, sendLoanAdviceReportRequest } from "@/models";
import { useRecoilState } from "recoil";
import classNames from "classnames/bind";
import styles from "@/pages/LoanInfoEntryTypeBPage/LoanInfoEntryTypeBPage.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  modalSubTitle?: string;
  options?: { label: string; value: boolean | string }[];
  onBlur: () => void;
}

export const UserInfo = <ControlType extends FieldValues>({
  onBlur,
  formFieldName,
  control,
  options,
}: Props<ControlType>) => {
  const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => {
          const handleSelect = (value: boolean | string) => {
            field.onChange(value);
            if (value === "NO_CHILD") {
              setRecoilFormData((prevState) => ({
                ...prevState,
                childStatus: value as ChildStatus,
                hasNewborn: false,
              }));
            }
            onBlur();
          };

          const handleCheckboxChange = (value: string) => {
            if (value === "NO_CHILD" || value === undefined) {
              setRecoilFormData((prevState) => ({
                ...prevState,
                hasNewborn: false,
              }));
              alert("자녀를 선택해주세요");
            } else {
              setRecoilFormData((prevState) => ({
                ...prevState,
                childStatus: value as ChildStatus,
                hasNewborn: !prevState.hasNewborn,
              }));
            }
          };

          return (
            <>
              <ul className={cx("options")}>
                {options?.map(({ label, value }) => (
                  <li
                    key={value.toString()}
                    className={cx("option-button", {
                      selected: field.value === value,
                    })}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(value);
                    }}>
                    {label}
                  </li>
                ))}
              </ul>
              <div className={cx("checkbox-container")} onClick={() => handleCheckboxChange(field.value)}>
                <Image className={cx("img", `check-${recoilFormData.hasNewborn}`)} imageInfo={IMAGES?.Checkbox_btn} />
                <div>
                  <Text text="신생아 포함 여부" />
                </div>
              </div>
            </>
          );
        }}
      />
    </>
  );
};
export default UserInfo;
