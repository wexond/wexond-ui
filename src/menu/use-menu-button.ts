import React from 'react';

import { MenuContext } from './menu-context';

export const useMenuButton = () => {
  const menu = React.useContext(MenuContext);

  const onMouseDown = React.useCallback(() => {
    menu?.toggle(true);
  }, [menu]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' && !menu?.isOpen) {
        menu?.toggle(true);
      }
    },
    [menu],
  );

  return {
    props: { onMouseDown, onKeyDown },
  };
};
