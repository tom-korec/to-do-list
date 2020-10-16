import React, { FC } from "react";

export interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button className="tdl-item-delete-button" onClick={onClick}>
      -
    </button>
  );
};
