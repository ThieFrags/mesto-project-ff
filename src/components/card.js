import {deleteCardApi, setCardLikeApi} from './api'

function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.error(err))
}

function handleLike(likeButton, cardId, likesCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active')

  setCardLikeApi(cardId, isLiked)
  .then((cardData) => {
    likeButton.classList.toggle('card__like-button_is-active')
    likesCount.textContent = cardData.likes.length
  })
  .catch((err) => console.error('Обновление' ,err))
}

function createCard(name, link, cardId, likes, ownerId, deleteCardCallBack, handleLikeCallBack, handleImageClickCallBack, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesCount = cardElement.querySelector('.card__like-counter')

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like-counter').textContent = likes.length;

  likeButton.addEventListener('click',() => handleLikeCallBack(likeButton, cardId, likesCount));
  cardImage.addEventListener('click',() => handleImageClickCallBack(link, name));

  if (ownerId !== userId) {
    deleteButton.remove()
  } else {
    deleteButton.addEventListener('click',() => deleteCardCallBack(cardElement, cardId,));
  }

  const likeHasUser = likes.some((like) => like._id === userId)
  if (likeHasUser) {
    likeButton.classList.add('card__like-button_is-active')
  }

  return cardElement;
}

export { createCard, handleLike, deleteCard };