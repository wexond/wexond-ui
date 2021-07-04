import React from 'react';
import { mergeEvents } from '../../utils/merge';

import {
  SLIDER_HANDLE_SIZE,
  StyledSlider,
  SliderBackgroundTrack,
  SliderTrack,
  SliderHandle,
} from './style';

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  arrowStep?: number;
  onChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      min,
      max,
      step,
      arrowStep,
      onChange,
      onKeyDown,
      onBlur,
      onWheel,
      onMouseDown,
      ...props
    },
    ref,
  ) => {
    const [isActive, setActive] = React.useState(false);
    const [isMoveActive, setMoveActive] = React.useState(false);

    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const startLeft = React.useRef<number>();

    const _value = value ?? 0;

    const update = React.useCallback(
      (newValue: number) => {
        newValue = Math.max(min!, Math.min(newValue, max!));

        if (onChange != null && _value !== newValue) {
          onChange(newValue);
        }
      },
      [onChange, _value, min, max],
    );

    const updateFromClient = React.useCallback(
      (clientX: number) => {
        if (startLeft.current == null || !trackRef.current) return;

        const pos = clientX - startLeft.current - SLIDER_HANDLE_SIZE / 2;

        const newValue =
          Math.round(((pos / trackRef.current.offsetWidth) * max!) / step!) *
          step!;

        update(newValue);
      },
      [max, step, update],
    );

    const _onMouseMove = React.useCallback(
      (e: MouseEvent) => {
        updateFromClient(e.pageX);
      },
      [updateFromClient],
    );

    const _onMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (!trackRef.current) return;

        startLeft.current = trackRef.current.getBoundingClientRect().left;

        setActive(true);
        setMoveActive(true);

        updateFromClient(e.pageX);
      },
      [updateFromClient],
    );

    const _onMouseUp = React.useCallback(() => {
      setMoveActive(false);
    }, []);

    const _onWheel = React.useCallback(
      (e: WheelEvent | React.WheelEvent) => {
        update(_value - arrowStep! * Math.sign(e.deltaY));
      },
      [update, _value, arrowStep],
    );

    const _onKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
          update(_value + arrowStep!);
        } else if (e.key === 'ArrowLeft') {
          update(_value - arrowStep!);
        } else if (e.key === 'Escape') {
          e.stopPropagation();
          trackRef?.current?.parentElement?.blur();
        }
      },
      [update, _value, arrowStep],
    );

    const _onBlur = React.useCallback(() => {
      setActive(false);
      setMoveActive(false);
    }, []);

    React.useEffect(() => {
      if (isActive) {
        window.addEventListener('wheel', _onWheel);
        window.addEventListener('mouseup', _onMouseUp);
      }

      return () => {
        window.removeEventListener('wheel', _onWheel);
        window.removeEventListener('mouseup', _onMouseUp);
      };
    }, [onChange, _onWheel, _onMouseUp, isActive]);

    React.useEffect(() => {
      if (isMoveActive) {
        window.addEventListener('mousemove', _onMouseMove);
      }

      return () => {
        window.removeEventListener('mousemove', _onMouseMove);
      };
    }, [onChange, isMoveActive, _onMouseMove]);

    const percent = Math.round((_value / max!) * 100);

    return (
      <StyledSlider
        ref={ref}
        tabIndex={-1}
        {...mergeEvents({
          onKeyDown: [onKeyDown, _onKeyDown],
          onBlur: [onBlur, _onBlur],
          onWheel: [onWheel, _onWheel],
        })}
        {...props}
      >
        <SliderBackgroundTrack
          ref={trackRef}
          {...mergeEvents({
            onMouseDown: [onMouseDown, _onMouseDown],
          })}
        >
          <SliderTrack style={{ width: `${percent}%` }} />
          <SliderHandle style={{ left: `${percent}%` }} />
        </SliderBackgroundTrack>
      </StyledSlider>
    );
  },
);

Slider.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  arrowStep: 5,
};
