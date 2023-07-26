export const convertToUrl = (str: string) => {
  if (!str) return '';
  const replaceSpaces = str.replaceAll(' ', '-');
  return replaceSpaces.toLowerCase();
};
