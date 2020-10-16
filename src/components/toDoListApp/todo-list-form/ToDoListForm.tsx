import React, { FC, useState } from "react";

import { useToDoListStoreDispatch } from "../../../core/toDoListStore/store";

import { TextInput } from "../../common/TextInput";
import { SubmitButton } from "./SubmitButton";
import { generateId } from "../../../utils";
import {getTodos} from "../../../core/api";

interface ToDoListFormProps {
  id: string;
  text?: string;
  className?: string;
  placeholder?: string;
  handleSubmit: (text: string) => void;
  onBlur?: () => void;
}

const ToDoListForm: FC<ToDoListFormProps> = ({
  id,
  className,
  text,
  handleSubmit,
  onBlur,
}) => {
  const [value, setValue] = useState(text || "");
  return (
    <form
      className={`tdl-form ${className}`}
      onSubmit={async (e) => {
        e.preventDefault();

        // just for making api call
        const todos = await getTodos();
        console.log(todos);

        handleSubmit(value);
        setValue("");
      }}
    >
      <TextInput id={id} name="text" value={value} autoFocus onChange={setValue} onBlur={onBlur}/>
      <SubmitButton id={id} disabled={!value} />
    </form>
  );
};

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
    <ToDoListForm
      id="add-todo"
      className="tdl-add-form"
      placeholder="to do?"
      handleSubmit={handleSubmit}
    />
  );
};

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
    <ToDoListForm
      id={id}
      className="tdl-edit-form"
      text={text}
      handleSubmit={handleSubmit}
      onBlur={closeInput}
    />
  );
};
