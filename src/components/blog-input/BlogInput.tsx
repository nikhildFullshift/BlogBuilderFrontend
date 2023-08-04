import { Button, Container, createTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Blogcontext } from "../../App";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { FormInputText } from "../form-components/FormInputText";
import { FormTextArea } from "../form-components/FormTextArea";
import NextPrevFormButton from "../next-prev/NextPrevFormButton";
import BackdropLoader from "../loader/BackdropLoader";
import FormCodeSnippet from "../form-components/FormCodeSnippet";

const BASE_URL = "http://localhost:3000";

interface IFormInput {
  optionsCheckBoxValue: string[];
  dropdownValue: string;
  titleInputTextValue: string;
  instructionInputTextValue: string;
  codeSnippetTextArea: string;
  blogTitleInput: string;
  blogContentInput: string;
  mdEditorContent: string;
  tags: string[];
  articleTone: string;
  articleSize: string;
  articleDomain: string;
  language: string;
}

const defaultValues = {
  optionsCheckBoxValue: [],
  articleSize: "",
  articleTone: "",
  titleInputTextValue: "",
  instructionInputTextValue: "",
  codeSnippetTextArea: "",
  blogTitleInput: "",
  mdEditorContent: "",
  tags: [],
  articleDomain: "",
  language: "",
};

const languageOptions = [
  {
    label: "Java",
    value: "java",
  },
  {
    label: "Javascript",
    value: "javascript",
  },
  {
    label: "Typescript",
    value: "typescript",
  },
];

function BlogInput(props: any) {
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
  const { handleSubmit, reset, control, register, watch } = methods;
  const language = watch("language");
  const [inputFields, setInputFields] = useState([]);
  const { state, dispatch } = useContext(Blogcontext);
  const [loader, setLoader] = useState(false);

  const handleLoaderClose = () => {
    setLoader(false);
  };

  const handleLoaderOpen = () => {
    setLoader(true);
  };

  async function generateBlog(url: string, config: RequestInit): Promise<any> {
    // TODO: by Nikhil remove any and write proper response structure
    const response = await fetch(url, config);
    return await response.json();
  }

  const onSubmit = async (data: IFormInput) => {
    const {
      codeSnippetTextArea,
      instructionInputTextValue,
      articleSize,
      articleTone,
      optionsCheckBoxValue,
      titleInputTextValue,
    } = data;
    dispatch({
      type: "UPDATE_BLOG_QUERY",
      payload: {
        title: titleInputTextValue,
        instruction: instructionInputTextValue,
        codeSnippet: codeSnippetTextArea,
      },
    });
    if (!titleInputTextValue || !codeSnippetTextArea) {
      throw new Error("Title/CodeSnippet is mandatory to fill");
    }
    handleLoaderOpen();
    const body = JSON.stringify({
      title: titleInputTextValue,
      instruction: instructionInputTextValue,
      codeSnippet: codeSnippetTextArea,
      optional: { tone: articleTone, articleSize },
    });
    console.log("body", body);
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    const response = await generateBlog(`${BASE_URL}/openai/generate`, config);
    console.log(
      "🚀 ~ file: FormCreateBlog.tsx:64 ~ onSubmit ~ response:",
      response
    );
    handleLoaderClose();
    const { title, description } = response;
    dispatch({ type: "UPDATE_BLOG_RESULT", payload: { title, description } });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        };

        const response = await fetch(`${BASE_URL}/optional`, config);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        console.log(
          "🚀 ~ file: FormCreateBlog.tsx:139 ~ getData ~ actualData:",
          actualData
        );
        setInputFields(actualData?.result);
      } catch (err) {
        // setError(err.message);
        setInputFields([]);
        console.log("Catch error", err);
      } finally {
        // setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "45rem",
            justifyContent: "space-around",
            flex: 1,
            maxWidth: "100%",
          }}
        >
          <FormInputText
            name="titleInputTextValue"
            control={control}
            label="Blog Title"
          />

          <FormTextArea
            label="Instruction"
            name="instructionInputTextValue"
            placeholder="Enter instruction here"
            control={control}
            maxRows={4}
            minRows={4}
          />
          {inputFields.map((inputField: any, index: number) => {
            switch (inputField.type) {
              case "Dropdown":
                const dropdown = (
                  <FormInputDropdown
                    key={index}
                    name={inputField.name}
                    control={control}
                    label={inputField.label}
                    options={inputField.values}
                  />
                );
                return dropdown;

              default:
                break;
            }
          })}
          {/* <FormInputMultiCheckbox
            control={control}
            setValue={setValue}
            name={"optionsCheckBoxValue"}
            label={"Checkbox Input"}
          /> */}
        </Container>
        <Container sx={{ flex: 3, maxWidth: "100%" }}>
          {/* <FormTextArea
            style={{ marginTop: "2.1rem", width: "100%" }}
            label="Code Snippet"
            name="codeSnippetTextArea"
            placeholder="Enter code snippet here"
            control={control}
            maxRows={25}
            minRows={25}
          /> */}
          <FormInputDropdown
            styles={{ width: "30%" }}
            name="language"
            control={control}
            label="Select language"
            options={languageOptions}
          />
          <FormCodeSnippet
            name="codeSnippetTextArea"
            control={control}
            language={language}
          />
        </Container>
      </Container>
      <NextPrevFormButton handleSubmit={handleSubmit(onSubmit)} />
      <BackdropLoader isOpen={loader} />
    </>
  );
}

export default BlogInput;
