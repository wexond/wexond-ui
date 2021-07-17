import { WexondUITheme } from '../theme/theme';

export const useThemeVars = (theme: WexondUITheme) => {
  const style = { ...theme };

  return style;
};
