import React from 'react';

import { StyledCheckbox, Box } from './style';

export interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: boolean;
  color?: string;
}

export const Checkbox = ({ value, ...props }: CheckboxProps) => {
  return (
    <StyledCheckbox {...props}>
      <Box className="checkbox-box" selected={value} />
    </StyledCheckbox>
  );
};
