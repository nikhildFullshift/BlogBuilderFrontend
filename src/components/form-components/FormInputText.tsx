import { Controller } from "react-hook-form";
import { TextField, Typography } from "@mui/material";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  errors?: any;
}

export const FormInputText = ({
  name,
  control,
  label,
  setValue,
}: FormInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true, minLength: 10 }}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState: { errors },
        }) => (
          <>
            <TextField
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              onChange={onChange}
              value={setValue || value}
              fullWidth
              label={label}
              variant="outlined"
              margin="normal"
            />
            {errors[`${name}`] && (
              <Typography variant="body2">This field is required</Typography>
            )}
          </>
        )}
      />
    </>
  );
};
