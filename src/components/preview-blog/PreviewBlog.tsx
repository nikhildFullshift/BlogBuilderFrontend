import { Container, createTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Blogcontext } from "../../App";
import { FormInputText } from "../form-components/FormInputText";
import { FormTag } from "../form-components/FormTag";
import { FormTextArea } from "../form-components/FormTextArea";
import NextPrevFormButton from "../next-prev/NextPrevFormButton";
import { useNavigate } from "react-router-dom";
import Axios from "../../middleware/axiosConfig"

const API_URL = "http://localhost:3000";

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

function PreviewBlog() {
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
  const { handleSubmit, control, setValue } = methods;
  const { state } = useContext(Blogcontext);

  const { userId } = JSON.parse(localStorage.getItem('role'));
  const navigate = useNavigate();

  async function saveBlog(url: string, body: Object): Promise<any> {
    // TODO: remove any and write proper response structure
    let response = Axios.post(url, body).then((result:any) => {
        return result.data;
      }
    )
    return response;
  }

  const handleSendToReview = async (data: IFormInput, saveAsDraft) => {
    try {
      const { blogTitleInput, mdEditorContent, tags } = data;
      if (!blogTitleInput || !mdEditorContent) {
        throw new Error("Title/Content cannot be empty");
      }
      const parsedTags = tags.map((item: any) => item.text);
      const body = {
        title: blogTitleInput,
        description: mdEditorContent,
        tags: parsedTags,
        saveAsDraft,
        author_id: userId,
      };

      let response;
        response = await saveBlog(`${API_URL}/blog/create`, body);
        navigate("/blog/list");
      return response;
    } catch (error) {
      console.log("handleSendToReview error", error);
    }
  };

  useEffect(() => {
    setValue("blogTitleInput", state.result.title);
    setValue("mdEditorContent", state.result.description);
  },[])

  return (
    <>
      <NextPrevFormButton handleSubmit={handleSubmit(handleSendToReview)} />
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
    </>
  );
}

export default PreviewBlog;
