import colors from './colors';

import Button from '../components/Button/style';
import Spinner from '../components/Spinner/style';
import Input from '../components/Input/style';

export const defaultTheme = {
  colors,
  components: {
    Button,
    Spinner,
    Input,
  },
};

export type Theme = typeof defaultTheme;

export type ThemeColors = typeof colors;
