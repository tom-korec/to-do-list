import React, { FC } from "react";

import { CheckboxMark } from "./CheckboxMark";

interface SubmitButtonProps {
  disabled?: boolean
}

export const SubmitButton: FC<SubmitButtonProps> = ({ disabled }) => {
  return (
    <button data-cy="submit-button" className="submit-button" type="submit" disabled={disabled}>
      <CheckboxMark />
    </button>
  );
};
