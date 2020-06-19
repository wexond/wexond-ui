import React from 'react';

import { StyledButton, Container } from './style';

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string;
  foreground?: string;
  outlined?: boolean;
  children?: React.ReactNode;
}

export const Button = ({
  background,
  foreground,
  outlined,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      background={background}
      foreground={foreground}
      outlined={outlined}
      {...props}
    >
      <Container>{children}</Container>
    </StyledButton>
  );
};
