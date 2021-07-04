import styled, { css } from 'styled-components';

export interface GroupControlProps {
  reversed?: boolean;
  spacing?: string;
  rowSpacing?: string;
}

export const GroupControl = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr;

  align-items: center;

  ${({ reversed, spacing, rowSpacing }: GroupControlProps) =>
    css`
      column-gap: ${spacing};
      row-gap: ${rowSpacing};

      ${reversed &&
      css`
        grid-template-columns: 1fr min-content;
      `}
    `}
`;

GroupControl.defaultProps = {
  spacing: '16px',
  rowSpacing: '12px',
};

export const GroupLabel = styled.div`
  font-size: 13px;
`;
