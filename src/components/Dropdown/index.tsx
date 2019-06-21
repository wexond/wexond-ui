import * as React from 'react';

import { StyledDropdown, Label, DropIcon, Menu } from './styles';

interface Props {
  defaultValue?: string;
  children?: any;
}

interface State {
  activated: boolean;
  selected?: string;
}

export class Dropdown extends React.PureComponent<Props, State> {
  public state: State = {
    activated: false,
  };

  public componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  public onClick = () => {
    this.setState({ activated: true });

    requestAnimationFrame(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  };

  public onWindowClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    requestAnimationFrame(() => {
      this.setState({ activated: false });
      window.removeEventListener('click', this.onWindowClick);
    });
  };

  public onItemClick = (label: string) => () => {
    if (label == null) return;

    this.setState({ selected: label });
  };

  public get value() {
    const { defaultValue } = this.props;
    const { selected } = this.state;
    return selected || defaultValue;
  }

  render() {
    const { children } = this.props;
    const { activated } = this.state;

    return (
      <StyledDropdown activated={activated} onClick={this.onClick}>
        <Label>{this.value}</Label>
        <DropIcon />
        <Menu visible={activated}>
          {React.Children.map(children, child => {
            const { label } = child.props;
            return React.cloneElement(child, {
              selected: this.value === label,
              onClick: this.onItemClick(label),
            });
          })}
        </Menu>
      </StyledDropdown>
    );
  }
}
