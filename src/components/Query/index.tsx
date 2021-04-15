import React from 'react';
import escape from 'escape-string-regexp';

export interface QueryProps {
  text: string;
  query?: string | null;
  disabled?: boolean;
  children: (text: string, highlighted: boolean) => React.ReactElement;
}

export const Query: React.FC<QueryProps> = ({
  query,
  text,
  disabled,
  children,
}) => {
  const _query = query?.toLowerCase();

  const parts = React.useMemo(
    () =>
      disabled || !_query
        ? [text]
        : text.split(new RegExp(`(${escape(_query)})`, 'gi')),
    [disabled, _query, text],
  );

  return <>{parts.map((r) => children(r, r.toLowerCase() === _query))}</>;
};

Query.defaultProps = {
  text: '',
};
