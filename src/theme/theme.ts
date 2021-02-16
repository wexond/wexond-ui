import colors from './colors';

import Button from '../components/Button/style';

export const defaultTheme = {
  colors,
  components: {
    Button,
  },
};

export type Theme = typeof defaultTheme;

export type ThemeColors = typeof colors;
