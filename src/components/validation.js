const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add(configValidation.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(configValidation.errorClass)
};

const hideInputError = (formElement, inputElement, configValidation) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove(configValidation.inputErrorClass)
  inputElement.setCustomValidity('')
  
  errorElement.classList.remove(configValidation.errorClass)
  errorElement.textContent = ''
};

const isValid = (formElement, inputElement, configValidation) => {
if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
} else {
  hideInputError(formElement, inputElement, configValidation);
}
}; 

const setEventListener = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector))
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, configValidation)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, configValidation)
      toggleButtonState(inputList, buttonElement, configValidation)
    })
  })
}

const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector))
  formList.forEach((formElement) => {
    setEventListener(formElement, configValidation)
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid)
}

const toggleButtonState = (inputList, buttonElement, configValidation) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(configValidation.inactiveButtonClass)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(configValidation.inactiveButtonClass)
  }
}

const clearValidation = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector))
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector)
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, configValidation)
  })

  toggleButtonState(inputList, buttonElement, configValidation)
}

export {enableValidation, clearValidation}