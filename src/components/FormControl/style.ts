import styled, { css } from 'styled-components';

interface FormControlProps {
  vertical?: boolean;
  spacing?: string;
  ySpacing?: string;
}

export const StyledFormControl = styled.div`
  width: 100%;
  display: grid;
  align-items: center;

  ${({ vertical, spacing, ySpacing }: FormControlProps) => css`
    grid-template-columns: ${vertical ? '1fr' : 'min-content 1fr'};
    column-gap: ${spacing};
    row-gap: ${ySpacing};
  `}
`;
