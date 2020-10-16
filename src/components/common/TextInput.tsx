import React, { FC } from "react";

interface TextInputProps {
  id: string;
  name: string;
  value: string;
  autoFocus?: boolean,
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const TextInput: FC<TextInputProps> = ({ id, name, value, autoFocus, onChange, onBlur }) => {
  return (
    <input
      id={id}
      className="text-input"
      name={name}
      type="text"
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onBlur={onBlur}
    />
  );
};
