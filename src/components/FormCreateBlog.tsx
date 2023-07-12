import { useForm } from "react-hook-form";
import { FormInputText } from "./form-components/FormInputText";
import { FormInputMultiCheckbox } from "./form-components/FormInputMultiCheckbox";
import { FormInputDropdown } from "./form-components/FormInputDropdown";
import { Button, Container, Paper, Typography } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import Tag from "./tag/Tag";

interface IFormInput {
  checkboxValue: string[];
  dropdownValue: string;
}

const defaultValues = {
  checkboxValue: [],
  dropdownValue: "",
  inputTextValue: "",
};

export default function FormCreateBlog() {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

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
        <FormInputText name="title" control={control} label="Blog Title" />
        <FormInputText
          name="description"
          control={control}
          label="Description"
        />
        <TextareaAutosize
          placeholder="Enter code snippet here"
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
          name={"checkboxValue"}
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
        <TextareaAutosize
          placeholder="Your blog will appear here!"
          style={{ width: "100%" }}
          minRows={20}
        />
        <Tag />
      </Container>
    </Paper>
  );
}
