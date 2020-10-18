import React, { FC } from "react";
import { useToDoListStoreDispatch } from "../../../core/stores/toDoListStore/store";
import { ToDoForm } from "../shared/ToDoForm";

interface ToDoListEditFormProps {
  id: string;
  text: string;
  closeInput: () => void;
}

export const ToDoListEditForm: FC<ToDoListEditFormProps> = ({
  id,
  text,
  closeInput,
}) => {
  const { updateItem } = useToDoListStoreDispatch();

  const handleSubmit = (text: string) => {
    updateItem(id, text);
    closeInput();
  };

  return (
    <ToDoForm
      id="edit-todo"
      className="tdl-edit-form"
      initialValues={{ text }}
      placeholder="cannot be empty"
      handleSubmit={handleSubmit}
    />
  );
};
