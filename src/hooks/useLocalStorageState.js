import { useEffect, useState } from "react";

export const useLocalStorageState = (initialState, key) => {
  const [value, setIsValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setIsValue];
};
