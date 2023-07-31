import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
  styles,
  setValue,
  setLanguage,
}) => {
  const handleChange = (event: any) => {
    setValue("language", event.target.value);
    setLanguage(event.target.value);
  };

  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={"small"} sx={styles}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={label === "Select language" ? handleChange : onChange}
            label={label}
            value={value || ""}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
