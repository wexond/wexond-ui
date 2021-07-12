import { WexondUITheme } from '../theme/theme';

export const useTheme = (theme: WexondUITheme, element: HTMLElement) => {
  for (const name in theme) {
    element.style.setProperty(name, theme[name]);
  }
};
