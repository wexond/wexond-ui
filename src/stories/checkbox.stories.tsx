import React from 'react';
import { color, boolean } from '@storybook/addon-knobs';

import { DEFAULT_DECORATORS } from './decorators';
import { lightTheme } from '~/constants/themes';
import { Checkbox } from '~/components/Checkbox';

export const Default = () => {
  return (
    <Checkbox
      value={boolean('Value', false)}
      color={color('Color', lightTheme['accentColor'])}
    />
  );
};

export default {
  title: 'Checkbox',
  decorators: DEFAULT_DECORATORS,
};
