type ReducerFunction<S, A> = (state: S, action: A) => S;
type PersistenceFunction<S> = (state: S) => void;

export const withPersistence = <S, A>(
  reducer: ReducerFunction<S, A>,
  persist: PersistenceFunction<S>
): ReducerFunction<S, A>  => {
  return (state, action) => {
    const newState = reducer(state, action);
    persist(newState);
    return newState;
  };
}

