import React from 'react';

export const decorate = (stories: any) =>
  stories.addDecorator((r) => <>test{r}</>);
