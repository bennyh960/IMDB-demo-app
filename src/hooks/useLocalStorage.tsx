import { useState } from "react";

const useLocalStorage = (key: string, initail: any) => {
  const [storedValue, setStoredValue] = useState(initail);
  const getData = window.localStorage.getItem(key);
  //   const setData = window.localStorage.setItem(key, JSON.stringify());

  return <div>useLocalStorage</div>;
};

export default useLocalStorage;
