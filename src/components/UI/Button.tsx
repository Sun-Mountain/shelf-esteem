import { Button as MuiButton } from "@mui/material-next";

interface ButtonProps {
  variant?: 'text' | 'outlined' | 'filled' | 'filledTonal' | 'elevated';
}

const Button = ({
  children,
  variant = 'filled',
  ...props
}: ButtonProps) => {
  return (
    <MuiButton variant={variant}>
      {children}
    </MuiButton>
  )
}

export default Button