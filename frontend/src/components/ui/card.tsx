import React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <div className={`ui-card ${className}`} {...rest}>
    {children}
  </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <div className={`ui-card__header ${className}`} {...rest}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <h3 className={`ui-card__title ${className}`.trim()} {...rest}>
    {children}
  </h3>
);

export const CardDescription: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, className = "", ...rest }) => (
  <div className={`ui-card__description ${className}`.trim()} {...rest}>
    {children}
  </div>
);

export const CardAction: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <div className={`ui-card__action ${className}`.trim()} {...rest}>
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <div className={`ui-card__content ${className}`} {...rest}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <div className={`ui-card__footer ${className}`} {...rest}>
    {children}
  </div>
);

export default Card;
