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

export const FormTextArea = ({ name, control, placeholder, style, minRows, maxRows, setValue }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextareaAutosize
          // name="codeSnippetTextArea"
          placeholder={placeholder}
          style={style}
          onChange={onChange}
          value={setValue || value}
          maxRows={maxRows}
          minRows={minRows}
        />
      )}
    />
  );
};