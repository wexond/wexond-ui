import styled, { css } from 'styled-components';

export const ICON_VAR_URL = '--wexond-ui-icon-url';
export const ICON_VAR_SIZE = '--wexond-ui-icon-size';

export const StyledIcon = styled.div`
  ${({ useMask }: { useMask?: boolean }) =>
    useMask
      ? css`
          -webkit-mask-image: var(${ICON_VAR_URL});
          mask-position: center;
          mask-repeat: no-repeat;
          mask-size: var(${ICON_VAR_SIZE});
        `
      : css`
          background-image: var(${ICON_VAR_URL});
          background-position: center;
          background-repeat: no-repeat;
          background-size: var(${ICON_VAR_SIZE});
        `}
`;
