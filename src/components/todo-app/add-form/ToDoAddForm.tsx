import React from "react";

import { useToDoListStoreDispatch } from "../../../core/stores/toDoListStore/store";
import { generateId } from "../../../core/utils";

import { ToDoForm } from "../shared/ToDoForm";

export const ToDoListAddForm = () => {
  const { addItem } = useToDoListStoreDispatch();

  const handleSubmit = (text: string) => {
    addItem({
      id: generateId(),
      text,
      isOpen: true,
      date: new Date(),
    });
  };

  return (
    <ToDoForm
      id="add-todo"
      className="tdl-add-form"
      placeholder="to do?"
      handleSubmit={handleSubmit}
    />
  );
};