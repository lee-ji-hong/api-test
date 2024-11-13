import { forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames/bind";
import Spacing from "@/components/shared/Spacing";
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
  formattedAmount?: boolean;
  unit?: string;
}

const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ error, value, unit = "만원", onChange, warningMessage, formattedAmount = true, ...props }, ref) => {
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
          <Text className={cx("unit")} text={unit} />
        </div>
        <Spacing size={8} />
        <Text
          className={cx("txt-sub", { "text-alert": error })}
          text={
            value === undefined
              ? `0${unit}`
              : error
                ? warningMessage
                : formattedAmount
                  ? unit === "만원"
                    ? formatNumberWithUnits(value)
                    : `${value}${unit}`
                  : ""
          }
        />
      </>
    );
  },
);

export default Input;
