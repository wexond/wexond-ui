import styled, { css } from 'styled-components';

import { robotoRegular } from '../../mixins/typography';
import { noUserSelect } from '../../mixins/user-selection';
import {
  ComponentVariantProps,
  createComponent,
} from '../../theme/create-component';

export const DEFAULT_BUTTON_COLOR = '#6ec6ff';
export const DEFAULT_BUTTON_HOVER_COLOR = '#63a4ff';

export default {
  baseStyle: css`
    min-width: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    outline: none;
    border: none;
    text-align: center;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    transition: 0.1s background-color, 0.15s box-shadow;
    position: relative;
    ${noUserSelect};

    &:focus {
      box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
    }
  `,
  sizes: {
    md: css`
      height: 32px;
      font-size: 13px;
      ${robotoRegular};
    `,
  },
  variants: {
    contained: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 12px;
      background-color: rgb(50, 50, 50);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.1);
      text-align: left;
      justify-content: flex-start;

      &:hover {
        border-color: rgba(255, 255, 255, 0.48);
      }

      &:focus {
        border-color: rgba(100, 181, 246, 0.54);
        box-shadow: 0 0 0 1px rgba(100, 181, 246, 0.54);
      }
    `,
    outlined: ({ theme: { colors } }: ComponentVariantProps) => css`
      color: #fff;
      padding: 0px 12px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      background-color: transparent;

      &:hover {
        border-color: rgba(255, 255, 255, 0.48);
      }
    `,
    primary: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 16px;
      color: #000;
      background-color: ${DEFAULT_BUTTON_COLOR};

      &:hover {
        background-color: ${DEFAULT_BUTTON_HOVER_COLOR};
      }
    `,
  },
};

export const StyledButton = createComponent('button', 'Button');

interface ButtonIconProps {
  iconSpacing?: string;
  left?: boolean;
  disabledIconEvents?: boolean;
}

export const ButtonIcon = styled.span`
  ${({ iconSpacing, left, disabledIconEvents }: ButtonIconProps) => css`
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

export const ButtonSpinner = styled.div`
  ${({ iconSpacing }: { iconSpacing?: string }) => css`
    margin-right: ${iconSpacing};
  `};
`;
