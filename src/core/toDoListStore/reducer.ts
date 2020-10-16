import { loadFromLocalStorage } from "../persistence";
import { Action, Actions, State } from "./types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.ADD_TODO_ITEM:
      return [...state, action.item];
    case Actions.TOGGLE_TODO_ITEM:
      return state.map((item) =>
        item.id === action.id ? { ...item, isOpen: !item.isOpen } : item
      );
    case Actions.REMOVE_TODO_ITEM:
      const id = action.id;
      return state.filter((item) => item.id !== id);
    case Actions.UPDATE_TODO_ITEM:
      return state.map((item) =>
        item.id === action.id ? { ...item, text: action.text } : item
      );
    default:
      throw Error("Unsupported action called in ToDoList reducer");
  }
};

export const initFunction = (defaultState: State): State => {
  const stateFromLocalStorage: State | null = loadFromLocalStorage();
  return stateFromLocalStorage
    ? stateFromLocalStorage.map((item) => ({
        ...item,
        date: new Date(item.date),
      }))
    : defaultState;
};
