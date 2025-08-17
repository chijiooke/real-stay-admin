export const sanitizeFilterQuery = (string: string) => (string?.trim() === '' ? undefined : string);
