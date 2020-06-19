import { ITheme } from '~/interfaces';
import { BLUE_500 } from './colors';

export const lightTheme: ITheme = {
  'control.backgroundColor': 'rgba(0, 0, 0, 0.08)',
  'control.hover.backgroundColor': 'rgba(0, 0, 0, 0.1)',
  'control.valueColor': '#000',
  'control.lightIcon': false,
  'switch.backgroundColor': 'rgba(0, 0, 0, 0.16)',

  'dropdown.backgroundColor': '#fff',
  'dropdown.backgroundColor.translucent': 'rgba(255, 255, 255, 0.7)',
  'dropdown.separator.color': 'rgba(0, 0, 0, 0.12)',

  accentColor: BLUE_500,
};

export const darkTheme: ITheme = {
  'control.backgroundColor': 'rgba(255, 255, 255, 0.1)',
  'control.hover.backgroundColor': 'rgba(255, 255, 255, 0.12)',
  'control.valueColor': '#fff',
  'control.lightIcon': true,
  'switch.backgroundColor': 'rgba(255, 255, 255, 0.24)',

  'dropdown.backgroundColor': 'rgb(66, 66, 66)',
  'dropdown.backgroundColor.translucent': 'rgb(60, 60, 60, 0.6)',
  'dropdown.separator.color': 'rgba(255, 255, 255, 0.12)',

  accentColor: BLUE_500,
};
