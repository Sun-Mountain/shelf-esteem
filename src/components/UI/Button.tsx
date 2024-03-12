'use client';

import { MouseEventHandler, MouseEvent } from 'react';
import { ReactNode } from 'react';
import { Button as MuiButton} from '@mui/material';

interface ButtonProps {
  children: ReactNode;
  buttonAction?: MouseEventHandler<HTMLButtonElement> | undefined;
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'inherit' | 'accent' | 'default';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large'; 
  type?: 'button' | 'submit' | 'link';
  variant?: 'contained' | 'outlined' | 'text';
}

const Button = ({
  children,
  buttonAction,
  color = 'accent',
  disabled = false,
  size = 'medium',
  type = 'button',
  variant = 'contained',
}: ButtonProps) => {

  function handleOnClick (e: MouseEvent<HTMLButtonElement>) {
    if (buttonAction) buttonAction(e);
  };

  return (
    <MuiButton
      disabled={disabled}
      onClick={handleOnClick}
      size={size}
      type={type}
      variant={variant}
    >
      {children}
    </MuiButton>
  )
}

export default Button;