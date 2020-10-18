import React, { createContext, useContext } from "react";
import { ToDoItem } from "../../../types/toDoItem";
import { Dispatch, State, Actions, DispatchActions } from "./types";
import { useToDoListReducerWithLocalStoragePersistence } from "./localStoragePersistence";

const StoreStateContext = createContext<State | undefined>(undefined);
const StoreDispatchContext = createContext<Dispatch | undefined>(undefined);

export const ToDoListStoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useToDoListReducerWithLocalStoragePersistence();
  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

export const useToDoListStoreState = () => {
  const state = useContext(StoreStateContext);

  if (state === undefined) {
    throw Error("Using ToDoListStoreStateContext outside of provider!");
  }

  return state;
};

export const useToDoListStoreDispatch = (): DispatchActions => {
  const dispatch = useContext(StoreDispatchContext);

  if (dispatch === undefined) {
    throw Error("Using ToDoListStoreDispatchContext outside of provider!");
  }

  const addItem = (item: ToDoItem) =>
    dispatch({ type: Actions.ADD_TODO_ITEM, item });

  const updateItem = (id: string, text: string) =>
    dispatch({ type: Actions.UPDATE_TODO_ITEM, id, text });

  const removeItem = (id: string) =>
    dispatch({ type: Actions.REMOVE_TODO_ITEM, id });

  const toggleItem = (id: string) =>
    dispatch({ type: Actions.TOGGLE_TODO_ITEM, id });

  return { addItem, updateItem, removeItem, toggleItem };
};
