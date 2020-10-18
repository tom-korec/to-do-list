export const saveToLocalStorage = <S>(state: S, key: string): void => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const loadFromLocalStorage = <S>(key: string): S | null => {
  const state = localStorage.getItem(key);
  return state ? JSON.parse(state) : null;
};
