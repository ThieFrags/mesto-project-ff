import './index.css';
import { createCard, initialCards } from './components/cards.js';
import { openModal, closeModal, openImagePopup } from './components/modal.js';

const cardsList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');

// Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);

  // Добавляем обработчик клика на картинку
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => {
    openImagePopup(card.link, card.name);
  });

  cardsList.append(cardElement);
});

// Добавляем обработчики событий на кнопки открытия попапов
profileEditButton.addEventListener('click', () => {
  openModal(editProfilePopup);
});

profileAddButton.addEventListener('click', () => {
  openModal(addCardPopup);
});
