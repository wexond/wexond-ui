import React, { createElement } from 'react';
import { render } from 'react-dom';

export type RefsArray<T> = Array<
  React.MutableRefObject<T | null> | React.ForwardedRef<T | null> | undefined
>;

export interface EventsMap {
  [key: string]: (...args: any[]) => any;
}

export const setRefs = <T>(instance: T | null, ...refs: RefsArray<T>) => {
  refs.forEach((r) => {
    if (!r) return;
    if (typeof r === 'object') r.current = instance;
    if (typeof r === 'function') r(instance);
  });
};

export const mergeRefs =
  <T>(...refs: RefsArray<T>) =>
  (instance: T) =>
    setRefs(instance, ...refs);

export const mergeEvents = (...events: any[]) => {
  return (...args: unknown[]) => events.forEach((cb) => cb?.(...args));
};

export const mergeEventsMaps = (...maps: EventsMap[]) => {
  const fnMap: { [key: string]: Array<(...args: any[]) => any> } = {};

  maps.forEach((map) => {
    const keys = Object.keys(map);

    keys.forEach((key) => {
      if (!fnMap[key]) fnMap[key] = [];
      fnMap[key].push(map[key]);
    });
  });

  const finalMap: EventsMap = {};

  for (const key in fnMap) {
    finalMap[key] = mergeEvents(...fnMap[key]);
  }

  return finalMap;
};

export const renderUI = (Component: React.ElementType, htmlId = 'app') => {
  render(createElement(Component), document.getElementById(htmlId));
};

export const isClientWeb = typeof window !== 'undefined';
