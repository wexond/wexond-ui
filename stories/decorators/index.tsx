import React from 'react';
import { ThemeProvider } from 'styled-components';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import { UIStyle } from '../../src/mixins/default-styles';

import { View } from '../components/View';
import { DEFAULT_THEME } from '../constants/theme';

export const withStyled = (storyFn: any) => {
  return (
    <>
      <ThemeProvider theme={{ ...DEFAULT_THEME }}>
        <UIStyle />
        <View>{storyFn()}</View>
      </ThemeProvider>
    </>
  );
};

export const decorators = [withInfo, withKnobs, withStyled];
