const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorication: "9fb1e8c4-834a-43a5-a89c-3a8ad4f3017d",
    "Content-Type": "application/json"
  }
};

export const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      getResponseData(res);
    })
    .catch((err) => console.log(err));
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => {
      getResponseData(res);
    })
    .catch((err) => console.log(err));
};

export const updateUserProfile = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about
    })
  })
    .then((res) => {
      getResponseData(res);
    })
    .catch((err) => console.log(err));
};

export const updateUserAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then((res) => {
      getResponseData(res);
    })
    .catch((err) => console.log(err));
};

export const addCardToServer = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
    .then((res) => {
      getResponseData(res);
    })
    .catch((err) => console.log(err));
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then((res) => {
      getResponseData(res);
    })
    .catch((err) => console.log(err));
};

export const addCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  })
    .then((res) => {
      getResponseData(res);
    })
    .catch((err) => console.log(err));
};

export const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then((res) => {
      getResponseData(res);
    })
    .catch((err) => console.log(err));
};
