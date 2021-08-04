import React from 'react';

import { ComponentProps } from '../../core/component';
import { minmax } from '../../utils/math';
import { mergeEvents, mergeRefs } from '../../utils/merge';
import {
  StyledScrollable,
  ScrollTrack,
  ScrollThumb,
  Container,
  TRACK_MARGIN,
} from './style';

export interface ScrollableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {
  isHorizontal?: boolean;
  trackStyle?: React.CSSProperties;
}

interface ScrollInfo {
  scrollSize: number;
  offsetSize: number;
  trackSize: number;
  thumbSize: number;
  scrollJump: number;
}

export const Scrollable = React.forwardRef<HTMLDivElement, ScrollableProps>(
  ({ children, isHorizontal, onScroll, trackStyle, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const thumbRef = React.useRef<HTMLDivElement | null>(null);

    const startThumbPos = React.useRef<number>(0);
    const startScrollPos = React.useRef<number>(0);

    const mutationObserver = React.useRef<MutationObserver | null>(null);

    const info = React.useRef<ScrollInfo | null>(null);

    const axisSizeProperty = isHorizontal ? 'Width' : 'Height';
    const axisProperty = isHorizontal ? 'Left' : 'Top';

    const updateThumb = React.useCallback(() => {
      requestAnimationFrame(() => {
        if (!containerRef.current || !thumbRef.current || !info.current) return;
        const scrollPos = containerRef.current[`scroll${axisProperty}`];

        const { scrollSize, trackSize, thumbSize } = info.current;
        const position = (scrollPos / scrollSize) * trackSize;

        if (isHorizontal) {
          thumbRef.current.style.width = `${thumbSize}px`;
          thumbRef.current.style.transform = `translateX(${position}px)`;
        } else {
          thumbRef.current.style.height = `${thumbSize}px`;
          thumbRef.current.style.transform = `translateY(${position}px)`;
        }
      });
    }, [axisProperty, isHorizontal]);

    const _onScroll = React.useCallback(() => {
      updateThumb();
    }, [updateThumb]);

    const updateInfo = React.useCallback(() => {
      if (!containerRef.current || !thumbRef.current || !trackRef.current)
        return;

      const offsetSize = containerRef.current[`offset${axisSizeProperty}`];
      const scrollSize = containerRef.current[`scroll${axisSizeProperty}`];

      trackRef.current.style.display =
        offsetSize === scrollSize ? 'none' : 'flex';

      const trackSize =
        trackRef.current[`client${axisSizeProperty}`] - TRACK_MARGIN * 2;

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
    }, [axisSizeProperty]);

    const updateScrollPos = React.useCallback(
      (pos?: number) => {
        if (!containerRef.current || !info.current) return;

        const { scrollJump, scrollSize } = info.current;
        let delta = containerRef.current[`scroll${axisProperty}`];

        if (pos != null) {
          delta = pos - startThumbPos.current;
        }

        const scrollPos = minmax(
          startScrollPos.current + scrollJump * delta,
          0,
          scrollSize,
        );

        containerRef.current[`scroll${axisProperty}`] = scrollPos;
      },
      [axisProperty],
    );

    const _onWheel = React.useCallback(
      (e: React.WheelEvent) => {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          containerRef.current[`scroll${axisProperty}`] =
            containerRef.current[`scroll${axisProperty}`] + e.deltaY;
        });
      },
      [axisProperty],
    );

    const onWindowMouseMove = React.useCallback(
      (e: MouseEvent) => {
        updateScrollPos(isHorizontal ? e.pageX : e.pageY);
      },
      [updateScrollPos, isHorizontal],
    );

    const onWindowMouseUp = React.useCallback(() => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    }, [onWindowMouseMove]);

    const onThumbMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        e.stopPropagation();

        startThumbPos.current = isHorizontal ? e.pageX : e.pageY;
        startScrollPos.current = containerRef.current[`scroll${axisProperty}`];

        window.addEventListener('mousemove', onWindowMouseMove);
        window.addEventListener('mouseup', onWindowMouseUp);
      },
      [onWindowMouseMove, onWindowMouseUp, axisProperty, isHorizontal],
    );

    const onTrackMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (!trackRef.current || !containerRef.current || !thumbRef.current)
          return;

        const rect = trackRef.current.getBoundingClientRect();

        const delta = isHorizontal ? e.pageX - rect.left : e.pageY - rect.top;

        const percent = delta / trackRef.current[`client${axisSizeProperty}`];

        containerRef.current[`scroll${axisProperty}`] =
          containerRef.current[`scroll${axisSizeProperty}`] * percent;
      },
      [axisSizeProperty, axisProperty, isHorizontal],
    );

    const updateAll = React.useCallback(() => {
      requestAnimationFrame(() => {
        updateInfo();
        updateThumb();
      });
    }, [updateInfo, updateThumb]);

    React.useEffect(() => {
      updateAll();

      if (containerRef.current) {
        mutationObserver.current = new MutationObserver(() => {
          updateAll();
        });
        mutationObserver.current.observe(containerRef.current, {
          attributes: true,
          childList: true,
          attributeFilter: ['style', 'class', 'id'],
        });
      }

      return () => {
        mutationObserver.current?.disconnect();
      };
    }, [updateAll]);

    const onWindowResize = React.useCallback(() => {
      updateAll();
    }, [updateAll]);

    React.useEffect(() => {
      return () => {
        window.removeEventListener('mousemove', onWindowMouseMove);
        window.removeEventListener('mouseup', onWindowMouseUp);
      };
    }, [onWindowMouseMove, onWindowMouseUp]);

    React.useEffect(() => {
      window.addEventListener('resize', onWindowResize);

      return () => {
        window.removeEventListener('resize', onWindowResize);
      };
    }, [onWindowResize]);

    return (
      <StyledScrollable isHorizontal={isHorizontal}>
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
          isHorizontal={isHorizontal}
          style={trackStyle}
        >
          <ScrollThumb
            ref={thumbRef}
            onMouseDown={onThumbMouseDown}
            isHorizontal={isHorizontal}
          />
        </ScrollTrack>
      </StyledScrollable>
    );
  },
);
