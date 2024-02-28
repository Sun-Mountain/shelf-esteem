import { Button as MuiButton } from "@mui/material-next";

interface ButtonProps {
  variant?: 'text' | 'outlined' | 'filled' | 'filledTonal' | 'elevated';
  type?: 'button' | 'submit';
}

const Button = ({
  children,
  type = 'button',
  variant = 'filled',
  ...props
}: ButtonProps) => {
  return (
    <MuiButton type={type} variant={variant}>
      {children}
    </MuiButton>
  )
}

export default Button