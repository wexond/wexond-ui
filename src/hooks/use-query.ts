import React from 'react';

export interface UseQuaryOptions {
  text: string;
  query?: string | null;
  disabled?: boolean;
}

export interface UseQuaryFragment {
  id: number;
  text: string;
  highlighted: boolean;
}

export const useQuery = ({ text, query, disabled }: UseQuaryOptions) => {
  const _query = query?.toLowerCase();

  const fragments = React.useMemo(
    () =>
      disabled || !_query
        ? [text]
        : text.split(new RegExp(`(${escape(_query)})`, 'gi')),
    [disabled, _query, text],
  );

  return fragments.map<UseQuaryFragment>((r, index) => ({
    id: index,
    text: r,
    highlighted: r.toLowerCase() === _query,
  }));
};
