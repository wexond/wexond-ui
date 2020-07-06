import React from 'react';
import { color, number } from '@storybook/addon-knobs';

import { DEFAULT_DECORATORS } from './decorators';
import { lightTheme } from '~/constants/themes';
import { Preloader } from '~/components/Preloader';

export const Default = () => {
  const { size, thickness } = Preloader.defaultProps;
  return (
    <Preloader
      color={color('Color', lightTheme['accentColor'])}
      size={number('Size', size)}
      thickness={number('Thickness', thickness)}
    />
  );
};

export default {
  title: 'Preloader',
  decorators: DEFAULT_DECORATORS,
};
