import './index.css';
// import { initialCards } from './components/cards.js'
import { createCard, deleteCard, handleLike } from './components/card.js';
import { openModal, setCloseModalListeners, closeModal } from './components/modal.js';
import { clearValidation, enableValidation} from './components/validation.js'
import {getUserData, getInitialCards, patchProfileEdit, postNewCard, patchAvatarEdit} from './components/api.js'

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
const profileImg = document.querySelector('.profile__image')
let currentUserId = null

const avatarPopup = document.querySelector('.popup_type_avatar');
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements['link'];

const formEditAvatar = document.forms['new-avatar'];
const avatarLinkInput = formEditAvatar.elements.link_avatar

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

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
  renderLoading(true, editProfilePopup)

  const newName = nameInput.value;
  const newJob = jobInput.value;
  
  patchProfileEdit(newName, newJob)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileJob.textContent = userData.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => console.error(err))
    .finally(() => renderLoading(false, editProfilePopup))
}

function editAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, avatarPopup)

  const newAvatar = avatarLinkInput.value;

  patchAvatarEdit(newAvatar)
    .then((userData) => {
      profileImg.style.backgroundImage = `url(${userData.avatar})`
      closeModal(avatarPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => renderLoading(false, avatarPopup))

}

function handleImageClick(link, name) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

formEditAvatar.addEventListener('submit', editAvatarFormSubmit);
formEditProfile.addEventListener('submit', editProfileFormSubmit);

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(true, addCardPopup)

  postNewCard(placeInput.value, linkInput.value)
    .then((card) => {
      const cardElement = createCard(card.name, card.link, card._id, card.likes, card.owner._id, deleteCard, handleLike,() => handleImageClick(card.name, card.link), currentUserId);
      cardsList.prepend(cardElement);
      formNewCard.reset();
      closeModal(addCardPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => renderLoading(false, addCardPopup))

});

profileEditButton.addEventListener('click', () => {
  fillProfileForm();
  clearValidation(formEditProfile, configValidation)
  openModal(editProfilePopup);
});

profileAddButton.addEventListener('click', () => {
  formNewCard.reset()
  clearValidation(formNewCard, configValidation)
  openModal(addCardPopup);
});

profileImg.addEventListener('click', () => {
  clearValidation(formEditAvatar ,configValidation)
  openModal(avatarPopup)
})

enableValidation(configValidation)

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    currentUserId = userData._id
    profileTitle.textContent = userData.name
    profileJob.textContent =userData.about
    profileImg.style.backgroundImage = `url(${userData.avatar})`

    initialCards.forEach((card) => {
      const cardElement = createCard(card.name, card.link, card._id, card.likes, card.owner._id, deleteCard, handleLike, handleImageClick, currentUserId);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err)
  })

  function renderLoading(isLoading, formElement) {
    const popupButton = formElement.querySelector('.popup__button')

    if (isLoading) {
      popupButton.setAttribute('data-text', popupButton.textContent)
      popupButton.textContent = 'Сохранение...'
    } else {
      popupButton.textContent = popupButton.getAttribute('data-text')
      popupButton.removeAttribute('data-text')
    }
  }