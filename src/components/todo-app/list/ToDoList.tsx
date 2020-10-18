import React, { FC } from "react";

import { useToDoListStoreState } from "../../../core/stores/toDoListStore/store";
import { withLogger } from "../../hoc/withLogger";

import { ToDoItem } from "../../../types/toDoItem";
import { ToDoListItem } from "./ToDoListItem";

const LoggedToDoListItem = withLogger(ToDoListItem, console, "ToDoListItem");

function sortItems(item1: ToDoItem, item2: ToDoItem): number {
  if (item1.isOpen !== item2.isOpen) {
    return Number(item2.isOpen) - Number(item1.isOpen);
  }

  if (item1.isOpen) {
    return item1.text.localeCompare(item2.text);
  }

  return item1.date.getTime() - item2.date.getTime();
}

export const ToDoList: FC = () => {
  const list = useToDoListStoreState().sort(sortItems);

  return (
    <div>
      {list.map((toDoItem) => (
        <LoggedToDoListItem key={toDoItem.id} item={toDoItem} />
      ))}
    </div>
  );
};
