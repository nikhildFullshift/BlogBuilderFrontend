import { Container, createTheme } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Blogcontext } from "../../App";
import { FormInputText } from "../form-components/FormInputText";
import { FormTag } from "../form-components/FormTag";
import { FormTextArea } from "../form-components/FormTextArea";
import NextPrevFormButton from "../next-prev/NextPrevFormButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
  const { state, dispatch } = useContext(Blogcontext);
  const { blogId, versionId } = useParams();

  const { role, userId } = state;
  const navigate = useNavigate();

  async function saveBlog(url: string, config: RequestInit): Promise<any> {
    // TODO: remove any and write proper response structure
    const response = await fetch(url, config);
    return await response.json();
  }

  const handleSendToReview = async (data: IFormInput, saveAsDraft) => {
    try {
      const { blogTitleInput, mdEditorContent, tags } = data;
      if (!blogTitleInput || !mdEditorContent) {
        throw new Error("Title/Content cannot be empty");
      }
      const parsedTags = tags.map((item: any) => item.text);
      const body = JSON.stringify({
        title: blogTitleInput,
        description: mdEditorContent,
        tags: parsedTags,
        saveAsDraft,
        blogId,
        author_id: userId,
      });

      let response;
      if (versionId) {
        const config = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        };
        response = await saveBlog(
          `${API_URL}/version/update/${versionId}`,
          config
        );
      } else {
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        };
        response = await saveBlog(`${API_URL}/blog/create`, config);
      }
      return response;
    } catch (error) {
      console.log("handleSendToReview error", error);
    }
  };

  useEffect(() => {
    fetch(
      `${
        versionId
          ? API_URL + "/blog/" + blogId + "?version=" + versionId
          : API_URL + "/blog/" + blogId
      }`
    )
      .then((res) => res.json())
      .then((result) => {
        setValue("blogTitleInput", result.result.title);
        setValue("mdEditorContent", result.result.description);
        setValue("tags", result.result.tags);
      })
      .catch((err) => {
        navigate("/blog/list");
        console.log(err);
      });
  }, []);

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

export default EditReview;
