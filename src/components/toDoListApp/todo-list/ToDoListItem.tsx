import React, { FC, useState } from "react";

import { useToDoListStoreDispatch } from "../../../core/toDoListStore/store";

import { ToDoItem } from "../../../types/toDoItem";
import { Checkbox } from "../../common/Checkbox";
import { DeleteButton } from "./DeleteButton";
import { ToDoListEditForm } from "../todo-list-form/ToDoListForm";

interface ToDoListItemProps {
  item: ToDoItem;
}

export const ToDoListItem: FC<ToDoListItemProps> = ({ item }) => {
  const { toggleItem, removeItem } = useToDoListStoreDispatch();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="tdl-item">
      <Checkbox
        checked={!item.isOpen}
        onClick={() => {
          toggleItem(item.id);
        }}
      />
      {isEditing ? (
        <ToDoListEditForm
          id={item.id}
          text={item.text}
          closeInput={() => setIsEditing(false)}
        />
      ) : (
        <p
          title={item.date.toLocaleDateString()}
          className={`tdl-item-text${
            item.isOpen ? "" : " tdl-item-text-closed"
          }`}
          onClick={() => setIsEditing(true)}
        >
          {item.text}
        </p>
      )}
      <DeleteButton
        onClick={() => {
          removeItem(item.id);
        }}
      />
    </div>
  );
};
