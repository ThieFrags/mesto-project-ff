import './index.css';
import { createCard, initialCards, handleLike } from './components/cards.js';
import { openModal, fillProfileForm} from './components/modal.js';

const cardsList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');

const imgPopup = document.querySelector('.popup_type_image')

initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link, handleLike);
  cardsList.append(cardElement);
});

profileEditButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(editProfilePopup);
});

profileAddButton.addEventListener('click', () => {
  openModal(addCardPopup);
});
