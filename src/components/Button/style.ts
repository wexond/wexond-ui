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
  background-color: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
  justify-content: flex-start;

  &:hover {
    border-color: rgba(255, 255, 255, 0.48);
    background-color: rgba(255, 255, 255, 0.14);
  }

  &:focus {
    border-color: rgba(100, 181, 246, 0.54);
    box-shadow: 0 0 0 1px rgba(100, 181, 246, 0.54);
  }
`;

export const StyledButtonOutlined = styled(StyledButton)`
  color: #fff;
  padding: 0px 12px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background-color: unset;

  &:hover {
    border-color: rgba(255, 255, 255, 0.48);
    background-color: unset;
  }

  &:focus {
    border-color: rgba(100, 181, 246, 0.54);
    box-shadow: 0 0 0 1px rgba(100, 181, 246, 0.54);
  }
`;

export const StyledButtonPrimary = styled(StyledButton)`
  padding: 0px 16px;
  color: #000;
  background-color: ${DEFAULT_BUTTON_COLOR};

  &:hover {
    background-color: ${DEFAULT_BUTTON_HOVER_COLOR};
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
