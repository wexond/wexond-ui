import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import { DEFAULT_DECORATORS } from './decorators';
import { RadioButton } from '~/components/RadioButton';
import { RadioButtons } from '~/components/RadioButtons';

export const Default = () => {
  return <RadioButton selected={boolean('Value', true)}></RadioButton>;
};

export const Group = () => {
  const [selected, select] = React.useState<number>(0);

  const onSelect = (value) => {
    select(value);
  };

  return (
    <RadioButtons onSelect={onSelect} value={selected}>
      <RadioButton value={0}>First</RadioButton>
      <RadioButton value={1}>Second</RadioButton>
    </RadioButtons>
  );
};

export default {
  title: 'Radiobutton',
  decorators: DEFAULT_DECORATORS,
};
