import React, { createElement } from 'react';
import { render } from 'react-dom';

export const renderUI = (Component: React.ElementType, htmlId = 'app') => {
  render(createElement(Component), document.getElementById(htmlId));
};

export const isClientWeb = typeof window !== 'undefined';
