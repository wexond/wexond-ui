import React from 'react';
import { text, color } from '@storybook/addon-knobs';

import { DEFAULT_DECORATORS } from './decorators';
import { lightTheme } from '~/constants/themes';
import { Button } from '~/components/Button';

export const RaisedButton = () => {
  return (
    <Button
      background={color('Background', lightTheme['control.background'])}
      foreground={color('Foreground', lightTheme['control.foreground'])}
    >
      {text('Text', 'Button')}
    </Button>
  );
};

export default {
  title: 'Buttons',
  decorators: DEFAULT_DECORATORS,
};
