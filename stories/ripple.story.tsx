import React from 'react';
import { color, number } from '@storybook/addon-knobs';
import styled, { css } from 'styled-components';

import { DEFAULT_DECORATORS } from './decorators';
import { lightTheme } from '~/constants/themes';
import Ripple from '~/components/Ripple';

const StyledContainer = styled.div`
  width: 128px;
  height: 128px;
  position: relative;

  ${({ color }: { color: string }) => css`
    border: 1px solid ${color};
  `}
`;

export const Default = () => {
  const _color = color('Color', lightTheme.accentColor);
  const { opacity, rippleTime, fadeOutTime } = Ripple.defaultProps;

  const opts = { step: 0.1 };

  return (
    <StyledContainer color={_color}>
      <Ripple
        color={_color}
        opacity={number('Opacity', opacity, opts)}
        rippleTime={number('Ripple time', rippleTime, opts)}
        fadeOutTime={number('Fadeout time', fadeOutTime, opts)}
      />
    </StyledContainer>
  );
};

export default {
  title: 'Ripple',
  decorators: DEFAULT_DECORATORS,
};
