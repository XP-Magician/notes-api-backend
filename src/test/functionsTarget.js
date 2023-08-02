export const opModule = (num1, num2) => {
  if (((num1 || num2) === undefined || NaN) || num2 === 0) return;
  return num1 % num2;
};

export const palindrome = (word) => {
  if (!word) return '';
  return word
    .split('')
    .reverse()
    .join('');
};
