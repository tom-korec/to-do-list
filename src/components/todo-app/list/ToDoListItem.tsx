import React, { FC, useState } from "react";

import { useToDoListStoreDispatch } from "../../../core/stores/toDoListStore/store";

import { ToDoItem } from "../../../types/toDoItem";
import { Checkbox } from "../../common/Checkbox";
import { DeleteButton } from "./DeleteButton";
import { ToDoListEditForm } from "./ToDoEditForm";

interface ToDoListItemProps {
  item: ToDoItem;
}

export const ToDoListItem: FC<ToDoListItemProps> = ({ item }) => {
  const { toggleItem, removeItem } = useToDoListStoreDispatch();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      data-cy="todo-item"
      className="tdl-item"
      onBlur={(e) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
          if (!currentTarget.contains(document.activeElement)) {
            isEditing && setIsEditing(false);
          }
        }, 0);
      }}
    >
      <Checkbox
        dataCy="todo-item-checkbox"
        checked={!item.isOpen}
        onClick={() => {
          toggleItem(item.id);
        }}
      />
      {isEditing ? (
        <ToDoListEditForm id={item.id} text={item.text} closeInput={() => setIsEditing(false)} />
      ) : (
        <p
          data-cy="todo-item-text"
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
