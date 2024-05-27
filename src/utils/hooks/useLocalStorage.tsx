import { useState } from 'react';

export type StorageValue =
  | string
  | number
  | boolean
  | null
  | Record<string, any>;

interface LocalStorageHook {
  getItem: (key: string) => StorageValue | null;
  setItem: (key: string, value: StorageValue) => void;
  removeItem: (key: string) => void;
  clearStorage: () => void;
}

const useLocalStorage = (): LocalStorageHook => {
  const [storage, setStorage] = useState<Storage | null>(localStorage);

  const getItem = (key: string): StorageValue | null => {
    try {
      const value = storage?.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`);
      return null;
    }
  };

  const setItem = (key: string, value: StorageValue): void => {
    try {
      const serializedValue = JSON.stringify(value);
      setTimeout(() => {
        storage?.setItem(key, serializedValue);
        setStorage(localStorage);
      }, 500);
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`);
    }
  };

  const removeItem = (key: string): void => {
    try {
      setTimeout(() => {
        storage?.removeItem(key);
        setStorage(localStorage);
      }, 500);
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`);
    }
  };

  const clearStorage = (): void => {
    try {
      setTimeout(() => {
        storage?.clear();
        setStorage(localStorage);
      }, 500);
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  };

  return { getItem, setItem, removeItem, clearStorage };
};

export default useLocalStorage;
