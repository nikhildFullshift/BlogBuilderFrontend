import { Controller } from "react-hook-form";
import { Container, TextField } from "@mui/material";
import { Editor } from "@monaco-editor/react";

interface FormInputProps {
  name: string;
  control: any;
  setValue?: any;
  language: string;
}

// function handleEditorChange(value, event) {
//   console.log('here is the current model value:', value);
// }

export const FormCodeSnippet = ({
  name,
  control,
  setValue,
  language,
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
        <Editor
          height="70vh"
          language={language}
          defaultLanguage="typescript"
          defaultValue="// add your code here"
          onChange={onChange}
          theme="vs-dark"
          width="100%"
        />
      )}
    />
  );
};

export default FormCodeSnippet;
