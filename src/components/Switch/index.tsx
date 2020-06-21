import * as React from 'react';

import { StyledSwitch, Thumb } from './styles';

export interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  value?: boolean;
  dense?: boolean;
}

export const Switch = ({ color, value, dense, ...props }: SwitchProps) => {
  return (
    <StyledSwitch activated={value} color={color} dense={dense} {...props}>
      <Thumb dense={dense} activated={value} />
    </StyledSwitch>
  );
};
