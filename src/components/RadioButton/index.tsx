import * as React from 'react';

import { StyledRadioButton, Circle, Label } from './style';

export interface RadioButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: any;
  selected?: boolean;
}

export const RadioButton = ({
  selected,
  children,
  ...props
}: RadioButtonProps) => {
  return (
    <StyledRadioButton {...props}>
      <Circle selected={selected} />
      {children && <Label>{children}</Label>}
    </StyledRadioButton>
  );
};
