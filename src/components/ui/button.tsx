import { ReactNode } from "react";
import Button from '@mui/material/Button';

export interface ButtonProps {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  disabled: boolean;
  href?: string;
  className?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
}

const ButtonUI = ({
  children,
  type = "button",
  disabled = false,
  href,
  className,
  variant = "contained",
}: ButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type={type}
      href={href}
      className={className}
      variant={variant}
    >
      {children}
    </Button>
  )
}

ButtonUI.displayName = "Button"

export { ButtonUI }
