import React from 'react';

import { MenuContext } from './menu-context';

export const useMenuButton = () => {
  const menu = React.useContext(MenuContext);

  const onMouseDown = React.useCallback(() => {
    menu?.toggle(true);
  }, [menu]);

  return {
    props: { onMouseDown },
  };
};
