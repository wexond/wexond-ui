import React from 'react';
import { ThemeProvider } from 'styled-components';
import { withKnobs } from '@storybook/addon-knobs';

import { UIStyle } from '~/mixins/default-styles';
import { lightTheme } from '~/constants/themes';
import { AppContainer } from '~/components/App';

export const withStyled = (storyFn: any) => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <UIStyle />
        <AppContainer style={{ padding: 24 }}>{storyFn()}</AppContainer>
      </ThemeProvider>
    </>
  );
};

export const DEFAULT_DECORATORS = [withKnobs, withStyled];
