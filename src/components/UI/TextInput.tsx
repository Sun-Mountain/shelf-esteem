import { useState } from 'react';
import { FormControl } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';

interface TextInputProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  type?: 'text' | 'password' | 'email';
  varient?: 'standard' | 'outlined' | 'filled';
}

const TextInput = ({
  label,
  defaultValue,
  id,
  onChange,
  type = 'text',
  varient = 'outlined',
  ...props
}: TextInputProps) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e)
  };

  return (
    <FormControl fullWidth>
      <MuiTextField
        defaultValue={value}
        id={id}
        label={label}
        type={type}
        variant={varient}
        onChange={handleChange}
        {...props}
      />
    </FormControl>
  )
}

export default TextInput;