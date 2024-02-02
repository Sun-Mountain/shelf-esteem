'use client';

import { MouseEventHandler, ReactNode } from "react";
import Button from '@mui/material/Button';

export interface ButtonProps {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  disabled: boolean;
  href?: string;
  className?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  buttonAction?: MouseEventHandler<HTMLButtonElement> | undefined;
  testId?: string;
}

const ButtonUI = ({
  children,
  type = "button",
  disabled = false,
  href,
  className,
  variant = "contained",
  buttonAction,
  testId
}: ButtonProps) => {

  function handleOnClick() {
    if (buttonAction) buttonAction();
  }

  return (
    <Button
      disabled={disabled}
      type={type}
      href={href}
      className={className}
      variant={variant}
      onClick={handleOnClick}
      data-testid={testId}
    >
      {children}
    </Button>
  )
}

ButtonUI.displayName = "Button"

export { ButtonUI as Button }
