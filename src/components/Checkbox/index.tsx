import React from 'react';

import { ICON_CHECKED } from '../../constants/icons';
import { mergeEvents } from '../../utils/react';
import { Icon, IconProps } from '../Icon';
import { StyledCheckbox, Box, IconContainer } from './style';

export interface CheckboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  isSelected?: boolean;
  value?: any;
  onChange: (selected: boolean, value: any) => void;
  icon?: any;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  (
    { icon, isSelected, onChange, value, onClick, onKeyDown, ...props },
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
              iconSize="18px"
              {...props}
            />
          );

    return (
      <StyledCheckbox
        ref={ref}
        tabIndex={-1}
        onClick={mergeEvents(onClick, toggle)}
        isSelected={selected}
        onKeyDown={mergeEvents(_onKeyDown, onKeyDown)}
        {...props}
      >
        <Box isSelected={selected} />
        <IconContainer isSelected={selected}>{_icon}</IconContainer>
      </StyledCheckbox>
    );
  },
);
