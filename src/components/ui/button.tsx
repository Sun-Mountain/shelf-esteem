'use client';

import { MouseEventHandler, ReactNode } from "react";
import Button from '@mui/material/Button';

export interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
  className?: string;
  color?: "secondary" | "success" | "error";
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  startIcon?: ReactNode;
  buttonAction?: MouseEventHandler<HTMLButtonElement> | undefined;
  testId?: string;
}

const ButtonUI = ({
  children,
  type = "button",
  disabled = false,
  href,
  className,
  color,
  variant = "contained",
  size,
  startIcon,
  buttonAction,
  testId
}: ButtonProps) => {

  function handleOnClick(e: any) {
    if (buttonAction) buttonAction(e);
  }

  return (
    <Button
      disabled={disabled}
      type={type}
      href={href}
      className={className}
      color={color}
      size={size}
      variant={variant}
      startIcon={startIcon}
      onClick={handleOnClick}
      data-testid={testId}
    >
      {children}
    </Button>
  )
}

ButtonUI.displayName = "Button"

export { ButtonUI as Button }
