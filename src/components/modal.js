import { createCard, handleLike } from './cards.js';

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements['link'];

popups.forEach((popup) => popup.classList.add('popup_is-animated'))

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEsc);
}

closeButtons.forEach((button) => {
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
  });
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileJob.textContent = newJob;

  closeModal(document.querySelector('.popup_type_edit'));
}

formElement.addEventListener('submit', handleFormSubmit);

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardElement = createCard(placeInput.value, linkInput.value, handleLike);
  document.querySelector('.places__list').prepend(cardElement);

  formNewCard.reset();

  closeModal(document.querySelector('.popup_type_new-card'));
});

export { openModal, fillProfileForm };