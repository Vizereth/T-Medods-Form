export const enableForm = () => {
  const formElements = document.querySelectorAll(".form__input");
  formElements.forEach((el) => {
    el.disabled = false;
  });

  const customFormElements = document.querySelectorAll(".form__input--custom");
  customFormElements.forEach((el) => el.classList.remove("disabled"));
};

export const disableForm = () => {
  const formElements = document.querySelectorAll(".form__input");
  formElements.forEach((el) => {
    el.disabled = true;
  });

  const customFormElements = document.querySelectorAll(".form__input--custom");
  customFormElements.forEach((el) => el.classList.add("disabled"));
};
