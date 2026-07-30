import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const readValue = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}"`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          key,
          JSON.stringify(valueToStore)
        );

        window.dispatchEvent(
          new StorageEvent("storage", {
            key,
            newValue: JSON.stringify(valueToStore)
          })
        );
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}"`, error);
    }
  };

  const removeValue = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);

        setStoredValue(initialValue);

        window.dispatchEvent(
          new StorageEvent("storage", {
            key,
            newValue: null
          })
        );
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}"`, error);
    }
  };

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === key) {
        setStoredValue(
          event.newValue
            ? JSON.parse(event.newValue)
            : initialValue
        );
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
