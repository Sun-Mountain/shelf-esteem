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
  onClick?: () => void;
}

const ButtonUI = ({
  children,
  type = "button",
  disabled = false,
  href,
  className,
  variant = "contained",
  onClick
}: ButtonProps) => {

  function handleOnClick() {
    if (onClick) onClick();
  }

  return (
    <Button
      disabled={disabled}
      type={type}
      href={href}
      className={className}
      variant={variant}
      onClick={handleOnClick}
    >
      {children}
    </Button>
  )
}

ButtonUI.displayName = "Button"

export { ButtonUI }
