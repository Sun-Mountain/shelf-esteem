import { ReactNode } from 'react';
import { Button as MuiButton } from '@material-ui/core';

interface ButtonProps {
  children: ReactNode;
  ariaLabel: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success';
  disabled?: boolean;
  link?: string;
  size?: 'small' | 'medium' | 'large';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
}

const Button = ({
  children,
  ariaLabel,
  color = 'primary',
  disabled = false,
  link,
  size = 'medium',
  startIcon,
  endIcon,
  variant = 'contained',
}: ButtonProps) => {

  const handleOnClick = () => {
    console.log('Button clicked');
  }

  return (
    <MuiButton
      aria-label={ariaLabel}
      color={color}
      disabled={disabled}
      href={link}
      onClick={handleOnClick}
      size={size}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </MuiButton>
  )
}

export default Button;