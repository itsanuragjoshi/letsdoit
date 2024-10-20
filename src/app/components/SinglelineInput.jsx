export const SinglelineInput = ({
  value,
  onChange,
  placeholder = "Enter your text here...",
  className = "",
  ...rest
}) => {
  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
