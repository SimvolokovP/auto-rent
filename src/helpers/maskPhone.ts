export const maskPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");

  let countryCode = "+7";
  let phoneDigits = digits;

  if (digits.startsWith("8")) {
    phoneDigits = "7" + digits.substring(1);
  }

  if (phoneDigits.length > 11) {
    phoneDigits = phoneDigits.substring(0, 11);
  }

  const part = (start: number, length: number) =>
    phoneDigits.substring(start, start + length);

  let formatted = countryCode + " (";

  formatted += part(1, 3) || "";

  if (phoneDigits.length >= 4) {
    formatted += ") " + part(4, 3);
  } else {
    return formatted;
  }

  if (phoneDigits.length >= 7) {
    formatted += " " + part(7, 2);
  } else {
    return formatted;
  }

  if (phoneDigits.length >= 9) {
    formatted += " " + part(9, 2);
  }

  return formatted;
};
