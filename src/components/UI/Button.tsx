import { ReactNode } from 'react';
import { Button as MuiButton} from '@mui/material';

interface ButtonProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'inherit' | 'accent' | 'default';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large'; 
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
}

const Button = ({
  children,
  color = 'accent',
  disabled = false,
  size = 'medium',
  type = 'button',
  variant = 'contained',
}: ButtonProps) => {
  return (
    <MuiButton
      color={color}
      disabled={disabled}
      size={size}
      type={type}
      variant={variant}
    >
      {children}
    </MuiButton>
  )
}

export default Button;