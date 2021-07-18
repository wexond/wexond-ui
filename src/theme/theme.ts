export const defaultWexondUITheme = {
  '--ui-accent-color': '#6ec6ff',
  '--ui-accent-color-hovered': '#448aff',

  // BUTTON CONTAINED
  '--ui-button-contained-background': 'rgba(255, 255, 255, 0.08)',
  '--ui-button-contained-color': '#fff',
  '--ui-button-contained-border': 'rgba(255, 255, 255, 0.1)',
  '--ui-button-contained-background-hovered': 'rgba(255, 255, 255, 0.14)',
  '--ui-button-contained-color-hovered': '#fff',
  '--ui-button-contained-border-hovered': 'rgba(255, 255, 255, 0.48)',

  // BUTTON OUTLINED
  '--ui-button-outlined-color': '#fff',
  '--ui-button-outlined-border': 'rgba(255, 255, 255, 0.24)',
  '--ui-button-outlined-color-hovered': '#fff',
  '--ui-button-outlined-border-hovered': 'rgba(255, 255, 255, 0.48)',

  // BUTTON PRIMARY
  '--ui-button-primary-background': 'var(--ui-accent-color)',
  '--ui-button-primary-color': '#000',
  '--ui-button-primary-border': '',
  '--ui-button-primary-background-hovered': 'var(--ui-accent-color-hovered)',
  '--ui-button-primary-color-hovered': '#000',
  '--ui-button-primary-border-hovered': '',

  // INPUT
  '--ui-input-filled-background': 'var(--ui-button-contained-background)',
  '--ui-input-filled-color': 'var(--ui-button-contained-color)',
  '--ui-input-filled-border': 'var(--ui-button-contained-border)',
  '--ui-input-filled-background-hovered':
    'var(--ui-button-contained-background-hovered)',
  '--ui-input-filled-color-hovered': 'var(--ui-button-contained-color-hovered)',
  '--ui-input-filled-border-hovered':
    'var(--ui-button-contained-border-hovered)',

  // SLIDER
  '--ui-slider-color': 'var(--ui-accent-color)',
  '--ui-slider-track-background': 'rgba(255, 255, 255, 0.08)',
  '--ui-slider-handle-background': 'rgba(255, 255, 255, 0.12)',
  '--ui-slider-hover-background': 'rgba(255, 255, 255, 0.2)',

  // CONTEXT MENU
  '--ui-menu-background': 'rgba(25, 25, 25, 0.56)',
  '--ui-menu-border': 'rgba(255, 255, 255, 0.1)',
  '--ui-menu-item-color': '#fff',
  '--ui-menu-item-selected': 'rgba(255, 255, 255, 0.12)',
  '--ui-menu-item-color-selected': '#fff',
};

export type WexondUITheme = typeof defaultWexondUITheme;

export type ThemePropertySelectors =
  | 'selected'
  | 'focused'
  | 'hovered'
  | 'disabled';

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
  if (map.disabled) selectors.push('disabled');

  if (selectors.length !== 0) {
    return property + '-' + selectors.join('-');
  }

  return property;
};

export const useSelectors =
  (map: ThemePropertySelectorMap) =>
  (property: string, overrides?: ThemePropertySelectorMap, autoVar = true) => {
    const selectors = buildSelectors(property, { ...map, ...overrides });
    return autoVar ? formatVar(selectors) : selectors;
  };

export const useProperty =
  (property: string) =>
  (
    map?: ThemePropertySelectorMap,
    overrides?: ThemePropertySelectorMap,
    autoVar = true,
  ) => {
    const selectors = buildSelectors(property, { ...map, ...overrides });
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
