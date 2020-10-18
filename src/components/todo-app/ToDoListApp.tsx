import React, { FC } from "react";

import { ToDoListStoreProvider } from "../../core/stores/toDoListStore/store";

import { ToDoListAddForm } from "./add-form/ToDoAddForm";
import { ToDoList } from "./list/ToDoList";

export const ToDoListApp: FC = () => {
  return (
    <ToDoListStoreProvider>
      <div id="tdl-app" data-cy="tdl-app" className="tdl-app">
        <ToDoListAddForm />
        <ToDoList />
      </div>
    </ToDoListStoreProvider>
  );
};
