import * as React from 'react';

import { getRippleSize } from '~/utils/ripple';
import { StyledRipple, Container } from './style';

export interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  fadeOutTime?: number;
  rippleTime?: number;
  opacity?: number;
  color?: string;
}

interface State {
  rippleX: number;
  rippleY: number;
  rippleSize: number;
  rippleOpacity: number;
  opacityTransition: boolean;
  sizeTransition: boolean;
}

const easing = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

export default class Ripple extends React.PureComponent<RippleProps, State> {
  public static defaultProps: RippleProps = {
    fadeOutTime: 0.6,
    opacity: 0.2,
    color: '#000',
    rippleTime: 0.6,
  };

  public state: State = {
    rippleX: 0,
    rippleY: 0,
    rippleSize: 0,
    rippleOpacity: 0,
    opacityTransition: false,
    sizeTransition: false,
  };

  private root = React.createRef<HTMLDivElement>();

  public onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.makeRipple(e.pageX, e.pageY);
  };

  public onMouseUp = () => {
    this.fadeOut();
    window.removeEventListener('mouseup', this.onMouseUp);
  };

  public onMouseLeave = () => {
    this.onMouseUp();
  };

  public fadeOut = () => {
    this.setState({
      rippleOpacity: 0.00000001,
      opacityTransition: true,
    });
  };

  public makeRipple(mouseX: number, mouseY: number) {
    const { opacity } = this.props;
    const {
      left,
      top,
      width,
      height,
    } = this.root.current.getBoundingClientRect();

    window.addEventListener('mouseup', this.onMouseUp);

    const x = mouseX - left;
    const y = mouseY - top;

    const size = getRippleSize(x, y, width, height);

    this.setState({
      rippleSize: 0,
      opacityTransition: false,
      sizeTransition: false,
    });

    requestAnimationFrame(() => {
      this.setState({
        rippleX: Math.min(x, width),
        rippleY: y,
        rippleSize: size,
        rippleOpacity: opacity,
        sizeTransition: true,
      });
    });
  }

  public render() {
    const { color, fadeOutTime, rippleTime, ...props } = this.props;

    const {
      rippleX,
      rippleY,
      rippleSize,
      rippleOpacity,
      opacityTransition,
      sizeTransition,
    } = this.state;

    return (
      <StyledRipple
        ref={this.root}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
        {...props}
      >
        <Container
          style={{
            transform: `translate3d(calc(-50.1% + ${rippleX}px), calc(-50.1% + ${rippleY}px), 0)`,
            width: rippleSize,
            height: rippleSize,
            transition: `0.3s background-color
            ${
              sizeTransition
                ? `, ${rippleTime}s width ${easing}, ${rippleTime}s height ${easing}`
                : ''
            }
            ${opacityTransition ? `, ${fadeOutTime}s opacity` : ''}`,
            backgroundColor: color,
            opacity: rippleOpacity,
          }}
        />
      </StyledRipple>
    );
  }
}
