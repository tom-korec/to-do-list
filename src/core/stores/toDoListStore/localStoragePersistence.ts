import {State} from "./types";
import {loadFromLocalStorage, saveToLocalStorage} from "../../persistence/localStoragePersistence";
import {useReducer} from "react";
import {withPersistence} from "../../persistence/persistence";
import {reducer} from "./reducer";

const KEY = "TODO_ITEMS";

export const initFromLocalStorage = (defaultState: State): State => {
  const stateFromLocalStorage: State | null = loadFromLocalStorage(KEY);
  return stateFromLocalStorage
    ? stateFromLocalStorage.map((item) => ({
      ...item,
      date: new Date(item.date),
    }))
    : defaultState;
};

const saveToDoItemsToLocalStorage = (state: State) => saveToLocalStorage(state, KEY)

export const useToDoListReducerWithLocalStoragePersistence = () => {
  return useReducer(
    withPersistence(reducer, (state) => saveToDoItemsToLocalStorage(state)),
    [],
    initFromLocalStorage
  );
}