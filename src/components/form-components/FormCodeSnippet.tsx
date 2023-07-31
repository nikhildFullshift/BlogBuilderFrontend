
import { Controller, useFormContext } from "react-hook-form";
import { Container, TextField } from "@mui/material";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { FormInputDropdown } from "./FormInputDropdown";

interface FormInputProps {
  name: string;
  control: any;
  setValue?: any;
}

// function handleEditorChange(value, event) {
//   console.log('here is the current model value:', value);
// }

const languageOptions = [
  {
    label: "Java",
    value: "java",
  },
  {
    label: "Javascript",
    value: "javscript",
  },
  {
    label: "Typescript",
    value: "typescript",
  },
];

export const FormCodeSnippet = ({
  name,
  control,
  setValue,
}: FormInputProps) => {
  const [language, setLanguage] = useState('typescript');



  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <Container>
          <FormInputDropdown
            styles={{ width: "30%" }}
            name="lang"
            control={control}
            label="Select language"
            options={languageOptions}
          />
          <Editor
            height="70vh"
            language={language}
            defaultLanguage="typescript"
            defaultValue="// add your code here"
            onChange={onChange}
            theme="vs-dark"
            width="100%"
          />
        </Container>
      )}
    />
  );
};

export default FormCodeSnippet