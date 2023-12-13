import { Controller } from "react-hook-form";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import MDEditor, { commands } from "@uiw/react-md-editor";

interface FormInputProps {
  name: string;
  control: any;
  placeholder: string;
  setValue?: any;
  style?: object;
  minRows?: number;
  maxRows?: number;
  label?: string;
}

export const FormTextArea = ({
  name,
  control,
  placeholder,
  style,
  minRows,
  maxRows,
  setValue,
  label,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, name },
        fieldState: { error },
        formState,
      }) => {
        return name == "mdEditorContent" ? (
          <MDEditor
            height={"300px"}
            style={style}
            value={value || ""}
            onChange={onChange}
            preview="preview"
          />
        ) : (
          <TextField
            name={name}
            label={label}
            placeholder={placeholder}
            style={style}
            onChange={onChange}
            value={value || ""}
            multiline
            maxRows={maxRows}
            minRows={minRows}
            margin="normal"
            className="blog-input"
          />
        );
      }}
    />
  );
};
