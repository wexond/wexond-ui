import React from 'react';

export const useDisableScrollButton = () => {
  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (e.button === 1) {
      e.preventDefault();
    }
  }, []);

  return { onMouseDown };
};
