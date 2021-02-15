import styled, { css } from 'styled-components';

import { DIALOG_BOX_SHADOW } from '~/constants/dialog';
import { noUserSelect } from '~/mixins/user-selection';

export const StyledMenuList = styled.ul`
  width: fit-content;
  color: #fff;
  position: absolute;
  margin: 0px;
  padding: 4px 0px;
  list-style: none;
  border: none;
  font-size: 13px;
  z-index: 10;
  ${noUserSelect};

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(25, 25, 25, 0.56);
    backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    box-shadow: ${DIALOG_BOX_SHADOW};
    border-radius: 6px;
  }

  &:focus {
    outline: none;
  }
`;
