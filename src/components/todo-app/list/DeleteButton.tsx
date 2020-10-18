import React, { FC } from "react";

export interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button data-cy="todo-item-delete" className="tdl-item-delete-button" onClick={onClick}>
      -
    </button>
  );
};
