import './index.css';
import { initialCards } from './components/cards.js'
import { createCard, deleteCard, handleLike } from './components/card.js';
import { openModal, setCloseModalListeners, closeModal } from './components/modal.js';

const cardsList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements['link'];

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  setCloseModalListeners(popup);
});

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileJob.textContent = newJob;

  closeModal(editProfilePopup);
}

function handleImageClick(link, name) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

formEditProfile.addEventListener('submit', editProfileFormSubmit);

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardElement = createCard(placeInput.value, linkInput.value, deleteCard, handleLike, handleImageClick(linkInput.value, placeInput.value));
  cardsList.prepend(cardElement);

  formNewCard.reset();
  closeModal(addCardPopup);
});

profileEditButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(editProfilePopup);
});

profileAddButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link, deleteCard, handleLike, handleImageClick);
  cardsList.append(cardElement);
});