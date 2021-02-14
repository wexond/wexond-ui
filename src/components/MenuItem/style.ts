import styled, { css } from 'styled-components';

import { Icon } from '../Icon';

export const StyledMenuItem = styled.li`
  width: 100%;
  height: 32px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  align-items: center;
  position: relative;

  ${({ isSelected }: { isSelected?: boolean }) =>
    isSelected &&
    css`
      background-color: rgba(255, 255, 255, 0.12) !important;
    `}
`;

export const IconContainer = styled.div`
  position: absolute;
`;

export const Label = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ leftSpacing }: { leftSpacing?: string }) => css`
    margin-left: ${leftSpacing};
  `}
`;

export const Accelerator = styled.span`
  opacity: 0.54;
  text-align: right;
  flex: 2 1 auto;
  padding: 0 2em;
  white-space: nowrap;
`;

export const SubmenuIcon = styled(Icon)`
  margin-left: auto;
`;