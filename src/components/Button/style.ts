import styled, { css } from 'styled-components';

import { robotoRegular } from '../../mixins/typography';
import { noUserSelect } from '../../mixins/user-selection';

export const DEFAULT_BUTTON_COLOR = '#6ec6ff';
export const DEFAULT_BUTTON_HOVER_COLOR = '#63a4ff';

export const StyledButton = styled.button`
  min-width: 64px;
  height: 32px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  outline: none;
  border: none;
  text-align: center;
  white-space: nowrap;
  border-radius: 6px;
  transition: 0.1s background-color, 0.15s box-shadow, 0.1s border-color;
  position: relative;
  ${robotoRegular};
  ${noUserSelect};

  &:focus {
    box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
  }
`;

export const StyledButtonContained = styled(StyledButton)`
  padding: 0px 12px;
  background-color: var(--ui-button-contained-background);
  color: var(--ui-button-contained-color);
  text-align: left;
  justify-content: flex-start;
  box-shadow: 0 0 0 1px var(--ui-button-contained-border);

  &:hover {
    color: var(--ui-button-contained-hover-color);
    background-color: var(--ui-button-contained-hover-background);
  }

  &:hover:not(:focus) {
    box-shadow: 0 0 0 1px var(--ui-button-contained-hover-border);
  }
`;

export const StyledButtonOutlined = styled(StyledButton)`
  color: var(--ui-button-outlined-color);
  padding: 0px 12px;
  background-color: unset;
  box-shadow: 0 0 0 1px var(--ui-button-outlined-border);

  &:hover {
    background-color: unset;
    color: var(--ui-button-outlined-hover-color);
  }

  &:hover:not(:focus) {
    box-shadow: 0 0 0 1px var(--ui-button-outlined-hover-border);
  }
`;

export const StyledButtonPrimary = styled(StyledButton)`
  padding: 0px 16px;
  color: var(--ui-button-primary-color);
  background-color: var(--ui-button-primary-background);

  &:hover {
    background-color: var(--ui-button-primary-hover-background);
    color: var(--ui-button-primary-hover-color);
  }
`;

export default {
  contained: StyledButtonContained,
  outlined: StyledButtonOutlined,
  primary: StyledButtonPrimary,
};

interface ButtonIconProps {
  iconSpacing?: string;
  left?: boolean;
  disabledIconEvents?: boolean;
}

export const ButtonIcon = styled.span<ButtonIconProps>`
  ${({ iconSpacing, left, disabledIconEvents }) => css`
    ${
      disabledIconEvents &&
      css`
        pointer-events: none;
      `
    }

    ${
      left
        ? css`
            margin-right: auto;
            padding-right: ${iconSpacing};
          `
        : css`
            margin-left: auto;
            padding-left: ${iconSpacing};
          `
    }}
  `}
`;

interface ButtonSpinnerProps {
  iconSpacing?: string;
}

export const ButtonSpinner = styled.div<ButtonSpinnerProps>`
  ${({ iconSpacing }) => css`
    margin-right: ${iconSpacing};
  `};
`;
