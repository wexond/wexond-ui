import React from 'react';

export const useDelayedHover = <T extends HTMLElement>(
  cb: (e: React.MouseEvent<T>) => void,
  time: number,
) => {
  const timerRef = React.useRef<number>(-1);

  const onMouseEnter = React.useCallback(
    (e: React.MouseEvent<T>) => {
      timerRef.current = (setTimeout(() => {
        cb(e);
      }, time) as unknown) as number;
    },
    [cb, time],
  );

  const onMouseLeave = React.useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return { onMouseEnter, onMouseLeave };
};
