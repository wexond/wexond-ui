import styled, { css } from 'styled-components';

import { DIALOG_BOX_SHADOW } from '../../constants/dialog';
import { customScroll } from '../../mixins/scroll';
import { noUserSelect } from '../../mixins/user-selection';

const MENU_LIST_BORDER_RADIUS = 6;
export const MENU_LIST_PADDING_Y = 4;

export const StyledMenuList = styled.div`
  width: fit-content;
  color: #fff;
  position: fixed;
  margin: 0px;
  border: none;
  z-index: 999999;
  ${noUserSelect};
  font-size: 13px;
  border-radius: ${MENU_LIST_BORDER_RADIUS}px;

  &:focus {
    outline: none;
  }

  ${({ isOpen }: { isOpen?: boolean }) => css`
    opacity: ${isOpen ? 1 : 0};
    pointer-events: ${isOpen ? 'inherit' : 'none'};
  `}
`;

export const BlurEffect = styled.div`
  background-color: rgba(25, 25, 25, 0.56);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: ${DIALOG_BOX_SHADOW};
  border-radius: ${MENU_LIST_BORDER_RADIUS}px;
  z-index: -1;
`;

export const Container = styled.ul`
  width: 100%;
  color: #fff;
  padding: 0px;
  margin-top: ${MENU_LIST_PADDING_Y}px;
  list-style: none;
  border: none;
  overflow: hidden;
  ${customScroll({
    borderRadius: `${MENU_LIST_BORDER_RADIUS}px`,
  })};
`;
