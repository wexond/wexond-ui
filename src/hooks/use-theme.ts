import { WexondUITheme } from '../theme/theme';

export const useTheme = (theme: WexondUITheme) => {
  const { primaryColor, ...vars } = theme;
  const style = { ...vars };

  return style;
};
