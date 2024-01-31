import { ReactNode } from "react"

export interface ButtonProps {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
}

const Button = (
  ({ className, variant, size, children }, ref) => {
    return (
      <button>
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
