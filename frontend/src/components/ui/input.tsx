import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input ref={ref} className={`ui-input ${className}`.trim()} {...props} />
    );
  }
);

Input.displayName = "Input";

export default Input;
