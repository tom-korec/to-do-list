import React, { FC } from "react";

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  autoFocus?: boolean,
  onChange: (value: string) => void;
}

export const TextInput: FC<TextInputProps> = ({ name, value, placeholder, autoFocus, onChange }) => {
  return (
    <input
      data-cy="text-input"
      className="text-input"
      name={name}
      type="text"
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
