import React from 'react';
import styled, { css } from 'styled-components';

import {
  ThemeComponents,
  ThemeComponentVariants,
  ThemeComponentSizes,
  Theme,
} from '~/theme/theme';

export type ComponentProps<T extends ThemeComponents> = {
  variant?: ThemeComponentVariants<T>;
  size?: ThemeComponentSizes<T>;
};

export const createComponent = <
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  K extends ThemeComponents,
  L extends ThemeComponentVariants<K>,
  N extends ThemeComponentSizes<K>
>(
  type: T,
  name: K,
  defaultVariant?: L,
  defaultSize?: N,
) => {
  return styled(type)`
    ${({
      theme,
      size,
      variant,
    }: {
      theme?: Theme;
      size?: ThemeComponentSizes<K>;
      variant?: ThemeComponentVariants<K>;
    }) => css`
      ${theme?.components[name].baseStyle}
      ${theme?.components[name].sizes[(size || defaultSize) as any]}
      ${theme?.components[name].variants[(variant || defaultVariant) as any]}
    `}
  `;
};
