import styled, { css } from 'styled-components';

import { StyledIcon } from '../Icon/style';

interface StyledIconButtonProps {
  isDisabled?: boolean;
  isActive?: boolean;
  dense?: boolean;
}

export const StyledIconButton = styled.div<StyledIconButtonProps>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  flex-shrink: 0;
  will-change: background-color, max-width, opacity;
  transition: 0.2s background-color, 0.05s max-width, 0.15s opacity;

  &:hover {
    background-color: var(--iconButton-background-hover);
  }

  &:active {
    background-color: var(--iconButton-background-active);
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;

      & > * {
        opacity: 0.24;
      }
    `}

  ${({ dense }) =>
    dense &&
    css`
      width: 30px;
      height: 24px;
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--iconButton-background-active);
    `}

  & > ${StyledIcon} {
    will-change: background-image, mask-image;
    transition: 0.15s background-image, 0.15s mask-image;
  }
`;
