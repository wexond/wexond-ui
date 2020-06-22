import React from 'react';

import { StyledCheckbox, Box } from './style';

export interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: boolean;
  color?: string;
}

export const Checkbox = ({ value }: CheckboxProps) => {
  return (
    <StyledCheckbox>
      <Box selected={value} />
    </StyledCheckbox>
  );
};
