import { css } from 'styled-components';

import { robotoRegular } from '../../mixins/typography';
import {
  ComponentVariantProps,
  createComponent,
} from '../../theme/create-component';

export default {
  baseStyle: css`
    min-width: 64px;
    border: none;
    outline: none;
    cursor: text;
    border-radius: 4px;
    will-change: box-shadow;
    transition: 0.15s box-shadow;

    &:hover {
      border-color: rgba(255, 255, 255, 0.48);
    }

    &:focus {
      border-color: rgba(100, 181, 246, 0.54);
      box-shadow: 0 0 0 1px rgba(100, 181, 246, 0.54);
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
    filled: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 12px;
      background-color: rgb(50, 50, 50);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `,
    outlined: ({ theme: { colors } }: ComponentVariantProps) => css`
      padding: 0px 12px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      background-color: transparent;
    `,
  },
};

export const StyledInput = createComponent('input', 'Input');
