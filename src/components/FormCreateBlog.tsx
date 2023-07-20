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
import { FormTextArea } from "./form-components/FormTextArea";
import { FormTag } from "./form-components/FormTag";
import { useEffect, useState } from "react";


const BASE_URL = 'https://eeb1-2405-201-a014-b83b-f95e-65e8-1698-6304.ngrok-free.app';
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
  articleDomain: ""
};

export default function FormCreateBlog() {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  // const [inputFields, setInputFields] = useState([]);
  const [inputFields, setInputFields] = useState([]);

  const onSubmit = async (data: IFormInput) => {
    const {
      codeSnippetTextArea,
      descriptionInputTextValue,
      articleSize,
      articleTone,
      optionsCheckBoxValue,
      titleInputTextValue,
    } = data;
    async function generateBlog(
      url: string,
      config: RequestInit
    ): Promise<any> {
      // TODO: by Nikhil remove any and write proper response structure
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body
    }
    const response = await generateBlog(`${BASE_URL}/openai/generate`, config);
    console.log("🚀 ~ file: FormCreateBlog.tsx:64 ~ onSubmit ~ response:", response);
    const { title, description } = response;
    setValue("blogTitleInput", title);
    setValue("mdEditorContent", description);
  };

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


  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true"
          },
        };

        const response = await fetch(`${BASE_URL}/optional`, config);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        console.log("🚀 ~ file: FormCreateBlog.tsx:139 ~ getData ~ actualData:", actualData)
        setInputFields(actualData?.result);
      } catch (err) {
        // setError(err.message);
        setInputFields([]);
        console.log("Catch error", err);
      } finally {
        // setLoading(false);
      }
    }
    getData()
  }, [])

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
          <Button
            variant="contained"
            color="success"
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
          <FormInputText
            name="titleInputTextValue"
            control={control}
            label="Blog Title"
          />
          <FormTextArea
            name="descriptionInputTextValue"
            placeholder="Enter description here"
            control={control}
            maxRows={8}
            minRows={8}
          />
          <FormTextArea
            name="codeSnippetTextArea"
            placeholder="Enter code snippet here"
            control={control}
            maxRows={8}
            minRows={8}
          />
          {inputFields.map((inputField: any, index) => {
            console.log("Value is:", inputField);
            switch (inputField.type) {
              case "Dropdown":
                const dropdown = <FormInputDropdown
                  key={index}
                  name={inputField.name}
                  control={control}
                  label={inputField.label}
                  options={inputField.values}
                />
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
          <FormInputText
            name="blogTitleInput"
            control={control}
            label="Title"
          />
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
        </Container >
      </Container >
    </Paper >
  );
}
