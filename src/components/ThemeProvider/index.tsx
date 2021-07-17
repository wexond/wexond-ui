import React from 'react';

import { useThemeVars } from '../../hooks/use-theme-vars';
import { defaultWexondUITheme, WexondUITheme } from '../../theme/theme';

export interface ThemeProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  theme?: WexondUITheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  style,
  children,
  ...props
}) => {
  const themeStyle = useThemeVars(theme!);

  return (
    <div {...props} style={{ ...style, ...themeStyle }}>
      {children}
    </div>
  );
};

ThemeProvider.defaultProps = {
  theme: defaultWexondUITheme,
};
