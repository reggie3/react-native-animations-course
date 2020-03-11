export const convertStringToTestID = (string: string): string => {
  return string.replace(" ", "-");
};
export const convertTestIDToString = (string: string): string => {
  return string.replace("-", " ");
};
