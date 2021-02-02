import { createElement } from 'react';
import { render } from 'react-dom';

type RefsArray<T> = Array<
  React.MutableRefObject<T | null> | React.ForwardedRef<T | null> | undefined
>;

export const setRefs = <T>(instance: T | null, ...refs: RefsArray<T>) => {
  refs.forEach((r) => {
    if (!r) return;
    if (typeof r === 'object') r.current = instance;
    if (typeof r === 'function') r(instance);
  });
};

export const mergeRefs = <T>(...refs: RefsArray<T>) => (instance: T) =>
  setRefs(instance, ...refs);

export const mergeEvents = (...events: any[]) => {
  return (e) =>
    events.forEach((r) => {
      if (r) r(e);
    });
};

export const renderUI = (Component: React.ElementType, htmlId = 'app') => {
  render(createElement(Component), document.getElementById(htmlId));
};
