import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { OptionItem, OptionsType } from "@/models";
import Badge from "@/components/shared/Badge";

import styles from "@/pages/CalculatorPage/CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  options?: OptionItem[] | OptionsType;
}

const SelectController = <ControlType extends FieldValues>({ formFieldName, control, options }: Props<ControlType>) => {
  const isOptionItemArray = (options: OptionItem[] | OptionsType | undefined): options is OptionItem[] => {
    return Array.isArray(options);
  };
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
              options?.map(({ label, value }) => (
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

export default SelectController;
