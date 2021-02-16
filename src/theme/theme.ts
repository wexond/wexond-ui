import colors from './colors';
import components from './components';

import Button from '../components/Button/style';

export const defaultTheme = {
  colors,
  components: {
    Button,
  },
};

export type Theme = typeof defaultTheme;

export type ThemeComponents = keyof Theme['components'];

export type ThemeComponentVariants<
  T extends ThemeComponents
> = keyof Theme['components'][T]['variants'];

export type ThemeComponentSizes<
  T extends ThemeComponents
> = keyof Theme['components'][T]['sizes'];
