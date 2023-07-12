import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextareaAutosize } from "@mui/material";

interface FormInputProps {
  name: string;
  control: any;
  placeholder: string;
  setValue?: any;
  style?: object
  minRows?: number
  maxRows?: number
}

export const FormTextArea = ({ name, control, placeholder, style, minRows, maxRows }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        // <TextField
        //   helperText={error ? error.message : null}
        //   size="small"
        //   error={!!error}
        //   onChange={onChange}
        //   value={value || ''}
        //   fullWidth
        //   label={label}
        //   variant="outlined"
        // />
        <TextareaAutosize
          // name="codeSnippetTextArea"
          placeholder={placeholder}
          style={style}
          onChange={onChange}
          value={value || ''}
          maxRows={maxRows}
          minRows={minRows}
        />
      )}
    />
  );
};