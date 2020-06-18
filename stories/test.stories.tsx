import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import { Button } from '../src/components/Button';
import { decorate } from './utils/storybook';

const stories = storiesOf('Components', module);

decorate(stories);

stories.add(
  'Button',
  withInfo()(() => <Button text={text('text', 'foobar')} />),
);
