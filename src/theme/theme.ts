import colors from './colors';

import Button from '../components/Button/style';
import Spinner from '../components/Spinner/style';

export const defaultTheme = {
  colors,
  components: {
    Button,
    Spinner,
  },
};

export type Theme = typeof defaultTheme;

export type ThemeColors = typeof colors;
