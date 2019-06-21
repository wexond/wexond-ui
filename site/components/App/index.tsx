import * as React from 'react';

import { GlobalStyle, Ripple, Textfield } from '../../../src';
import { AppContainer, RippleContainer } from './styles';

export default () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <RippleContainer>
        <Ripple />
      </RippleContainer>
      <br />
      <Textfield label='Label' />
    </AppContainer>
  );
};
