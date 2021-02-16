import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { Theme, ThemeColors } from '~/theme/theme';

const getStyle = (style, props): FlattenSimpleInterpolation => {
  if (typeof style === 'function') return style(props);
  return style || '';
};

export interface ComponentProps<
  T extends {
    variants?: Record<string, unknown>;
    sizes?: Record<string, unknown>;
  }
> {
  variant?: keyof T['variants'];
  size?: keyof T['sizes'];
}

export type ComponentVariantProps = {
  theme: { colors: ThemeColors };
};

export const createComponent = <
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>
>(
  type: T,
  name: string,
) => {
  return styled(type)`
    ${(props: {
      theme?: Theme;
      size: string | undefined;
      variant: string | undefined;
    }) =>
      props.theme &&
      css`
        ${getStyle(props.theme.components[name].baseStyle, props)}
        ${getStyle(props.theme.components[name].sizes[props.size], props)}
        ${getStyle(props.theme.components[name].variants[props.variant], props)}
      `}
  `;
};
