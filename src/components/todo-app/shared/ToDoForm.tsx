import React, { FC, useState } from "react";

import { getTodos } from "../../../core/api";

import { TextInput } from "../../common/TextInput";
import { SubmitButton } from "../../common/SubmitButton";

interface ToDoListFormProps {
  id: string;
  initialValues?: ToDoListFormInitialValues;
  className?: string;
  placeholder?: string;
  handleSubmit: (text: string) => void;
}

interface ToDoListFormInitialValues {
  text: string;
}

export const ToDoForm: FC<ToDoListFormProps> = ({
  id,
  className,
  initialValues,
  placeholder,
  handleSubmit,
}) => {
  const [value, setValue] = useState(
    (initialValues && initialValues.text) || ""
  );

  const isValid = value && value.trim() !== "";

  return (
    <form
      data-cy={id}
      className={`tdl-form ${className}`}
      onSubmit={async (e) => {
        e.preventDefault();

        if (!isValid) {
          return;
        }

        // just for making api call
        const todos = await getTodos();
        todos && console.table(todos.slice(0, 2));

        setValue("");
        handleSubmit(value);
      }}
    >
      <TextInput
        name="text"
        value={value}
        placeholder={placeholder}
        autoFocus
        onChange={setValue}
      />
      <SubmitButton disabled={!isValid} />
    </form>
  );
};
