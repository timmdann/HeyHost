import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "link" | "outline";
  children: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...rest }, ref) => {
    const variantClass =
      variant === "primary"
        ? "ui-button--primary"
        : variant === "outline"
        ? "ui-button--outline"
        : "ui-button--link";

    return (
      <button
        ref={ref}
        className={`ui-button ${variantClass} ${className}`.trim()}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
