import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <label className={`ui-label ${className}`.trim()} {...rest}>
      {children}
    </label>
  );
};

export default Label;
