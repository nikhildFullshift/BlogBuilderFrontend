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
          <Button variant="contained" color="success">
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
            Submit
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
          <FormInputText name="new-title" control={control} label="Title" />
          <TextareaAutosize
            placeholder="Your blog will appear here!"
            style={{ width: "100%" }}
            minRows={20}
          />
          <Tag />
        </Container>
      </Container>
    </Paper>
  );
}
