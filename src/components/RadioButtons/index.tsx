import * as React from 'react';

import { RadioButtonProps } from '../RadioButton';

export interface RadioButtonsProps {
  value?: any;
  onSelect?: (value: any, previousValue: any) => void;
  children?: React.ReactNode;
}

const propsAreEqual = (prev: RadioButtonsProps, next: RadioButtonsProps) => {
  return (
    prev.value === next.value &&
    prev.onSelect === next.onSelect &&
    prev.children === next.children
  );
};

export const RadioButtons = React.memo(
  ({ value, onSelect, children }: RadioButtonsProps) => {
    return React.Children.map(children, (child: any) => {
      const { value: childValue } = child.props;

      return React.cloneElement(child, {
        selected: value === childValue,
        onClick: () => onSelect(childValue, value),
      });
    });
  },
  propsAreEqual,
);
