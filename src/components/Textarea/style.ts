import styled, { css } from 'styled-components';

import { borderShadow } from '../../mixins/border';
import { robotoRegular } from '../../mixins/typography';

export interface StyledTextareaProps {
  isError?: boolean;
}

export const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: 100%;
  min-width: 64px;
  height: inherit;
  font-size: 13px;
  border: none;
  outline: none;
  cursor: text;
  border-radius: 6px;
  padding: 12px;
  will-change: box-shadow;
  transition: 0.15s box-shadow, 0.1s background-color, 0.1s border-color;
  resize: none;
  color: inherit;
  ${robotoRegular};

  &:focus {
    box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
  }

  &::placeholder {
    color: inherit;
    opacity: 0.5;
  }
`;

export const StyledTextareaFilled = styled(StyledTextarea)`
  background-color: rgba(255, 255, 255, 0.08);

  &:hover {
    background-color: rgba(255, 255, 255, 0.14);
  }

  ${({ isError }: StyledTextareaProps) =>
    isError &&
    css`
      ${borderShadow('var(--error) !important')};
    `}
`;

export const StyledTextareaOutlined = styled(StyledTextarea)`
  border: 1px solid rgba(255, 255, 255, 0.24);
  background-color: transparent;

  &:focus {
    border-color: transparent;
  }

  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.56);
  }
`;

export default {
  filled: StyledTextareaFilled,
  outlined: StyledTextareaOutlined,
};
