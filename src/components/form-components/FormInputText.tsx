import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

export const FormInputText = ({
  name,
  control,
  label,
  setValue,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={setValue || value}
          fullWidth
          label={label}
          variant="outlined"
          className="blog-input"
        />
      )}
    />
  );
};
