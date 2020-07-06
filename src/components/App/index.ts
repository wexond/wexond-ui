import styled from 'styled-components';

import { robotoRegular } from '~/mixins/typography';

export const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${robotoRegular()};
`;
