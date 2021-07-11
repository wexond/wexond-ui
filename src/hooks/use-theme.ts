import { WexondUITheme } from '../theme/theme';

export const useTheme = (theme: WexondUITheme, element: HTMLElement) => {
  const { primaryColor, ...styles } = theme;

  for (const name in styles) {
    element.style.setProperty(name, styles[name]);
  }
};
