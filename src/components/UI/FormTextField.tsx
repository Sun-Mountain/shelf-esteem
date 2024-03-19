import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

interface FormTextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  required?: boolean;
  type?: "text" | "password" | "number";
}

const FormTextField = ({
  name,
  label,
  helperText,
  required = false,
  type = "text",
}: FormTextFieldProps) => {
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
          helperText={helperText}
          onChange={onChange}
          label={label}
          required={required}
          type={type}
          value={value || ""}
          variant="outlined"
        />
      )}
    />
  )
}

export default FormTextField