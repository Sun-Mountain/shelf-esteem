import { ChangeEvent, useState } from "react";
import { TextField as MuiTextField } from "@mui/material";

interface TextFieldProps {
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  label?: string;
  multiline?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  maxRows?: number;
  sizes?: 'small' | 'medium' | 'large';
  type?: text | password | number | search;
}

const TextField = ({
  defaultValue = '',
  disabled = false,
  error = false,
  focused = false,
  fullWidth = true,
  helperText = '',
  label = '',
  multiline = false,
  placeholder = '',
  readOnly = false,
  required = false,
  rows,
  maxRows,
  sizes = 'medium',
  type = 'text',
}: TextFieldProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <MuiTextField
      defaultValue={value}
      disabled={disabled}
      error={error}
      focused={focused}
      fullWidth={fullWidth}
      helperText={helperText}
      label={label}
      multiline={multiline}
      placeholder={placeholder}
      required={required}
      rows={rows}
      maxRows={maxRows}
      size={sizes}
      type={type}
      InputProps={{ readOnly: readOnly }}
      onChange={handleChange}
    />
  )
}

export default TextField;