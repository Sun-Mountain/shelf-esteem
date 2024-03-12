import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

interface FormTextFieldProps {
  label: string;
  name: string;
  type?: "text" | "password" | "number";
}

const FormTextField = ({
  name,
  label,
  type = "text",
}) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          error={!!error}
          fullWidth
          helperText={error ? error.message : null}
          onChange={onChange}
          label={label}
          type={type}
          value={value || ""}
          variant="outlined"
        />
      )}
    />
  )
}

export default FormTextField