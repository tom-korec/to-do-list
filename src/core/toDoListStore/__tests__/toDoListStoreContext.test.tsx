import React, { FC } from "react";
import { renderHook, act, HookResult } from "@testing-library/react-hooks";
import {
  ToDoListStoreProvider,
  useToDoListStoreState,
  useToDoListStoreDispatch,
} from "../store";
import { ToDoItem } from "../../../types/toDoItem";
import { DispatchActions } from "../types";

const toDoItem1: ToDoItem = {
  id: "1",
  text: "text",
  isOpen: true,
  date: new Date("10/10/2020"),
};

const toDoItem2: ToDoItem = {
  id: "2",
  text: "other text",
  isOpen: true,
  date: new Date("10/11/2020"),
};

describe("ToDoListStoreContext", () => {
  let result: HookResult<any>;
  let dispatch: DispatchActions;

  beforeEach(() => {
    const wrapper: FC = ({ children }) => (
      <ToDoListStoreProvider>{children}</ToDoListStoreProvider>
    );
    result = renderHook(
      () => {
        return {
          state: useToDoListStoreState(),
          dispatch: useToDoListStoreDispatch(),
        };
      },
      { wrapper }
    ).result;
    dispatch = result.current.dispatch;
  });

  test("Initial state is empty", () => {
    let { state } = result.current;
    expect(state).toEqual([]);
  });

  test("Add todo", () => {
    act(() => {
      dispatch.addItem(toDoItem1);
    });

    let state = result.current.state;
    expect(state).toHaveLength(1);
    expect(state[0].id).toEqual(toDoItem1.id);
    expect(state[0].text).toEqual(toDoItem1.text);
    expect(state[0].isOpen).toEqual(toDoItem1.isOpen);
    expect(state[0].date).toEqual(toDoItem1.date);
  });

  test("Remove todo", () => {
    act(() => {
      dispatch.addItem(toDoItem1);
      dispatch.removeItem(toDoItem1.id);
    });

    let state = result.current.state;
    expect(state).toHaveLength(0);
  });

  test("Toggle todo", () => {
    act(() => {
      dispatch.addItem(toDoItem1);
      dispatch.toggleItem(toDoItem1.id);
    });

    let state = result.current.state;
    expect(state[0].isOpen).toEqual(false);
  });

  test("Update todo", () => {
    act(() => {
      dispatch.addItem(toDoItem1);
      dispatch.updateItem(toDoItem1.id, toDoItem2.text);
    });

    let state = result.current.state;
    expect(state[0].text).toEqual(toDoItem2.text);
  });

  test("Using State Context outside of provider throws an error", () => {
    const { result } = renderHook(() => useToDoListStoreState());
    expect(result.error).toEqual(
      Error("Using ToDoListStoreStateContext outside of provider!")
    );
  });

  test("Using Dispatch Context outside of provider throws an error", () => {
    const { result } = renderHook(() => useToDoListStoreDispatch());
    expect(result.error).toEqual(
      Error("Using ToDoListStoreDispatchContext outside of provider!")
    );
  });
});
