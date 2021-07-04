import React from 'react';

export const useDroppable = () => {
  const ref = React.useRef<HTMLElement | null>(null);

  return { ref };
};
