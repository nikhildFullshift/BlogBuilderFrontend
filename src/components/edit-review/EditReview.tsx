import { Container, createTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormInputText } from "../form-components/FormInputText";
import { FormTag } from "../form-components/FormTag";
import { FormTextArea } from "../form-components/FormTextArea";

const BASE_URL = "http://localhost:3000";

interface IFormInput {
  optionsCheckBoxValue: string[];
  dropdownValue: string;
  titleInputTextValue: string;
  descriptionInputTextValue: string;
  codeSnippetTextArea: string;
  blogTitleInput: string;
  blogContentInput: string;
  mdEditorContent: string;
  tags: string[];
  articleTone: string;
  articleSize: string;
  articleDomain: string;
}

const defaultValues = {
  optionsCheckBoxValue: [],
  articleSize: "",
  articleTone: "",
  titleInputTextValue: "",
  descriptionInputTextValue: "",
  codeSnippetTextArea: "",
  blogTitleInput: "",
  mdEditorContent: "",
  tags: [],
  articleDomain: "",
};
function EditReview(props: any) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;

  const handleSendToReview = async (data: IFormInput) => {
    console.log("data", data);
    const { blogTitleInput, mdEditorContent, tags } = data;
    const parsedTags = tags.map((item: any) => item.text);
    async function saveBlog(url: string, config: RequestInit): Promise<any> {
      // TODO: remove any and write proper response structure
      const response = await fetch(url, config);
      return await response.json();
    }

    const body = JSON.stringify({
      title: blogTitleInput,
      description: mdEditorContent,
      tags: parsedTags,
    });
    console.log("body =>", body);
    // return
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };
    const response = await saveBlog(`${BASE_URL}/blog/create`, config);
    console.log(
      "🚀 ~ file: FormCreateBlog.tsx:108 ~ handleSendToReview ~ response:",
      response
    );
  };
  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "90vh",
        justifyContent: "space-evenly",
        [theme.breakpoints.down("sm")]: {
          height: "75vh",
        },
        [theme.breakpoints.up("md")]: {
          height: "85vh",
        },
        [theme.breakpoints.up(1350)]: {
          height: "74vh",
        },
      }}
    >
      <FormInputText name="blogTitleInput" control={control} label="Title" />
      <FormTextArea
        name="mdEditorContent"
        placeholder="Your blog will appear here!"
        style={{
          width: "100%",
          overflowY: "auto",
          height: "100%",
        }}
        control={control}
      />
      <FormTag name="tags" control={control} setValue={setValue} />
    </Container>
  );
}

export default EditReview;
