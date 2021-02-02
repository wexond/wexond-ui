import React from 'react';

export const useSafeLayoutEffect =
  window != null ? React.useLayoutEffect : React.useEffect;
