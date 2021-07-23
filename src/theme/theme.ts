export const defaultWexondUITheme = {
  '--ui-accent-color': '#6ec6ff',

  // BUTTON CONTAINED
  '--ui-button-contained-background': 'rgba(255, 255, 255, 0.08)',
  '--ui-button-contained-color': '#fff',
  '--ui-button-contained-border': 'rgba(255, 255, 255, 0.1)',
  '--ui-button-contained-hover-background': 'rgba(255, 255, 255, 0.14)',
  '--ui-button-contained-hover-color': '#fff',
  '--ui-button-contained-hover-border': 'rgba(255, 255, 255, 0.48)',

  // BUTTON OUTLINED
  '--ui-button-outlined-color': '#fff',
  '--ui-button-outlined-border': 'rgba(255, 255, 255, 0.24)',
  '--ui-button-outlined-hover-color': '#fff',
  '--ui-button-outlined-hover-border': 'rgba(255, 255, 255, 0.48)',

  // BUTTON PRIMARY
  '--ui-button-primary-background': 'var(--ui-accent-color)',
  '--ui-button-primary-color': '#000',
  '--ui-button-primary-border': '',
  '--ui-button-primary-hover-background': '#63a4ff',
  '--ui-button-primary-hover-color': '#000',
  '--ui-button-primary-hover-border': '',

  // SLIDER
  '--ui-slider-color': 'var(--ui-accent-color)',
  '--ui-slider-track-background': 'rgba(255, 255, 255, 0.08)',
  '--ui-slider-handle-background': 'rgba(255, 255, 255, 0.12)',
  '--ui-slider-hover-background': 'rgba(255, 255, 255, 0.2)',
};

export type WexondUITheme = typeof defaultWexondUITheme;

export type ThemePropertySelectors = 'selected' | 'focused' | 'hovered';

export type ThemePropertySelectorMap = Partial<
  Record<ThemePropertySelectors, boolean>
>;

const formatVar = (property: string) => {
  return `var(${property})`;
};

export const buildSelectors = (
  property: string,
  map?: ThemePropertySelectorMap,
) => {
  if (!map) return property;

  const selectors: ThemePropertySelectors[] = [];

  // We need that hardcoded, because the order is essential
  if (map.selected) selectors.push('selected');
  if (map.focused) selectors.push('focused');
  if (map.hovered) selectors.push('hovered');

  if (selectors.length !== 0) {
    return property + '-' + selectors.join('-');
  }

  return property;
};

export const useSelectors = (map: ThemePropertySelectorMap) => (
  property: string,
  mapOverrides?: ThemePropertySelectorMap,
  autoVar = true,
) => {
  const selectors = buildSelectors(property, { ...map, ...mapOverrides });
  return autoVar ? formatVar(selectors) : selectors;
};

export const useProperty = (property: string) => (
  map?: ThemePropertySelectorMap,
  autoVar = true,
) => {
  const selectors = buildSelectors(property, map);
  return autoVar ? formatVar(selectors) : selectors;
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
