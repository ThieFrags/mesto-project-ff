const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-36',
  headers: {
    authorization: 'b4ca9be1-722e-4321-880b-7c8a9f733c2b',
    'Content-Type': 'application/json'
  }
}

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(getResponse);
}

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(getResponse)
}

function patchProfileEdit(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
  .then(getResponse);
}

function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(getResponse);
}

function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(getResponse)
}

function setCardLikeApi(cardId, isLiked) {
  const method = isLiked ? 'DELETE' : 'PUT'

  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  })
  .then(getResponse)
}

function patchAvatarEdit(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(getResponse);
}

export {getUserData, getInitialCards, patchProfileEdit, postNewCard, deleteCardApi, setCardLikeApi, patchAvatarEdit}