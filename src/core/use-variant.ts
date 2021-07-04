export const useVariant = (
  variant: string | undefined,
  variantsMap: Record<string, React.ElementType>,
  as?: React.ElementType,
): React.ElementType => {
  if (as) return as;
  if (!variant) throw new Error('Variant is null');
  return variantsMap[variant];
};
