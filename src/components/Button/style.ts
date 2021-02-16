import styled, { css } from 'styled-components';

import { robotoMedium } from '~/mixins/typography';
import { noUserSelect } from '~/mixins/user-selection';
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
    transition: 0.1s background-color, 0.1s box-shadow;
    position: relative;
    ${robotoMedium}
    ${noUserSelect}

    &:focus {
      box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
    }
  `,
  sizes: {
    md: css`
      height: 32px;
      font-size: 13px;
    `,
  },
  variants: {
    contained: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 16px;
      color: #fff;
      background-color: ${colors.blue['500']};

      &:hover {
        background-color: ${colors.blue['700']};
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
    text: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 8px;
      color: ${colors.blue['500']};

      &:hover {
        background-color: rgba(33, 150, 243, 0.2);
      }
    `,
  },
};

export const StyledButton = createComponent('button', 'Button');

export const ButtonIcon = styled.span`
  ${({ iconSpacing, left }: { iconSpacing?: string; left?: boolean }) =>
    left
      ? css`
          margin-right: ${iconSpacing};
        `
      : css`
          margin-left: ${iconSpacing};
        `}
`;

export const ButtonSpinner = styled.div`
  ${({ iconSpacing }: { iconSpacing?: string }) => css`
    margin-right: ${iconSpacing};
  `};
`;
