import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setNewValue = (newVal) => {
    try {
      console.log(newVal);
      setStoredValue(() => newVal);
      window.localStorage.setItem(key, JSON.stringify(newVal));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setNewValue];
};

export default useLocalStorage;
