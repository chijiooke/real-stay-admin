export function capitalizeFirstLetter(value: string): string {
  if (!value) return value;

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function trucateString(value: string, maxCharacters: number): string {
  if (!value) return value;
  if (value.length <= maxCharacters) return value;
  return value?.slice(0, maxCharacters) + "...";
}

export function enumToSelectOptions<T extends Record<string, string>>(
  enumObj: T
) {
  return [
    { label: "All", value: "" },
    ...Object.values(enumObj).map((value) => ({
      label: capitalizeFirstLetter(value),
      value,
    })),
  ];
}
