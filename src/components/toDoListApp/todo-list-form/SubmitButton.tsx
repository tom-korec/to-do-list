import React, { FC } from "react";

import { CheckboxMark } from "../../common/CheckboxMark";

interface SubmitButtonProps {
  id: string;
  disabled?: boolean;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ id, disabled }) => {
  return (
    <button id={id + "-button"} className="submit-button" type="submit" disabled={disabled}>
      <CheckboxMark />
    </button>
  );
};
