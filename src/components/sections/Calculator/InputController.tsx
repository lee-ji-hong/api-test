import { Control, Controller, FieldValues, Path } from "react-hook-form";

// import KeyboardModal from "@/components/modal/KeyboardModal";
import Input from "@/components/shared/Input";

import styles from "@/pages/CalculatorPage/CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Limit {
  value: number;
  ment: string;
}

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  onFocus?: () => void;
  min?: Limit;
  max?: Limit;
}

const InputController = <ControlType extends FieldValues>({
  formFieldName,
  control,
  min,
  max,
  onFocus,
}: Props<ControlType>) => {
  // const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);

  // const handleFocus = () => {
  //   setIsKeyboardModalOpen(true); // 포커스 시 모달 열기
  // };

  const handleBlur = () => {
    setTimeout(() => {
      // setIsKeyboardModalOpen(false); // 블러 시 모달 닫기
    }, 100);
  };
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => {
        const isInvalidValue = field.value <= (min?.value ?? -1) || field.value > (max?.value ?? Infinity);
        const warningMessage = field.value <= (min?.value ?? -1) ? (min?.ment ?? "") : (max?.ment ?? "");

        // 키보드 입력 이벤트
        // const handleKeyPress = (key: string) => {
        //   if (key === "⌫") {
        //     field.onChange(Math.floor(field.value / 10));
        //   } else if (key === "00") {
        //     field.onChange(Math.min(field.value * 100, 210000));
        //   } else {
        //     const numKey = parseInt(key, 10);
        //     if (!isNaN(numKey)) {
        //       const currentValue = field.value || 0;
        //       const newValue = currentValue * 10 + numKey;
        //       field.onChange(Math.min(newValue, 99999999));
        //     }
        //   }
        // };
        return (
          <div className={cx("input-container")}>
            <Input
              error={isInvalidValue ? true : false}
              value={field.value}
              onChange={field.onChange}
              warningMessage={warningMessage}
              onFocus={onFocus}
              onBlur={handleBlur}
              ref={field.ref}
              // {...field}
            />
            {/* {isKeyboardModalOpen && (
              <KeyboardModal className={cx("keyboard-container")} onKeyPress={handleKeyPress} keyboardHeight={20} />
            )} */}
          </div>
        );
      }}
    />
  );
};

export default InputController;
