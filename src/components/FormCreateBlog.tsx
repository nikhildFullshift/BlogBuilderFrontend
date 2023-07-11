import { useForm } from 'react-hook-form';
import { FormInputText } from './form-components/FormInputText';
import { FormInputMultiCheckbox } from './form-components/FormInputMultiCheckbox';
import { FormInputDropdown } from './form-components/FormInputDropdown';
import { Button, Paper, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base';

interface IFormInput {
  checkboxValue: string[];
  dropdownValue: string;
}

const defaultValues = {
  checkboxValue: [],
  dropdownValue: '',
  inputTextValue: ''

};

export default function FormCreateBlog() {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <Paper
      style={{
        display: 'grid',
        gridRowGap: '20px',
        padding: '20px',
        margin: '10px 300px',
      }}
    >
      <Typography variant="h6"> Create Blog</Typography>
      <FormInputText name="title" control={control} label="Blog Title" />
      <FormInputText name="description" control={control} label="Description" />
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
      <TextareaAutosize style={{background: 'white', color: "black"}} maxRows={20} minRows={20} />
    </Paper>
  );
};