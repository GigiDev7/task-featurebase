import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        className="border-black border-[1px] px-1 outline-0 rounded-xs"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
