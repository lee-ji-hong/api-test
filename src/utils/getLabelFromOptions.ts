export const getLabelFromOptions = (value: string | number, options: { label: string; value: string | number }[]) => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : value;
};
