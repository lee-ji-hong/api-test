import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { OptionItem, OptionsType, sendLtvCalcRequest } from "@/models";
import { ltvCalcState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

import Badge from "@/components/shared/Badge";
import styles from "@/pages/CalculatorPage/CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  options?: OptionItem[] | OptionsType;
}

const HouseTypeController = <ControlType extends FieldValues>({
  formFieldName,
  control,
  options,
}: Props<ControlType>) => {
  const isOptionItemArray = (options: OptionItem[] | OptionsType | undefined): options is OptionItem[] => {
    return Array.isArray(options);
  };
  const ltvOptions = useRecoilValue<sendLtvCalcRequest>(ltvCalcState);

  const filteredOptions =
    isOptionItemArray(options) &&
    (ltvOptions.loanPurpose === "LIVING_STABILITY" ? options.slice(5, 7) : options.slice(0, 5));
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => {
        const handleSelect = (value: boolean | string | number) => {
          field.onChange(value);
        };

        return (
          <div className={cx("button-container")}>
            {isOptionItemArray(options) &&
              filteredOptions?.map(({ label, value }) => (
                <Badge
                  className={cx("button")}
                  key={value.toString()}
                  title={label}
                  onClick={() => handleSelect(value)}
                  theme={field.value === value ? "blue" : "primary"}
                />
              ))}
          </div>
        );
      }}
    />
  );
};

export default HouseTypeController;
