export const ISBNValidator = (isbn: string) => {
  const isbnWithoutHyphens = isbn.replace(/-/g, "");

  if (isbnWithoutHyphens.length === 10) {
    return __validateISBN10(isbnWithoutHyphens);
  } else if (isbnWithoutHyphens.length === 13) {
    return __validateISBN13(isbnWithoutHyphens);
  } else {
    return false;
  }
};

const __validateISBN10 = (isbn: string) => {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(isbn[i]);
    if (isNaN(digit)) {
      return false;
    }
    sum += digit * (10 - i);
  }

  const checksum = isbn[9].toUpperCase() === "X" ? 10 : parseInt(isbn[9]);
  if (isNaN(checksum)) {
    return false;
  }

  return (sum + checksum) % 11 === 0;
};

const __validateISBN13 = (isbn: string) => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn[i]);
    if (isNaN(digit)) {
      return false;
    }
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  const checksum = parseInt(isbn[12]);
  if (isNaN(checksum)) {
    return false;
  }

  return (sum + checksum) % 10 === 0;
};
