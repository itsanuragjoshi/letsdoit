"use client";

import clsx from "clsx";

export const Button = ({
  variant = "solid",
  size = "medium",
  icon: Icon = null,
  text = "",
  positionIcon = "left",
  showIcon = true,
  showText = true,
  disabled = false,
  className,
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  const sizeStyles = {
    small: "px-3 py-1.5 text-sm rounded-sm",
    medium: "px-4 py-2 rounded-md",
    large: "px-6 py-3 text-lg rounded-lg",
  };

  const variantStyles = {
    solid: "bg-black text-white border border-black hover:bg-black-900 ",
    outline: "bg-white text-black border border-black-200 hover:bg-black-100 ",
    link: "bg-transparent text-black-400 hover:text-black ",
  };

  const disabledStyles = disabled
    ? "btn-disabled opacity-50 pointer-events-none"
    : "";

  const hideIcon = className?.includes("icon-none");
  const hideText = className?.includes("text-none");

  const buttonClasses = clsx(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    disabledStyles,
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && !hideIcon && showIcon && positionIcon === "left" && <Icon />}
      {text && !hideText && showText && <span>{text}</span>}
      {Icon && !hideIcon && showIcon && positionIcon === "right" && <Icon />}
    </button>
  );
};
