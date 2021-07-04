import React from 'react';

import { ICON_CHECKED } from '../../constants/icons';
import { ComponentProps } from '../../core/component';
import { mergeEvents } from '../../utils/merge';
import { Icon } from '../Icon';
import { StyledCheckbox, Box, IconContainer } from './style';

export interface CheckboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'>,
    ComponentProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  icon?: React.ElementType;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ icon, value, onChange, onClick, onKeyDown, as, ...props }, ref) => {
    const toggle = React.useCallback(() => {
      const newValue = !value;

      if (value !== newValue) {
        onChange?.(newValue);
      }
    }, [onChange, value]);

    const _onClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        toggle();
      },
      [toggle],
    );

    const _onKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          toggle();
        }
      },
      [toggle],
    );

    const _icon = icon || (
      <Icon src={ICON_CHECKED} boxSize="18px" iconSize="20px" {...props} />
    );

    const Root = as || StyledCheckbox;

    return (
      <Root
        ref={ref}
        tabIndex={-1}
        isSelected={value}
        {...mergeEvents({
          onClick: [onClick || _onClick],
          onKeyDown: [onKeyDown, _onKeyDown],
        })}
        {...props}
      >
        <Box isSelected={value} />
        <IconContainer isSelected={value}>{_icon}</IconContainer>
      </Root>
    );
  },
);

Checkbox.defaultProps = {
  value: false,
};
