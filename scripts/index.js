import {initialCards} from './cards.js';

const content = document.querySelector('.content');
const cardsList = document.querySelector('.places__list');

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция создания карточки
function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement)
  })

  return cardElement
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);
  cardsList.append(cardElement);
})
  