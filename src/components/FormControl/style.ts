import styled, { css } from 'styled-components';

import { noUserSelect } from '../../mixins/user-selection';

export const StyledFormControl = styled.div`
  display: flex;

  ${({ horizontal }: { horizontal?: boolean }) =>
    horizontal
      ? css`
          align-items: center;
        `
      : css`
          flex-direction: column;
        `}
`;

export const FormLabel = styled.span`
  ${noUserSelect};

  ${({ horizontal, spacing }: { horizontal?: boolean; spacing?: string }) =>
    horizontal
      ? css`
          margin-right: ${spacing};
        `
      : css`
          margin-bottom: ${spacing};
        `}
`;
