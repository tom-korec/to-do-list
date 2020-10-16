import React, { FC } from "react";

import { ToDoListStoreProvider } from "../../core/toDoListStore/store";

import { ToDoListAddForm } from "./todo-list-form/ToDoListForm";
import { ToDoList } from "./todo-list/ToDoList";

export const ToDoListApp: FC = () => {
  return (
    <ToDoListStoreProvider>
      <div className="tdl-app">
        <ToDoListAddForm />
        <ToDoList />
      </div>
    </ToDoListStoreProvider>
  );
};
