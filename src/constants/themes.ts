import { ITheme } from '../interfaces/theme';
import { BLUE_500 } from './colors';

export const lightTheme: ITheme = {
  'control.background': 'rgba(0, 0, 0, 0.08)',
  'control.foreground': '#000',
  'control.hover.background': 'rgba(0, 0, 0, 0.1)',

  'switch.backgroundColor': 'rgba(0, 0, 0, 0.16)',
  'radiobutton.backgroundColor': 'rgba(0, 0, 0, 0.32)',

  accentColor: BLUE_500,

  animations: true,
};

export const darkTheme: ITheme = {
  'control.background': 'rgba(255, 255, 255, 0.1)',
  'control.foreground': '#000',
  'control.hover.background': 'rgba(255, 255, 255, 0.12)',

  'switch.backgroundColor': 'rgba(255, 255, 255, 0.24)',
  'radiobutton.backgroundColor': 'rgba(255, 255, 255, 0.54)',

  accentColor: BLUE_500,

  animations: true,
};
