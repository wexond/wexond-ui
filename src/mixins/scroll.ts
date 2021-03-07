import { css } from 'styled-components';

export interface ScrollOptions {
  size?: string;
  borderRadius?: string;
  color?: string;
  hoverColor?: string;
  alwaysVisible?: boolean;
  activeColor?: string;
}

const defaultOptions: ScrollOptions = {
  size: '6px',
  borderRadius: '0px',
  alwaysVisible: true,
  color: 'rgba(0, 0, 0, 0.16)',
  hoverColor: 'rgba(0, 0, 0, 0.38)',
  activeColor: 'rgba(0, 0, 0, 0.52)',
};

export const noButtons = (options?: ScrollOptions) => {
  const {
    color,
    hoverColor,
    size,
    alwaysVisible,
    borderRadius,
    activeColor,
  } = {
    ...defaultOptions,
    ...options,
  };

  return css`
    &:hover::-webkit-scrollbar-thumb {
      background-color: ${color};
    }

    &::-webkit-scrollbar {
      width: ${size};
      height: ${size};
    }

    &::-webkit-scrollbar-button {
      width: 0px;
      height: 0px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${alwaysVisible ? color : 'inherit'};
      border: none;
      border-radius: ${borderRadius};
      opacity: 0 !important;
      transition: 0.3s background-color;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${hoverColor};
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: ${activeColor};
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  `;
};
