import React from 'react';

import { ICON_CHECKED } from '../../constants/icons';
import { ComponentProps } from '../../core/component';
import { mergeEvents } from '../../utils/merge';
import { Icon } from '../Icon';
import { StyledCheckbox, Box, IconContainer } from './style';

export interface CheckboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    ComponentProps {
  isSelected?: boolean;
  value?: any;
  onChange?: (selected: boolean, value: any) => void;
  customClickHandler?: boolean;
  icon?: any;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      icon,
      isSelected,
      onChange,
      value,
      onClick,
      onKeyDown,
      customClickHandler,
      as,
      ...props
    },
    ref,
  ) => {
    const [_isSelected, _toggle] = React.useState(isSelected || false);
    const selected = isSelected == null ? _isSelected : isSelected;

    const toggle = React.useCallback(() => {
      onChange?.(!selected, value);

      if (isSelected == null) {
        _toggle(!selected);
      }
    }, [selected, isSelected, onChange, value]);

    const _onClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!customClickHandler) {
          e.stopPropagation();
          toggle();
        }
      },
      [toggle, customClickHandler],
    );

    const _onKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          toggle();
        }
      },
      [toggle],
    );

    const _icon =
      typeof icon === 'function'
        ? icon(selected)
        : icon || (
            <Icon
              src={ICON_CHECKED}
              boxSize="18px"
              iconSize="20px"
              {...props}
            />
          );

    const Root = as || StyledCheckbox;

    return (
      <Root
        ref={ref}
        tabIndex={-1}
        isSelected={selected}
        {...mergeEvents({
          onClick: [onClick, _onClick],
          onKeyDown: [onKeyDown, _onKeyDown],
        })}
        {...props}
      >
        <Box isSelected={selected} />
        <IconContainer isSelected={selected}>{_icon}</IconContainer>
      </Root>
    );
  },
);
