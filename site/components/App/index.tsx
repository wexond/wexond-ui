import * as React from 'react';

import { GlobalStyle, Ripple, Textfield, Dropdown } from '../../../src';
import { AppContainer, RippleContainer } from './styles';

export default () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Dropdown />
    </AppContainer>
  );
};
