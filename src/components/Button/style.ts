import styled, { css } from 'styled-components';

import { robotoRegular } from '../../mixins/typography';
import { noUserSelect } from '../../mixins/user-selection';
import {
  ComponentVariantProps,
  createComponent,
} from '../../theme/create-component';

export default {
  baseStyle: css`
    min-width: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    outline: none;
    border: none;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    transition: 0.15s background-color, 0.15s box-shadow;
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
      padding: 0px 16px;
      border: 1px solid ${colors.blue['500']};
      color: ${colors.blue['500']};

      &:hover {
        background-color: rgba(33, 150, 243, 0.2);
      }
    `,
    primary: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 16px;
      color: #fff;
      background-color: ${colors.blue['500']};

      &:hover {
        background-color: ${colors.blue['700']};
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
