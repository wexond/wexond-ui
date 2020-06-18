import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { Button } from '../src/components/Button';
import { withInfo } from '@storybook/addon-info';

const stories = storiesOf('Components', module);

stories.add(
  'Button',
  withInfo()(() => <Button text={text('text', 'foobar')} />),
);
