import styled from 'styled-components';

import { robotoRegular } from '../../mixins/typography';

export const StyledTextarea = styled.textarea`
  min-width: 64px;
  height: 32px;
  font-size: 13px;
  border: none;
  outline: none;
  cursor: text;
  border-radius: 6px;
  padding: 12px;
  will-change: box-shadow;
  transition: 0.15s box-shadow, 0.1s background-color, 0.1s border-color;
  resize: none;
  ${robotoRegular};

  &:focus {
    box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
  }

  &::placeholder {
    color: #fff;
    opacity: 0.5;
  }
`;

export const StyledTextareaFilled = styled(StyledTextarea)`
  background-color: rgba(255, 255, 255, 0.08);
  color: #fff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.14);
  }
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
