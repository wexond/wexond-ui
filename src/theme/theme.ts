export const defaultWexondUITheme = {
  accent: '#6ec6ff',
  accentHover: '#448aff',

  error: '#ff616f',

  // BUTTON CONTAINED
  'buttonContained.background': 'rgba(255, 255, 255, 0.08)',
  'buttonContained.foreground': '#fff',
  'buttonContained.border': 'rgba(255, 255, 255, 0.1)',
  'buttonContained.background.hover': 'rgba(255, 255, 255, 0.14)',
  'buttonContained.foreground.hover': '#fff',
  'buttonContained.border.hover': 'rgba(255, 255, 255, 0.48)',

  // BUTTON OUTLINED
  'buttonOutlined.foreground': '#fff',
  'buttonOutlined.border': 'rgba(255, 255, 255, 0.24)',
  'buttonOutlined.foreground.hover': '#fff',
  'buttonOutlined.border.hover': 'rgba(255, 255, 255, 0.48)',

  // BUTTON PRIMARY
  'buttonPrimary.background': 'accent',
  'buttonPrimary.foreground': '#000',
  'buttonPrimary.border': '',
  'buttonPrimary.background.hover': 'accentHover',
  'buttonPrimary.foreground.hover': '#000',
  'buttonPrimary.border.hover': '',

  // INPUT
  'inputFilled.background': 'buttonContained.background',
  'inputFilled.foreground': 'buttonContained.foreground',
  'inputFilled.border': 'buttonContained.border',
  'inputFilled.background.hover': 'buttonContained.background.hover',
  'inputFilled.foreground.hover': 'buttonContained.foreground.hover',
  'inputFilled.border.hover': 'buttonContained.border.hover',

  // SLIDER
  'sliderTrack.background.active': 'accent',
  'sliderTrack.background': 'rgba(255, 255, 255, 0.08)',
  'sliderTrack.background.hover': 'rgba(255, 255, 255, 0.2)',
  'sliderHandle.background': 'rgba(255, 255, 255, 0.12)',

  // CONTEXT MENU
  'menu.background': 'rgba(25, 25, 25, 0.56)',
  'menu.border': 'rgba(255, 255, 255, 0.1)',
  'menuItem.foreground': '#fff',
  'menuItem.active': 'rgba(255, 255, 255, 0.12)',
  'menuItem.foreground.active': '#fff',

  // ICON BUTTON
  'iconButton.background.hover': 'rgba(255, 255, 255, 0.08)',
  'iconButton.background.active': 'rgba(255, 255, 255, 0.12)',

  // SCROLLABLE
  'scrollableTrack.background': 'unset',
  'scrollableTrack.background.hover': 'rgba(255, 255, 255, 0.08)',
  'scrollableThumb.background': 'rgba(255, 255, 255, 0.5)',
  'scrollableThumb.background.hover': 'rgba(255, 255, 255, 0.8)',
  'scrollableThumb.background.active': 'rgba(255, 255, 255, 1)',
};

export type WexondUITheme = typeof defaultWexondUITheme;

export type ThemePropertySelectors =
  | 'focused'
  | 'hover'
  | 'disabled'
  | 'active';

export type ThemePropertySelectorMap = Partial<
  Record<ThemePropertySelectors, boolean>
>;

const formatVar = (property: string) => {
  return `var(${property})`;
};

const getSelectors = (
  prop: ThemePropertySelectorMap,
): ThemePropertySelectors[] => {
  const selectors: ThemePropertySelectors[] = [];

  // The order is essential
  if (prop.active) selectors.push('active');
  if (prop.focused) selectors.push('focused');
  if (prop.hover) selectors.push('hover');
  if (prop.disabled) selectors.push('disabled');

  return selectors;
};

export const buildSelectors = (
  property: string,
  map?: ThemePropertySelectorMap,
) => {
  if (!map) return property;

  const selectors = getSelectors(map);

  if (selectors.length !== 0) {
    return property + '-' + selectors.join('-');
  }

  return property;
};

export const useSelectors =
  (map: ThemePropertySelectorMap) =>
  (property: string, overrides?: ThemePropertySelectorMap) => {
    return formatVar(buildSelectors(property, { ...map, ...overrides }));
  };

export const useProperty =
  (property: string) => (map?: ThemePropertySelectorMap) => {
    return formatVar(buildSelectors(property, map));
  };

export const applyTheme = (
  theme: Record<string, string>,
  element: HTMLElement,
) => {
  const _theme = { ...defaultWexondUITheme, ...theme };

  for (const name in _theme) {
    element.style.setProperty(name, _theme[name]);
  }
};
