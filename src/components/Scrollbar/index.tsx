import React from 'react';

import {
  ScrollbarThumb,
  ScrollTrack,
  StyledScrollbar,
  ScrollThumbContainer,
} from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
  hoveredThumbSize?: string | number;
  size?: string | number;
  container?: HTMLElement;
  invert?: boolean;
}

export const Scrollbar = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { horizontal, size, hoveredThumbSize, container, invert } = props;

    const thumbContainer = React.useRef<HTMLDivElement>(null);
    const thumbRef = React.useRef<HTMLDivElement>(null);
    const interval = React.useRef<any>();
    const isMouseDown = React.useRef<boolean>();

    const sizeComponent = horizontal ? 'Width' : 'Height';
    const sizeComponentLC = sizeComponent.toLowerCase();
    const posComponent = horizontal ? 'Left' : 'Top';
    const posComponentLC = posComponent.toLowerCase();

    const onMouseMove = React.useCallback(
      (event: any) => {
        if (
          !thumbRef.current ||
          !thumbContainer.current ||
          !container ||
          !isMouseDown.current
        )
          return;

        const scrollSize = container[`scroll${sizeComponent}`];
        const scrollbarSize = thumbContainer.current[`offset${sizeComponent}`];
        const scrollbarPos = thumbContainer.current[`offset${posComponent}`];
        const thumbSize = thumbRef.current[`offset${sizeComponent}`];

        const relativeMousePos =
          event[horizontal ? 'pageX' : 'pageY'] +
          thumbContainer.current[`offset${posComponent}`];

        const thumbPos =
          thumbDragStartPos.current! +
          relativeMousePos -
          mouseStartPos.current!;
        if (
          thumbPos < 0 ||
          thumbPos + thumbSize! >= scrollbarSize + scrollbarPos
        )
          return;

        thumbRef.current.style[posComponentLC] = `${thumbPos}px`;

        container[`scroll${posComponent}`] =
          (thumbPos / scrollbarSize) * scrollSize;
      },
      [
        container,
        sizeComponent,
        horizontal,
        posComponent,
        posComponentLC,
        isMouseDown,
      ],
    );

    const updateThumb = React.useCallback(() => {
      if (!container || !thumbContainer.current || !thumbRef.current) return;

      const scrollSize = container[`scroll${sizeComponent}`];
      const offsetSize = container[`offset${sizeComponent}`];
      const scrollPos = container[`scroll${posComponent}`];

      const scrollbarSize = thumbContainer.current[`offset${sizeComponent}`];
      const size = (offsetSize / scrollSize) * scrollbarSize;
      const position = (scrollPos / scrollSize) * scrollbarSize;

      thumbRef.current.style[sizeComponentLC] = `${size}px`;
      thumbRef.current.style[posComponentLC] = `${position}px`;
    }, [
      container,
      sizeComponent,
      posComponent,
      posComponentLC,
      sizeComponentLC,
    ]);

    const lastScrollSize = React.useRef<number>();

    const resizeObserver = React.useRef<ResizeObserver>(
      new ResizeObserver(() => updateThumb()),
    );
    const prevContainer = React.useRef<HTMLElement>();

    const clearListeners = React.useCallback(
      (container: HTMLElement) => {
        clearTimeout(interval.current);
        container.removeEventListener('scroll', updateThumb);
        resizeObserver.current.unobserve(container);
        window.removeEventListener('mousemove', onMouseMove);
      },
      [onMouseMove, updateThumb],
    );

    if (container !== prevContainer.current) {
      if (prevContainer.current) clearListeners(prevContainer.current);

      prevContainer.current = container;

      if (container) {
        resizeObserver.current.observe(container);

        interval.current = setInterval(() => {
          if (!container) return;
          const scrollSize = container[`scroll${sizeComponent}`];
          if (lastScrollSize.current === scrollSize) return;

          updateThumb();
        }, 100);

        container.addEventListener('scroll', updateThumb);
        window.addEventListener('mousemove', onMouseMove);
      }

      updateThumb();
    }

    const thumbDragStartPos = React.useRef<number>();
    const mouseStartPos = React.useRef<number>();

    const onMouseDown = React.useCallback(
      (event: React.MouseEvent) => {
        isMouseDown.current = true;
        if (!thumbRef.current || !thumbContainer.current) return;

        thumbDragStartPos.current =
          thumbRef.current[`offset${posComponent}`] -
          thumbContainer.current[`offset${posComponent}`];

        mouseStartPos.current = event[horizontal ? 'pageX' : 'pageY'];
      },
      [horizontal, posComponent],
    );

    const onMouseUp = React.useCallback(() => {
      isMouseDown.current = false;
    }, [isMouseDown]);

    React.useEffect(() => {
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mouseup', onMouseUp);

        if (container) clearListeners(container);
      };
    }, [clearListeners, container, onMouseUp]);

    const hoveredThumbSizeReal = hoveredThumbSize ?? '6px';

    return (
      <StyledScrollbar
        ref={ref}
        horizontal={horizontal}
        hoveredThumbSize={hoveredThumbSizeReal}
        size={size ?? 16}
        {...props}
      >
        <ScrollTrack
          size={size ?? 16}
          horizontal={horizontal}
          hoveredThumbSize={hoveredThumbSizeReal}
        >
          <ScrollThumbContainer horizontal={horizontal} ref={thumbContainer}>
            <ScrollbarThumb
              ref={thumbRef}
              horizontal={horizontal}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              invert={invert}
            />
          </ScrollThumbContainer>
        </ScrollTrack>
      </StyledScrollbar>
    );
  },
);
