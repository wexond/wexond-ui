import styled, { css } from 'styled-components';

import { Icon } from '../Icon';

export const StyledIconButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  flex-shrink: 0;
  transition: 0.2s background-color, 0.05s max-width, 0.15s opacity;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.12);
  }

  ${({
    isDisabled,
    isActive,
    dense,
  }: {
    isDisabled?: boolean;
    isActive?: boolean;
    dense?: boolean;
  }) =>
    css`
      ${
        isDisabled &&
        css`
          pointer-events: none;

          & > * {
            opacity: 0.24;
          }
        `
      }

      ${
        dense &&
        css`
          width: 30px;
          height: 26px;
        `
      }

      ${
        isActive &&
        css`
          background-color: rgba(255, 255, 255, 0.12);
        `
      }
    `}
`;

export const StyledIcon = styled(Icon)`
  transition: 0.15s background-image;
`;
