export const defaultWexondUITheme = {
  primaryColor: '',

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
  '--ui-button-primary-background': '#6ec6ff',
  '--ui-button-primary-color': '#000',
  '--ui-button-primary-border': '',
  '--ui-button-primary-hover-background': '#63a4ff',
  '--ui-button-primary-hover-color': '#000',
  '--ui-button-primary-hover-border': '',
};

export type WexondUITheme = typeof defaultWexondUITheme;
