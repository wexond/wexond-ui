import React from 'react';

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

export const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  step,
  arrowStep,
  onChange,
  ...props
}) => {
  const [isActive, setActive] = React.useState(false);
  const [isMoveActive, setMoveActive] = React.useState(false);

  const ref = React.useRef<HTMLDivElement | null>(null);
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

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      updateFromClient(e.pageX);
    },
    [updateFromClient],
  );

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (!trackRef.current) return;

      startLeft.current = trackRef.current.getBoundingClientRect().left;

      setActive(true);
      setMoveActive(true);

      updateFromClient(e.pageX);
    },
    [updateFromClient],
  );

  const onMouseUp = React.useCallback(() => {
    setMoveActive(false);
  }, []);

  const onWheel = React.useCallback(
    (e: WheelEvent | React.WheelEvent) => {
      update(_value - arrowStep! * Math.sign(e.deltaY));
    },
    [update, _value, arrowStep],
  );

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        update(_value + arrowStep!);
      } else if (e.key === 'ArrowLeft') {
        update(_value - arrowStep!);
      } else if (e.key === 'Escape') {
        e.stopPropagation();
        ref.current?.blur();
      }
    },
    [update, _value, arrowStep],
  );

  const onBlur = React.useCallback(() => {
    setActive(false);
    setMoveActive(false);
  }, []);

  React.useEffect(() => {
    if (isActive) {
      window.addEventListener('wheel', onWheel);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onChange, onWheel, onMouseUp, isActive]);

  React.useEffect(() => {
    if (isMoveActive) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onChange, isMoveActive, onMouseMove]);

  const percent = Math.round((_value / max!) * 100);

  return (
    <StyledSlider
      ref={ref}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onWheel={onWheel}
      {...props}
    >
      <SliderBackgroundTrack ref={trackRef} onMouseDown={onMouseDown}>
        <SliderTrack style={{ width: `${percent}%` }} />
        <SliderHandle style={{ left: `${percent}%` }} />
      </SliderBackgroundTrack>
    </StyledSlider>
  );
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  arrowStep: 5,
};
