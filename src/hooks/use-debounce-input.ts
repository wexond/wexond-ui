import React from 'react';

export const useDebounceInput = (cb: () => void, delay = 300) => {
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const clear = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const onInput = React.useCallback(() => {
    clear();
    timerRef.current = setTimeout(cb, delay);
  }, [cb, delay, clear]);

  React.useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return { onInput };
};
