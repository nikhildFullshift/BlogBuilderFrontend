import { Button, Container, createTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Blogcontext } from "../../App";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { FormInputText } from "../form-components/FormInputText";
import { FormTextArea } from "../form-components/FormTextArea";
import NextPrevFormButton from "../next-prev/NextPrevFormButton";
import BackdropLoader from "../loader/BackdropLoader";

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
  const { handleSubmit, reset, control, setValue } = methods;
  const [inputFields, setInputFields] = useState([]);
  const { state, dispatch } = useContext(Blogcontext);
  const [loader, setLoader] = useState(false);

  const handleLoaderClose = () => {
    setLoader(false);
  };

  const handleLoaderOpen = () => {
    setLoader(true);
  };

  const onSubmit = async (data: IFormInput) => {
    handleLoaderOpen();

    const {
      codeSnippetTextArea,
      descriptionInputTextValue,
      articleSize,
      articleTone,
      optionsCheckBoxValue,
      titleInputTextValue,
    } = data;
    dispatch({
      type: "UPDATE_BLOG_QUERY",
      payload: {
        title: titleInputTextValue,
        description: descriptionInputTextValue,
      },
    });
    async function generateBlog(
      url: string,
      config: RequestInit
    ): Promise<any> {
      // TODO: by Nikhil remove any and write proper response structure
      const response = await fetch(url, config);
      return await response.json();
    }
    if (!titleInputTextValue || !descriptionInputTextValue) {
      throw new Error("Title/Description is mandatory to fill");
    }
    const body = JSON.stringify({
      title: titleInputTextValue,
      description: descriptionInputTextValue,
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "32rem",
        justifyContent: "space-around",
        flex: 1,
        [theme.breakpoints.down("sm")]: {
          height: "calc(32rem * 1.75)",
        },
        [theme.breakpoints.up("md")]: {
          height: "calc(32rem * 1.3)",
        },
        [theme.breakpoints.up(1350)]: {
          height: "34rem",
        },
      }}
    >
      <FormInputText
        name="titleInputTextValue"
        control={control}
        label="Blog Title"
      />
      <FormTextArea
        label="Code Snippet"
        name="codeSnippetTextArea"
        placeholder="Enter code snippet here"
        control={control}
        maxRows={4}
        minRows={4}
      />
      <FormTextArea
        label="Description"
        name="descriptionInputTextValue"
        placeholder="Enter description here"
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
      <NextPrevFormButton handleSubmit={handleSubmit(onSubmit)} />
      <BackdropLoader isOpen={loader} />
    </Container>
  );
}

export default BlogInput;
