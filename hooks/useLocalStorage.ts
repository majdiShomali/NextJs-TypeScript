"use client";
import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : (initialValue as T);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        setValue(JSON.parse(savedValue));
      } else {
        setValue(
          typeof initialValue === "function"
            ? (initialValue as () => T)()
            : (initialValue as T)
        );
      }

      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
}
