import React from 'react';

import { UIStyle } from '../../src/mixins/default-styles';

export const decorate = (stories: any) =>
  stories.addDecorator((r) => (
    <>
      <UIStyle />
      {r}
    </>
  ));
