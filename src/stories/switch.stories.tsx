import React from 'react';
import { color, boolean } from '@storybook/addon-knobs';

import { DEFAULT_DECORATORS } from './decorators';
import { lightTheme } from '~/constants/themes';
import { Switch } from '~/components/Switch';

export const Default = () => {
  return (
    <Switch
      value={boolean('Value', true)}
      color={color('Color', lightTheme['accentColor'])}
    />
  );
};

export default {
  title: 'Switch',
  decorators: DEFAULT_DECORATORS,
};
