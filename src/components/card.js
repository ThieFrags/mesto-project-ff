function deleteCard(cardElement) {
  cardElement.remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function createCard(name, link, deleteCardCallBack, handleLikeCallBack, handleImageClickCallBack) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', deleteCardCallBack);
  likeButton.addEventListener('click', handleLikeCallBack);
  cardImage.addEventListener('click',() => handleImageClickCallBack(link, name));

  return cardElement;
}

export { createCard, handleLike, deleteCard };