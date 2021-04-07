import styled, { keyframes } from 'styled-components';

const skeletonAnimation = keyframes`
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
`;

export const Skeleton = styled.div`
  border-radius: 8px;
  line-height: 1;
  display: inline-block;
  overflow: hidden;
  position: relative;
  top: 0;
  background-color: rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    width: 70%;
    height: 100%;
    top: 0;
    left: -100%;
    position: absolute;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.16) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
  }
`;
