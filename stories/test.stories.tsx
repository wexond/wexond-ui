import React from 'react';
import { text, color } from '@storybook/addon-knobs';

import { Button } from '../src/components/Button';
import { decorators } from './decorators';
import { DEFAULT_THEME } from './constants/theme';

export const RaisedButton = () => {
  return (
    <Button
      background={color('Background', DEFAULT_THEME['control.background'])}
      foreground={color('Foreground', DEFAULT_THEME['control.foreground'])}
    >
      {text('Text', 'Button')}
    </Button>
  );
};

export default {
  title: 'Buttons',
  decorators,
};
