import React from 'react';

import { ComponentProps } from '../../core/component';
import { minmax } from '../../utils/math';
import { mergeEvents, mergeRefs } from '../../utils/merge';
import { StyledScrollable, ScrollTrack, ScrollThumb, Container } from './style';

export interface ScrollableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {}

interface ScrollInfo {
  scrollSize: number;
  offsetSize: number;
  trackSize: number;
  thumbSize: number;
  scrollJump: number;
}

export const Scrollable = React.forwardRef<HTMLDivElement, ScrollableProps>(
  ({ children, onScroll, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const thumbRef = React.useRef<HTMLDivElement | null>(null);

    const startThumbPos = React.useRef<number>(0);
    const startScrollPos = React.useRef<number>(0);

    const mutationObserver = React.useRef<MutationObserver | null>(null);

    const info = React.useRef<ScrollInfo | null>(null);

    const updateThumb = React.useCallback(() => {
      requestAnimationFrame(() => {
        if (!containerRef.current || !thumbRef.current || !info.current) return;
        const scrollPos = containerRef.current.scrollLeft;

        const { scrollSize, trackSize, thumbSize } = info.current;
        const position = (scrollPos / scrollSize) * trackSize;

        thumbRef.current.style.width = `${thumbSize}px`;
        thumbRef.current.style.transform = `translateX(${position}px)`;
      });
    }, []);

    const _onScroll = React.useCallback(() => {
      updateThumb();
    }, [updateThumb]);

    const updateInfo = React.useCallback(() => {
      if (!containerRef.current || !thumbRef.current || !trackRef.current)
        return;

      const offsetSize = containerRef.current.offsetWidth;
      const scrollSize = containerRef.current.scrollWidth;

      const trackSize = trackRef.current.clientWidth - 6;
      const thumbSize = Math.round((offsetSize / scrollSize) * trackSize);

      const scrollTrackSpace = scrollSize - offsetSize;
      const scrollThumbSpace = offsetSize - thumbSize;

      const scrollJump = Math.round(scrollTrackSpace / scrollThumbSpace);

      info.current = {
        scrollSize,
        offsetSize,
        scrollJump,
        trackSize,
        thumbSize,
      };
    }, []);

    const updateScrollPos = React.useCallback((pos?: number) => {
      if (!containerRef.current || !info.current) return;

      const { scrollJump, scrollSize } = info.current;
      let delta = containerRef.current.scrollLeft;

      if (pos != null) {
        delta = pos - startThumbPos.current;
      }

      const scrollPos = minmax(
        startScrollPos.current + scrollJump * delta,
        0,
        scrollSize,
      );

      containerRef.current.scrollLeft = scrollPos;
    }, []);

    const _onWheel = React.useCallback((e: React.WheelEvent) => {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        containerRef.current.scrollLeft =
          containerRef.current.scrollLeft + e.deltaY;
      });
    }, []);

    const onWindowMouseMove = React.useCallback(
      (e: MouseEvent) => {
        updateScrollPos(e.pageX);
      },
      [updateScrollPos],
    );

    const onWindowMouseUp = React.useCallback(() => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    }, [onWindowMouseMove]);

    const onThumbMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        e.stopPropagation();

        startThumbPos.current = e.pageX;
        startScrollPos.current = containerRef.current.scrollLeft;

        window.addEventListener('mousemove', onWindowMouseMove);
        window.addEventListener('mouseup', onWindowMouseUp);
      },
      [onWindowMouseMove, onWindowMouseUp],
    );

    const onTrackMouseDown = React.useCallback((e: React.MouseEvent) => {
      if (!trackRef.current || !containerRef.current || !thumbRef.current)
        return;

      const rect = trackRef.current.getBoundingClientRect();
      const delta = e.pageX - rect.left;

      const percent = delta / trackRef.current.clientWidth;

      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth * percent;
    }, []);

    React.useEffect(() => {
      requestAnimationFrame(() => {
        updateInfo();
        updateThumb();
      });

      if (containerRef.current) {
        mutationObserver.current = new MutationObserver(() => {
          requestAnimationFrame(() => {
            updateInfo();
            updateThumb();
          });
        });
        mutationObserver.current.observe(containerRef.current, {
          attributes: true,
          childList: true,
          attributeFilter: ['style', 'class', 'id'],
        });
      }
    }, [updateInfo, updateThumb]);

    return (
      <StyledScrollable>
        <Container
          ref={mergeRefs(ref, containerRef)}
          {...mergeEvents({
            onScroll: [_onScroll, onScroll],
          })}
          {...props}
        >
          {children}
        </Container>
        <ScrollTrack
          ref={trackRef}
          onWheel={_onWheel}
          onMouseDown={onTrackMouseDown}
        >
          <ScrollThumb ref={thumbRef} onMouseDown={onThumbMouseDown} />
        </ScrollTrack>
      </StyledScrollable>
    );
  },
);
