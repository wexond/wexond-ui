import React from 'react';

import { StyledButton } from './style';

export interface ButtonProps {
  text: string;
  outlined?: boolean;
}

export const Button = ({ text }: ButtonProps) => {
  return <StyledButton>{text}</StyledButton>;
};
