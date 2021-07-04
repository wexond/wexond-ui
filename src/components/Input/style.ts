import styled from 'styled-components';

import { robotoRegular } from '../../mixins/typography';

export const StyledInput = styled.input`
  min-width: 64px;
  height: 32px;
  font-size: 13px;
  border: none;
  outline: none;
  cursor: text;
  border-radius: 4px;
  padding: 0px 12px;
  will-change: box-shadow;
  transition: 0.15s box-shadow;
  ${robotoRegular};

  &:hover {
    border-color: rgba(255, 255, 255, 0.48);
  }

  &:focus {
    border-color: rgba(100, 181, 246, 0.54);
    box-shadow: 0 0 0 1px rgba(100, 181, 246, 0.54);
  }
`;

export const StyledInputFilled = styled(StyledInput)`
  background-color: rgb(50, 50, 50);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StyledInputOutlined = styled(StyledInput)`
  border: 1px solid rgba(255, 255, 255, 0.24);
  background-color: transparent;
`;

export default {
  filled: StyledInputFilled,
  outlined: StyledInputOutlined,
};
