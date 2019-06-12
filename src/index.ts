import * as mixins from './mixins';
import * as constants from './constants';
import GlobalStyle from './components/GlobalStyle'
import Preloader from './components/Preloader';
import Ripple from './components/Ripple';

const styleElement = document.createElement('style');

styleElement.textContent = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url(${constants.fonts.robotoLight}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${constants.fonts.robotoRegular}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${constants.fonts.robotoMedium}) format('woff2');
  }
`;

document.head.appendChild(styleElement);

export {
  constants,
  mixins,
  GlobalStyle,
  Preloader,
  Ripple,
};
