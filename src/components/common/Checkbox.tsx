import React, { FC } from "react";

import { CheckboxMark } from "./CheckboxMark";

interface CheckboxProps {
  checked: boolean;
  onClick: () => void;
  dataCy?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onClick, dataCy }) => {
  return (
    <div
      data-cy={dataCy}
      className={`checkbox${checked ? " checkbox-checked" : ""}`}
      onClick={onClick}
    >
      {checked && <CheckboxMark />}
    </div>
  );
};
