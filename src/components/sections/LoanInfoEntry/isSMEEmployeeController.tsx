import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Spacing from "@/components/shared/Spacing";

import classNames from "classnames/bind";
import styles from "@/components/modal/SelectBottomSheet/SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  modalSubTitle?: string;
  options?: { label: string; value: boolean | string }[];
  onClose: () => void;
}

export const isSMEEmployeeController = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
  options,
}: Props<ControlType>) => {
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => {
          const handleSelect = (value: boolean | string) => {
            field.onChange(value);
            onClose();
          };

          return (
            <SelectBottomSheet modalTitle={modalTitle} onClose={onClose}>
              <span className={cx("employ-txt")}>
                중소기업 기준은 직원 수 300명 이하, 연매출 1천억원 이하로 자세한 기준은{" "}
                <a
                  href="https://www.ftc.go.kr/callPop.do?url=/jargonSearchView.do?key=451&dicseq=356&titl=%EC%A4%91%EC%86%8C%EA%B8%B0%EC%97%85"
                  target="_blank"
                  rel="noopener noreferrer">
                  링크
                </a>
                를 통해 확인해주세요.
              </span>
              <Spacing size={20} />
              {options?.map(({ label, value }) => (
                <li
                  key={value.toString()}
                  className={cx("option-button")}
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중단
                    handleSelect(value); // 선택 동작 실행
                  }}>
                  {label}
                </li>
              ))}
            </SelectBottomSheet>
          );
        }}
      />
    </>
  );
};
export default isSMEEmployeeController;
