import * as React from 'react';

import { GlobalStyle, Ripple } from '../../../src';
import { AppContainer, RippleContainer } from './styles';

export default () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <RippleContainer>
        <Ripple />
      </RippleContainer>
    </AppContainer>
  );
};
