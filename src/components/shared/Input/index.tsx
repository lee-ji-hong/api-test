import { forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames/bind";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { IMAGES } from "@/constants/images";
import { modalformatNumber, formatNumberWithUnits } from "@/utils/formatters";
import styles from "./Input.module.scss";
const cx = classNames.bind(styles);

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  error?: boolean;
  value: number;
  onChange: (value: number) => void;
  warningMessage: string;
}

const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ error, value, onChange, warningMessage, ...props }, ref) => {
    return (
      <>
        <div className={cx("input-container", { "input-alert": error })}>
          <input
            className={cx("input", { shake: error })}
            ref={ref}
            maxLength={30}
            value={modalformatNumber(value)}
            placeholder="금액을 입력하세요"
            readOnly={true}
            {...props}
          />
          {value ? (
            <Image className={cx("reset")} imageInfo={IMAGES?.Cancel_grey} onClick={() => onChange(0)} />
          ) : (
            <></>
          )}
          <Text className={cx("unit")} text="만원" />
        </div>
        <Text
          className={cx("txt-sub", { "text-alert": error })}
          text={value === 0 ? "" : error ? warningMessage : formatNumberWithUnits(value)}
        />
      </>
    );
  },
);

export default Input;
