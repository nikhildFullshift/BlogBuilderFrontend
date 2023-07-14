import { useForm } from "react-hook-form";
import { FormInputText } from "./form-components/FormInputText";
import { FormInputMultiCheckbox } from "./form-components/FormInputMultiCheckbox";
import { FormInputDropdown } from "./form-components/FormInputDropdown";
import {
  Button,
  Container,
  createTheme,
  Paper,
  Typography,
} from "@mui/material";
import Tag from "./tag/Tag";
import { FormTextArea } from "./form-components/FormTextArea";
import { useState } from "react";
import { FormTag } from "./form-components/FormTag";


const BASE_URL = 'https://fcf0-2405-201-a014-bc33-9124-83ea-a717-4671.ngrok-free.app';
interface IFormInput {
  optionsCheckBoxValue: string[];
  articleSize: string;
  articleTone: string;
  titleInputTextValue: string,
  descriptionInputTextValue: string,
  codeSnippetTextArea: string,
  blogTitleInput: string,
  blogContentInput: string,
  tags: string[]
}

const defaultValues = {
  optionsCheckBoxValue: [],
  articleSize: "short",
  articleTone: "friendly",
  titleInputTextValue: "",
  descriptionInputTextValue: "",
  codeSnippetTextArea: "",
  blogTitleInput: "",
  blogContentInput: "",
  tags: []
};

export default function FormCreateBlog() {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;

  const onSubmit = async (data: IFormInput) => {
    const { codeSnippetTextArea,
      descriptionInputTextValue,
      articleSize,
      articleTone,
      optionsCheckBoxValue,
      titleInputTextValue,
    } = data;
    async function generateBlog(
      url: string,
      config: RequestInit
    ): Promise<any> { // TODO: remove any and write proper response structure
      const response = await fetch(url, config);
      return await response.json();
    }
    const body = JSON.stringify({
      title: titleInputTextValue,
      description: descriptionInputTextValue,
      codeSnippet: codeSnippetTextArea,
      optional: { "tone": articleTone, articleSize }
    });
    console.log("body", body);
    // return;
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    }
    const response = await generateBlog(`${BASE_URL}/openai/generate`, config);
    console.log("🚀 ~ file: FormCreateBlog.tsx:64 ~ onSubmit ~ response:", response);
    const { title, description } = response;
    setValue('blogTitleInput', title);
    setValue('blogContentInput', description);
  };


  const handleSendToReview = async (data: IFormInput) => {
    console.log("data", data)
    const { blogTitleInput, blogContentInput } = data;
    async function saveBlog(
      url: string,
      config: RequestInit
    ): Promise<any> { // TODO: remove any and write proper response structure
      const response = await fetch(url, config);
      return await response.json();
    }

    const body = JSON.stringify({
      title: blogTitleInput,
      description: blogContentInput
    });
    console.log("body =>", body);
    return
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    }
    const response = await saveBlog(`${BASE_URL}/blog/create`, config);
    console.log("🚀 ~ file: FormCreateBlog.tsx:108 ~ handleSendToReview ~ response:", response)
  }

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

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <Container
        sx={{
          display: "flex",
          padding: "0px 20px",
          marginBottom: "10px",
          width: "100%",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Container sx={{ flex: 1 }}>
          <Typography variant="h6"> Create Blog</Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "end",
          }}
        >
          <Button variant="contained" color="error">
            Move to Trash
          </Button>
          <Button variant="contained" color="success"
            onClick={handleSubmit(handleSendToReview)}
          >
            Send to Review
          </Button>
        </Container>
      </Container>
      <Container sx={{ display: "flex", flexWrap: "wrap" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "90vh",
            justifyContent: "space-around",
            flex: 1,
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
            name="articleSize"
            control={control}
            label="Blog size"
            options={[
              {
                label: "Short",
                value: "short",
              },
              {
                label: "Medium",
                value: "medium",
              },
              {
                label: "Long",
                value: "long",
              },
            ]}
          />
          <FormInputDropdown
            name="articleTone"
            control={control}
            label="Blog tone"
            options={[
              { label: "Friendly", value: "friendly" },
              { label: "Formal", value: "formal" },
            ]}
          />
          <FormInputMultiCheckbox
            control={control}
            setValue={setValue}
            name={"optionsCheckBoxValue"}
            label={"Checkbox Input"}
          />
          <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            Generate Blog
          </Button>
          <Button onClick={() => reset()} variant={"outlined"}>
            Reset
          </Button>
        </Container>
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
            name="blogContentInput"
            placeholder="Your blog will appear here!"
            style={{ width: "100%", overflowY: 'auto' }}
            minRows={30}
            maxRows={30}
            control={control}
          />
          <Tag />
          {/* <FormTag name="tags" label="tags" control={control}
          /> */}
        </Container>
      </Container>
    </Paper >
  );
}
