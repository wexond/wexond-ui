import styled, { css } from 'styled-components';

import { robotoRegular, centerIcon, shadows } from '../../mixins';
import { transparency, icons } from '../../constants';

export const StyledDropdown = styled.div`
  width: 112px;
  height: 48px;
  position: relative;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  user-select: none;
  background-color: #f5f5f5;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-sizing: content-box;
  transition: 0.15s border-bottom;

  ${({ activated }: { activated: boolean }) => css`
    border-bottom: ${activated ? '1px solid transparent' : '1px solid rgba(0, 0, 0, 0.42)'};
  `}
`;

export const Label = styled.div`
  margin-left: 16px;
  font-size: 16px;
  ${robotoRegular()};
`;

export const DropIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: 8px;
  opacity: ${transparency.icons.inactive};
  background-image: url(${icons.drop});
  ${centerIcon(24)};
`;

export const Menu = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 4px;
  overflow: hidden;
  position: absolute;
  top: 100%;
  z-index: 1000;
  padding: 8px 0px;
  background-color: #fff;
  transition: 0.15s opacity;
  box-shadow: ${shadows(3)};

  ${({ visible }: { visible: boolean }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
    opacity: ${visible ? 1 : 0};
  `}
`;
