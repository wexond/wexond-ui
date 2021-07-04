import styled, { css } from 'styled-components';
import { DEFAULT_BUTTON_COLOR } from '../Button';

export const StyledCheckbox = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  position: relative;
  will-change: background-color;

  ${({ isSelected }: { isSelected?: boolean }) => css`
    &:after {
      transition: 0.15s background-color;
      content: '';
      position: absolute;
      border-radius: 32px;
      inset: -9px;
      pointer-events: none;
    }

    &:hover,
    &:focus {
      &:after {
        content: '';
        position: absolute;
        background-color: ${isSelected
          ? `rgba(110, 198, 255, 0.08)`
          : `rgba(255, 255, 255, 0.08)`};
      }
    }

    &:active {
      &:after {
        background-color: ${isSelected
          ? `rgba(110, 198, 255, 0.12)`
          : `rgba(255, 255, 255, 0.12)`};
      }
    }
  `}
`;

export const Box = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  outline: none;
  border: none;
  padding: 0px;
  margin: 0px;
  will-change: background-color, border-color;
  transition: 0.2s background-color, 0.2s border-color;
  pointer-events: none;
  border: 2px solid rgba(255, 255, 255, 0.56);
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isSelected }: { isSelected?: boolean }) =>
    isSelected &&
    css`
      border-color: ${DEFAULT_BUTTON_COLOR};
      background-color: ${DEFAULT_BUTTON_COLOR};
    `}
`;

export const IconContainer = styled.div`
  position: absolute;
  will-change: clip-path;

  ${({ isSelected }: { isSelected?: boolean }) => css`
    clip-path: ${isSelected ? 'inset(0 0 0 0)' : 'inset(100% 50% 0 50%)'};
    transition: ${isSelected
      ? '1s clip-path cubic-bezier(0.19, 1, 0.22, 1)'
      : 'unset'};
  `}
`;

export * from './style';
