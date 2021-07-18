import styled, { css } from 'styled-components';
import { MENU_ITEM_MARGIN } from '../MenuList';

export const MENU_LIST_ITEM_HEIGHT = 32;

export const StyledMenuItem = styled.li`
  height: ${MENU_LIST_ITEM_HEIGHT}px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  align-items: center;
  position: relative;
  border-radius: 4px;
  margin: 0 ${MENU_ITEM_MARGIN}px;
  color: var(--ui-menu-item-color);

  &:focus,
  &:focus-within {
    outline: none;
    background-color: var(--ui-menu-item-selected);
    color: var(--ui-menu-item-color-selected);
  }

  ${({ isDisabled }: { isDisabled?: boolean }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `}
`;

export const IconContainer = styled.div`
  position: absolute;
`;

export const Label = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({
    leftSpacing,
    isDisabled,
  }: {
    leftSpacing?: string;
    isDisabled?: boolean;
  }) => css`
    margin-left: ${leftSpacing};
    opacity: ${isDisabled ? 0.32 : 1};
  `}
`;

export const Accelerator = styled.span`
  opacity: 0.54;
  text-align: right;
  flex: 2 1 auto;
  padding: 0 2em;
  white-space: nowrap;
`;

export const SubmenuIconContainer = styled.div`
  margin-left: auto;
`;
