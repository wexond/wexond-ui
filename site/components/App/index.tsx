import * as React from 'react';

import {
  GlobalStyle,
  Ripple,
  Textfield,
  Dropdown,
  MenuItem,
} from '../../../src';
import { AppContainer, RippleContainer } from './styles';

export default () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Dropdown defaultValue='Item 1'>
        <MenuItem label='Item 1' />
        <MenuItem label='Item 2' />
        <MenuItem label='Item 3' />
        <MenuItem label='Item 4' />
      </Dropdown>
    </AppContainer>
  );
};
