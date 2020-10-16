import React, { FC } from "react";

import { CheckboxMark } from "./CheckboxMark";

interface CheckboxProps {
  checked: boolean;
  onClick: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onClick }) => {
  return (
    <div
      className={`checkbox${checked ? " checkbox-checked" : ""}`}
      onClick={onClick}
    >
      {checked && <CheckboxMark />}
    </div>
  );
};
