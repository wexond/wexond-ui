import React from 'react';

let _id = 0;

export const useId = () => {
  const id = React.useMemo(() => _id++, []);

  return id;
};
