import mergeWith from 'lodash.mergewith';

import { defaultTheme, Theme } from './theme';

export const extendTheme = <T extends Theme>(
  override: T,
  baseTheme: any = defaultTheme,
) => {
  return baseTheme;
};
