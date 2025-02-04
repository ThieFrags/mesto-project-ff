import {initialCards} from './cards.js';

let content = document.querySelector('.content');
let cardsList = document.querySelector('.places__list');
let cards = document.querySelector('.card')
let deleteButton = document.querySelector('.card__delete-button');


function deleteButtonListener(cardElement) {
  // @todo: Функция удаления карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    cardElement.remove();
  })
}

// @todo: Функция создания карточки
function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  deleteButtonListener(cardElement);

  cardsList.appendChild(cardElement);
}

// @todo: Вывести карточки на страницу
function renderCards(cards) {
  cards.forEach(card => addCard(card.name, card.link));
}

renderCards(initialCards);