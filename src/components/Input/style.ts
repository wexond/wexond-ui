import styled from 'styled-components';
import { borderShadow } from '../../mixins/border';

import { robotoRegular } from '../../mixins/typography';

export const StyledInput = styled.input`
  min-width: 64px;
  height: 32px;
  font-size: 13px;
  border: none;
  outline: none;
  cursor: text;
  border-radius: 6px;
  padding: 0px 12px;
  will-change: box-shadow;
  transition: 0.15s box-shadow, 0.1s background-color;
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

export const StyledInputFilled = styled(StyledInput)`
  background-color: var(--ui-input-filled-background);
  color: var(--ui-input-filled-color);
  ${borderShadow('var(--ui-input-filled-border)')};

  &:hover {
    background-color: var(--ui-input-filled-background-hovered);
    color: var(--ui-input-filled-color-hovered);
  }

  &:hover:not(:focus) {
    ${borderShadow('var(--ui-input-filled-border-hovered)')};
  }
`;

export const StyledInputOutlined = styled(StyledInput)`
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
  filled: StyledInputFilled,
  outlined: StyledInputOutlined,
};
