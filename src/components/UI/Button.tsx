'use client';

import { Button as MuiButton } from "@mui/material-next";

interface ButtonProps {
  buttonAction?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: 'button' | 'submit';
  variant?: 'text' | 'outlined' | 'filled' | 'filledTonal' | 'elevated';
}

const Button = ({
  children,
  buttonAction,
  type = 'button',
  variant = 'filled',
  ...props
}: ButtonProps) => {

  function handleOnClick (e: MouseEvent<HTMLButtonElement>) {
    if (buttonAction) buttonAction(e);
  };

  return (
    <MuiButton
      onClick={handleOnClick}
      type={type}
      variant={variant}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export default Button