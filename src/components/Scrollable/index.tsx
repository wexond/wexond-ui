import React from 'react';

import { ComponentProps } from '../../core/component';
import { minmax } from '../../utils/math';
import { mergeEvents, mergeRefs } from '../../utils/merge';
import {
  StyledScrollable,
  ScrollTrack,
  ScrollThumb,
  Container,
  SCROLLBAR_THUMB_MARGIN,
} from './style';

export interface ScrollableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {}

const getScrollRatio = (viewportSize: number, contentSize: number) => {
  return viewportSize / contentSize;
};

const getThumbPos = (
  scrollPos: number,
  viewportSize: number,
  thumbSize: number,
  scrollRatio: number,
) => {
  return minmax(scrollPos * scrollRatio, 0, viewportSize);
};

const getScrollJump = (
  viewportSize: number,
  contentSize: number,
  thumbSize: number,
) => {
  const scrollTrackSpace = contentSize - viewportSize;
  const scrollThumbSpace = viewportSize - thumbSize; // - SCROLLBAR_THUMB_MARGIN * 4;

  return Math.round(scrollTrackSpace / scrollThumbSpace);
};

const getScrollPosition = (
  scrollJump: number,
  startPos: number,
  delta: number,
  contentSize: number,
) => {
  return minmax(startPos + scrollJump * delta, 0, contentSize);
};

const getThumbSize = (
  viewportSize: number,
  contentSize: number,
  trackWidth: number,
  trackOffset: number,
) => {
  const viewableRatio = viewportSize / contentSize;
  const scrollBarArea = trackWidth; // - SCROLLBAR_THUMB_MARGIN * 2;
  console.log(scrollBarArea);
  return Math.round(scrollBarArea * viewableRatio);
};

const getContentSize = (viewportSize: number, scrollSize: number) => {
  return scrollSize - viewportSize;
};

export const Scrollable = React.forwardRef<HTMLDivElement, ScrollableProps>(
  ({ children, onScroll, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const thumbRef = React.useRef<HTMLDivElement | null>(null);

    const startThumbPos = React.useRef<number>(0);
    const startScrollTop = React.useRef<number>(0);

    const mutationObserver = React.useRef<MutationObserver | null>(null);

    const _onScroll = React.useCallback(() => {
      if (!containerRef.current || !thumbRef.current) return;

      const { clientWidth, scrollWidth, scrollLeft } = containerRef.current;

      const contentSize = getContentSize(clientWidth, scrollWidth);
      const scrollRatio = getScrollRatio(clientWidth, contentSize);
      const thumbPos = getThumbPos(
        scrollLeft,
        clientWidth,
        thumbRef.current.clientWidth,
        scrollRatio,
      );

      console.log(scrollLeft, scrollRatio);

      thumbRef.current.style.transform = `translateX(${thumbPos}px)`;

      console.log(`scroll: ${scrollLeft}/${contentSize}`);
    }, []);

    const onWindowMouseMove = React.useCallback((e: MouseEvent) => {
      if (!containerRef.current || !thumbRef.current) return;

      const delta = e.pageX - startThumbPos.current;

      const { clientWidth, scrollWidth } = containerRef.current;
      const contentSize = getContentSize(clientWidth, scrollWidth);

      const scrollJump = getScrollJump(
        contentSize,
        scrollWidth,
        thumbRef.current.clientWidth,
      );

      const scrollPos = getScrollPosition(
        scrollJump,
        startScrollTop.current,
        delta,
        scrollWidth,
      );

      containerRef.current.scrollLeft = scrollPos;
    }, []);

    const onWindowMouseUp = React.useCallback(() => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    }, [onWindowMouseMove]);

    const onThumbMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        startThumbPos.current = e.pageX;
        startScrollTop.current = containerRef.current.scrollLeft;

        window.addEventListener('mousemove', onWindowMouseMove);
        window.addEventListener('mouseup', onWindowMouseUp);
      },
      [onWindowMouseMove, onWindowMouseUp],
    );

    const updateThumbSize = React.useCallback(() => {
      if (!thumbRef.current || !containerRef.current || !trackRef.current)
        return;

      const { scrollWidth, clientWidth } = containerRef.current;
      const contentSize = getContentSize(clientWidth, scrollWidth);

      const thumbSize = getThumbSize(
        clientWidth,
        scrollWidth,
        trackRef.current.clientWidth,
        trackRef.current.offsetLeft,
      );

      console.log(thumbSize, trackRef.current.clientWidth);

      thumbRef.current.style.width = thumbSize + 'px';
    }, []);

    React.useEffect(() => {
      if (containerRef.current) {
        const observer = new MutationObserver(() => {
          updateThumbSize();
        });

        observer.observe(containerRef.current, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }

      setTimeout(() => {
        updateThumbSize();
      }, 1);
    }, [updateThumbSize]);

    return (
      <StyledScrollable>
        <Container
          ref={mergeRefs(ref, containerRef)}
          {...mergeEvents({ onScroll: [_onScroll, onScroll] })}
          {...props}
        >
          {children}
        </Container>
        <ScrollTrack ref={trackRef}>
          <ScrollThumb ref={thumbRef} onMouseDown={onThumbMouseDown} />
        </ScrollTrack>
      </StyledScrollable>
    );
  },
);
