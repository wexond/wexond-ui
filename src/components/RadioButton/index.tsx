import * as React from 'react';

import { StyledRadioButton, Circle, Container, Label } from './style';

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
      <Container>
        <Circle selected={selected} />
      </Container>
      {children && <Label>{children}</Label>}
    </StyledRadioButton>
  );
};
