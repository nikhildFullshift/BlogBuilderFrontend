import { useForm } from "react-hook-form";
import { FormInputText } from "./form-components/FormInputText";
import { FormInputMultiCheckbox } from "./form-components/FormInputMultiCheckbox";
import { FormInputDropdown } from "./form-components/FormInputDropdown";
import { Button, Container, Paper, Typography } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import Tag from "./tag/Tag";
import { FormTextArea } from "./form-components/FormTextArea";

interface IFormInput {
  optionsCheckBoxValue: string[];
  dropdownValue: string;
  titleInputTextValue: string,
  descriptionInputTextValue: string,
  codeSnippetTextArea: string,
}

const defaultValues = {
  optionsCheckBoxValue: [],
  dropdownValue: "",
  titleInputTextValue: "",
  descriptionInputTextValue: "",
  codeSnippetTextArea: ""
};

export default function FormCreateBlog() {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = async (data: IFormInput) => {
    const { codeSnippetTextArea,
      descriptionInputTextValue,
      dropdownValue,
      optionsCheckBoxValue,
      titleInputTextValue,
    } = data;

    console.log(data, codeSnippetTextArea,
      descriptionInputTextValue,
      dropdownValue,
      optionsCheckBoxValue,
      titleInputTextValue,);

    async function generateBlog(
      url: string,
      config: RequestInit
    ): Promise<any> { // TODO: by Nikhil remove any and write proper response structure
      const response = await fetch(url, config);
      return await response.json();
    }
    console.log("generation config");

    const body = JSON.stringify({
      title: titleInputTextValue,
      description: descriptionInputTextValue,
      codeSnippet: codeSnippetTextArea,
      // optional:
    });
    console.log("body", body);


    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    }
    const response = await generateBlog("https://0683-2405-201-a014-ba3b-7c9f-8a91-bc56-aee4.ngrok-free.app/openai/generate", config);
    console.log("🚀 ~ file: FormCreateBlog.tsx:64 ~ onSubmit ~ response:", response)


  };

  return (
    <Paper
      style={{
        display: "flex",
        padding: "20px",
        width: "70vw",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          justifyContent: "space-around",
          alignItems: "space-around",
        }}
      >
        <Typography variant="h6"> Create Blog</Typography>
        <FormInputText name="titleInputTextValue" control={control} label="Blog Title" />
        <FormInputText
          name="descriptionInputTextValue"
          control={control}
          label="Description"
        />
        <FormTextArea
          name="codeSnippetTextArea"
          placeholder="Enter code snippet here"
          control={control}
          maxRows={10}
          minRows={10}
        />
        <FormInputDropdown
          name="dropdownValue"
          control={control}
          label="Dropdown Input"
        />
        <FormInputMultiCheckbox
          control={control}
          setValue={setValue}
          name={"optionsCheckBoxValue"}
          label={"Checkbox Input"}
        />
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
          {" "}
          Submit{" "}
        </Button>
        <Button onClick={() => reset()} variant={"outlined"}>
          {" "}
          Reset{" "}
        </Button>
      </Container>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          justifyContent: "space-evenly",
        }}
      >
        <FormInputText name="new-title" control={control} label="Title" />
        <FormTextArea
          name="blogContent"
          placeholder="Your blog will appear here!"
          style={{ width: "100%" }}
          minRows={20}
          control={control}
        />
        <Tag />
      </Container>
    </Paper>
  );
}
