export const validateTextInput = (value) => {
  return value !== undefined && value !== "";
};

export const validatePhoneNumber = (value) => {
  const regex = /^\+7\d{10}$/;
  return regex.test(value);
};

export const validateClientTypes = (value) => {
  return Object.values(value).some((item) => item === true);
};
