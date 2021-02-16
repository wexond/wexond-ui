import styled, { css } from 'styled-components';
import { createComponent } from '~/system/create-component';

import { Theme } from '~/theme/theme';

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.1s background-color, 0.1s box-shadow;

  &:focus {
    box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
  }

  &:hover {
    background-color: rgb(70, 70, 70);
  }
`;

const sizes = {
  md: css`
    min-width: 64px;
    padding: 0 12px;
    font-size: 13px;
  `,
  small: css`
    height: 100px;
  `,
};

const variants = {
  text: css`
    background-color: transparent;
    color: red;
  `,
  outlined: css`
    background-color: transparent;
    border: 1px solid red;
  `,
};

export default {
  baseStyle,
  sizes,
  variants,
};

export const StyledButton = createComponent('button', 'Button');

// export const StyledButton = styled.button`
//   ${({
//     variant,
//     theme,
//   }: {
//     variant: Theme['components']['Button']['variants'];
//     theme: Theme;
//   }) => css`
//     ${theme.components['Button'].baseStyle}
//     ${theme.components['Button'].variants[variant]}
//   `}/* height: 32px;
//   min-width: 64px;
//   padding: 0 12px;
//   border-radius: 4px;
//   font-size: 13px;
//   color: #fff;
//   background-color: rgb(50, 50, 50);
//   border: none;
//   outline: none;
//   cursor: pointer;
//   transition: 0.1s background-color, 0.1s box-shadow;

//   &:focus {
//     box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.54);
//   }

//   &:hover {
//     background-color: rgb(70, 70, 70);
//   } */
// `;

export const ButtonIcon = styled.span`
  ${({ spacing }: { spacing?: string }) => css`
    margin-left: ${spacing};
  `}
`;
