import { Control, Controller, FieldValues, Path } from "react-hook-form";

import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
const cx = classNames.bind(styles);

interface UserInfoProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  onClose: () => void;
}

export const UserInfo = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
}: UserInfoProps<ControlType>) => {
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={
          ({ field }) => <input {...field} placeholder="값을 입력하세요." className={cx("input")} />

          // <TitleInput placeholder="여행지 이름을 입력하세요." disabled={disabled} {...field} />
        }
      />
      <button onClick={onClose} className={cx("close-button")}>
        닫기
      </button>
    </>
  );
};
export default UserInfo;
