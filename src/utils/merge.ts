type Callback = (...args: any[]) => any;

type Unpacked<T> = T extends (infer K)[] ? K : T;

export const mergePropsEvents = <T extends Record<string, any>>(
  ...props: T[]
) => {
  const map = new Map<string, Array<Callback>>();

  for (const obj of props) {
    for (const key in obj) {
      if (map.has(key)) {
        map.get(key)?.push(obj[key] as any);
      } else {
        map.set(key, [obj[key] as any]);
      }
    }
  }

  const finalObj = {};

  Array.from(map.keys()).forEach((key) => {
    finalObj[key] = (...args: any[]) => {
      map.get(key)?.forEach((cb) => cb(...args));
    };
  });

  return finalObj as any as { [K in keyof T]: T[K] };
};

export const mergeEvents = <T extends Record<string, any>>(map: T) => {
  const finalObj = {};

  Object.keys(map).forEach((key) => {
    finalObj[key] = (...args: any[]) => {
      map[key].forEach((cb) => cb(...args));
    };
  });

  return finalObj as any as { [K in keyof T]: Unpacked<T[K]> };
};

type RefsArray<T> = Array<
  React.MutableRefObject<T | null> | React.ForwardedRef<T | null> | undefined
>;

export const mergeRefs =
  <T>(...refs: RefsArray<T>) =>
  (instance: T) =>
    setRefs(instance, ...refs);

export const setRefs = <T>(instance: T | null, ...refs: RefsArray<T>) => {
  refs.forEach((r) => {
    if (!r) return;
    if (typeof r === 'object') r.current = instance;
    if (typeof r === 'function') r(instance);
  });
};
