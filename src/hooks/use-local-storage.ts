import { useEffect, useState } from "react";

type InitialState<T> = T | (() => T);

function resolve<T>(v: InitialState<T>): T {
  return typeof v === "function" ? (v as () => T)() : v;
}

export function useLocalStorageState<T>(
  key: string,
  initialState: InitialState<T>
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const rawData = localStorage.getItem(key);
      return rawData != null
        ? (JSON.parse(rawData) as T)
        : resolve(initialState);
    } catch {
      return resolve(initialState);
    }
  });

  // Persist value on set
  const set: React.Dispatch<React.SetStateAction<T>> = (valueOrFn) => {
    setState((prev) => {
      const next =
        typeof valueOrFn === "function"
          ? (valueOrFn as (prev: T) => T)(prev)
          : valueOrFn;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Re-load data from localStorage when "key" changes.
  useEffect(() => {
    try {
      const rawData = localStorage.getItem(key);
      if (rawData == null) return;
      setState(JSON.parse(rawData) as T);
    } catch {
      // ignore
    }
  }, [key]);

  // Synchronize between windows/tabs.
  // Use "storage" event to listen local storage "key" changes.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        if (e.newValue == null) {
          setState(resolve(initialState));
        } else {
          setState(JSON.parse(e.newValue) as T);
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initialState]);

  return [state, set];
}
