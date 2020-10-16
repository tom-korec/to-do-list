import { useReducer } from "react";
import {renderHook, act, HookResult} from "@testing-library/react-hooks";

import { reducer } from "../reducer";
import { Actions } from "../types";
import { ToDoItem } from "../../../types/toDoItem";

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

describe("ToDoListStoreReducer", () => {
  let result: HookResult<any>;
  let dispatch: any;

  beforeEach(() => {
    result = renderHook(() => useReducer(reducer, [])).result;
    dispatch = result.current[1];
  });

  test("Add todo", () => {
    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem1 });
    });

    const state = result.current[0];

    expect(state).toHaveLength(1);
    expect(state[0].id).toEqual(toDoItem1.id);
    expect(state[0].text).toEqual(toDoItem1.text);
    expect(state[0].isOpen).toEqual(toDoItem1.isOpen);
    expect(state[0].date).toEqual(toDoItem1.date);
  });

  test("Remove todo", () => {
    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem1 });
    });

    let state = result.current[0];
    expect(state).toHaveLength(1);

    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem2 });
    });

    state = result.current[0];
    expect(state).toHaveLength(2);
    expect(state[0].id).toEqual(toDoItem1.id);
    expect(state[1].id).toEqual(toDoItem2.id);

    act(() => {
      dispatch({ type: Actions.REMOVE_TODO_ITEM, id: toDoItem1.id });
    });

    state = result.current[0];
    expect(state).toHaveLength(1);
    expect(state[0].id).toEqual(toDoItem2.id);

    act(() => {
      dispatch({ type: Actions.REMOVE_TODO_ITEM, id: toDoItem2.id });
    });

    state = result.current[0];
    expect(state).toHaveLength(0);
    expect(state).toEqual([]);
  });

  test("Remove todo with invalid id does nothing", () => {
    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem1 });
      dispatch({ type: Actions.REMOVE_TODO_ITEM, id: "invalid-id" });
    });

    let state = result.current[0];
    expect(state).toHaveLength(1);
    expect(state[0].id).toEqual(toDoItem1.id);
  });

  test("Close todo", () => {
    const { result } = renderHook(() => useReducer(reducer, []));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem1 });
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem2 });
    });

    let state = result.current[0];
    expect(state).toHaveLength(2);

    act(() => {
      dispatch({ type: Actions.TOGGLE_TODO_ITEM, id: toDoItem1.id });
    });

    state = result.current[0];
    expect(state[0].isOpen).toEqual(false);
  });

  test("Toggle todo with invalid id does nothing", () => {
    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem1 });
      dispatch({ type: Actions.TOGGLE_TODO_ITEM, id: "invalid-id" });
    });

    let state = result.current[0];
    expect(state[0].isOpen).toEqual(toDoItem1.isOpen);
  });

  test("Open todo", () => {
    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem1 });
      dispatch({ type: Actions.TOGGLE_TODO_ITEM, id: toDoItem1.id });
    });

    let state = result.current[0];
    expect(state[0].isOpen).toEqual(false);

    act(() => {
      dispatch({ type: Actions.TOGGLE_TODO_ITEM, id: toDoItem1.id });
    });

    state = result.current[0];
    expect(state[0].isOpen).toEqual(true);
  });

  test("Update todo", () => {
    expect(toDoItem1.text).not.toBe(toDoItem2.text);

    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem1 });
      dispatch({
        type: Actions.UPDATE_TODO_ITEM,
        id: toDoItem1.id,
        text: toDoItem2.text,
      });
    });

    let state = result.current[0];
    expect(state[0].id).toEqual(toDoItem1.id);
    expect(state[0].text).toEqual(toDoItem2.text);
    expect(state[0].isOpen).toEqual(toDoItem1.isOpen);
    expect(state[0].date).toEqual(toDoItem1.date);
  });

  test("Update todo with invalid id does nothing", () => {
    expect(toDoItem1.text).not.toBe(toDoItem2.text);

    act(() => {
      dispatch({ type: Actions.ADD_TODO_ITEM, item: toDoItem1 });
      dispatch({
        type: Actions.UPDATE_TODO_ITEM,
        id: "invalid-id",
        text: toDoItem2.text,
      });
    });

    let state = result.current[0];
    expect(state[0].text).toEqual(toDoItem1.text);
  });

  test("Throws an error when dispatched with an unknown action type", () => {
    act(() => {
      // @ts-ignore - type "definitely-not-an-valid-action-type" is not a valid type
      dispatch({ type: "definitely-not-an-valid-action-type" });
    });

    expect(result.error).toEqual(
      Error("Unsupported action called in ToDoList reducer")
    );
  });
});
