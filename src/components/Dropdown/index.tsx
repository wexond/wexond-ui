import * as React from 'react';

import { StyledDropdown, Label, DropIcon, Menu, MenuItem } from './styles';

interface Props {
  children?: any;
}

interface State {
  activated: boolean;
}

export class Dropdown extends React.PureComponent<Props, State> {
  public state: State = {
    activated: false,
  };

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

  render() {
    const { activated } = this.state;

    return (
      <StyledDropdown activated={activated} onClick={this.onClick}>
        <Label>Label</Label>
        <DropIcon />
        <Menu visible={activated}>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
        </Menu>
      </StyledDropdown>
    );
  }
}
