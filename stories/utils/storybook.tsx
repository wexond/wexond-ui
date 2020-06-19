import React from 'react';
import { ThemeProvider } from 'styled-components';

import { UIStyle } from '../../src/mixins/default-styles';
import { lightTheme } from '../../src/constants/themes';

export const decorate = (stories: any) =>
  stories.addDecorator((r) => (
    <>
      <UIStyle />
      <ThemeProvider theme={lightTheme}>{r}</ThemeProvider>
    </>
  ));
