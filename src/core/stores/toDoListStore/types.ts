import { ToDoItem } from "../../../types/toDoItem";

export type State = ToDoItem[];

export enum Actions {
  ADD_TODO_ITEM = "ADD_ITEM",
  REMOVE_TODO_ITEM = "REMOVE_ITEM",
  TOGGLE_TODO_ITEM = "TOGGLE_TODO_ITEM",
  UPDATE_TODO_ITEM = "UPDATE_TODO_ITEM",
}

export type Action =
  | {
      type: Actions.ADD_TODO_ITEM;
      item: ToDoItem;
    }
  | {
      type: Actions.TOGGLE_TODO_ITEM | Actions.REMOVE_TODO_ITEM;
      id: string;
    }
  | {
      type: Actions.UPDATE_TODO_ITEM;
      id: string;
      text: string;
    };

export type Dispatch = (action: Action) => void;

export type DispatchActions = {
  addItem: (toDoItem: ToDoItem) => void;
  updateItem: (id: string, text: string,) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
};
