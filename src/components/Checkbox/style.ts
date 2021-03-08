import styled, { css } from 'styled-components';
import { DEFAULT_BUTTON_COLOR } from '../Button';

export const StyledCheckbox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  cursor: pointer;
  outline: none;
  transition: 0.15s background-color;

  ${({ isSelected }: { isSelected: boolean }) => css`
    &:hover,
    &:focus {
      background-color: ${isSelected
        ? `rgba(110, 198, 255, 0.08)`
        : `rgba(255, 255, 255, 0.08)`};
    }

    &:active {
      background-color: ${isSelected
        ? `rgba(110, 198, 255, 0.12)`
        : `rgba(255, 255, 255, 0.12)`};
    }
  `}
`;

export const Box = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  outline: none;
  border: none;
  padding: 0px;
  margin: 0px;
  transition: 0.2s background-color, 0.2s border-color;
  pointer-events: none;
  border: 2px solid rgba(255, 255, 255, 0.36);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isSelected }: { isSelected: boolean }) =>
    isSelected &&
    css`
      border-color: ${DEFAULT_BUTTON_COLOR};
      background-color: ${DEFAULT_BUTTON_COLOR};
    `}
`;

export const IconContainer = styled.div`
  position: absolute;

  ${({ isSelected }: { isSelected: boolean }) => css`
    clip-path: ${isSelected ? 'inset(0 0 0 0)' : 'inset(100% 50% 0 50%)'};
    transition: ${isSelected
      ? '1s clip-path cubic-bezier(0.19, 1, 0.22, 1)'
      : 'unset'};
  `}
`;
