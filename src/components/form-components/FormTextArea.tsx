import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextareaAutosize } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

interface FormInputProps {
  name: string;
  control: any;
  placeholder: string;
  setValue?: any;
  style?: object;
  minRows?: number;
  maxRows?: number;
}

export const FormTextArea = ({
  name,
  control,
  placeholder,
  style,
  minRows,
  maxRows,
  setValue,
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
          />
        ) : (
          <TextareaAutosize
            name="codeSnippetTextArea"
            placeholder={placeholder}
            style={style}
            onChange={onChange}
            value={value || ""}
            maxRows={maxRows}
            minRows={minRows}
          />
        );
      }}
    />
  );
};
