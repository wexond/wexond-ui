import React from 'react';
import { color, boolean } from '@storybook/addon-knobs';

import { DEFAULT_DECORATORS } from './decorators';
import { lightTheme } from '~/constants/themes';
import { Switch } from '~/components/Switch';

export const SwitchStory = () => {
  return (
    <Switch
      value={boolean('Value', true)}
      color={color('Color', lightTheme['accentColor'])}
    />
  );
};

export default {
  title: 'Switches',
  decorators: DEFAULT_DECORATORS,
};
