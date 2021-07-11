import { WexondUITheme } from '../theme/theme';

export const useThemeVars = (theme: WexondUITheme) => {
  const { primaryColor, ...vars } = theme;
  const style = { ...vars };

  return style;
};
