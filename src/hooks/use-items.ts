import React from 'react';

export const useItems = <T extends { id: any }>(defaultValue: T[] = []) => {
  const items = React.useRef<(T | null)[]>(defaultValue);

  const addItem = React.useCallback((item: T) => {
    const { id } = item;

    const index = items.current.findIndex((r) => r?.id === id);

    if (index !== -1) {
      items.current[index] = item;

      return index;
    } else {
      return items.current.push(item) - 1;
    }
  }, []);

  const removeItem = React.useCallback((id: number) => {
    items.current = items.current.filter((r) => r?.id !== id);
  }, []);

  return { items, addItem, removeItem };
};
