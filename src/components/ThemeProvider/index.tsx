import React from 'react';

import { useTheme } from '../../hooks/use-theme';
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
  const themeStyle = useTheme(theme!);

  return (
    <div {...props} style={{ ...style, ...themeStyle }}>
      {children}
    </div>
  );
};

ThemeProvider.defaultProps = {
  theme: defaultWexondUITheme,
};
