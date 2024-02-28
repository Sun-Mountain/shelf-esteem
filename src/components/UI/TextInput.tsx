import { FormControl } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';

interface TextInputProps {
  id: string;
  label: string;
  defaultValue?: string;
  type?: 'text' | 'password' | 'email';
  varient?: 'standard' | 'outlined' | 'filled';
}

const TextInput = ({
  label,
  defaultValue,
  id,
  type = 'text',
  varient = 'outlined',
  ...props
}: TextInputProps) => {

  return (
    <FormControl fullWidth>
      <MuiTextField

        defaultValue={defaultValue}
        id={id || undefined}
        label={label}
        type={type}
        variant={varient}
        {...props}
      />
    </FormControl>
  )
}

export default TextInput;