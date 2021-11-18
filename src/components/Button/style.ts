import styled, { css } from 'styled-components';

import { borderShadow } from '../../mixins/border';
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
    ${borderShadow(`rgba(100, 181, 246, 0.54)`, '2px')};
  }

  ${({ isDisabled }: { isDisabled: boolean }) =>
    isDisabled &&
    css`
      opacity: 0.54;
      pointer-events: none;
    `}
`;

export const StyledButtonContained = styled(StyledButton)`
  padding: 0px 12px;
  background-color: var(--buttonContained-background);
  color: var(--buttonContained-foreground);
  ${borderShadow('var(--buttonContained-border)')};

  &:hover {
    color: var(--buttonContained-foreground-hover);
    background-color: var(--buttonContained-background-hover);
  }

  &:hover:not(:focus) {
    ${borderShadow('var(--buttonContained-border-hover)')};
  }
`;

export const StyledButtonOutlined = styled(StyledButton)`
  color: var(--buttonOutlined-foreground);
  padding: 0px 12px;
  background-color: unset;
  ${borderShadow(`var(--buttonOutlined-border)`)};

  &:hover {
    background-color: unset;
    color: var(--buttonOutlined-foreground-hover);
  }

  &:hover:not(:focus) {
    ${borderShadow(`var(--buttonOutlined-border-hover)`)};
  }
`;

export const StyledButtonPrimary = styled(StyledButton)`
  padding: 0px 16px;
  color: var(--buttonPrimary-foreground);
  background-color: var(--buttonPrimary-background);

  &:hover {
    background-color: var(--buttonPrimary-background-hover);
    color: var(--buttonPrimary-foreground-hover);
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
