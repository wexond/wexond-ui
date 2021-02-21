import React from 'react';

import { MenuContext } from './menu-context';

export const useMenuButton = () => {
  const menu = React.useContext(MenuContext);

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (menu) {
        e.preventDefault();
        menu.toggle(!menu.isOpen);
      }
    },
    [menu],
  );

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
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
