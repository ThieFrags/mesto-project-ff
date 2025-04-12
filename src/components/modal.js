const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const imagePopup = document.querySelector('.popup_type_image'); // Попап с изображением
const popupImage = imagePopup.querySelector('.popup__image'); // Картинка внутри попапа
const popupCaption = imagePopup.querySelector('.popup__caption'); // Подпись в попапе

// При загрузке страницы добавляем класс `popup_is-animated`, чтобы анимация работала с первого раза
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

// Функция открытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 10);
  document.addEventListener('keydown', closeModalOnEsc);
}

// Функция закрытия попапа
function closeModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    if (!popup.classList.contains('popup_is-opened')) {
      document.removeEventListener('keydown', closeModalOnEsc);
    }
  }, 600);
}

// Закрытие попапов по клику на крестик
closeButtons.forEach((button) => {
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
  });
});

// Закрытие попапа по клику вне его содержимого
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

// Закрытие попапа по нажатию на Escape
function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openModal(imagePopup);
}

export { openModal, closeModal, openImagePopup };
