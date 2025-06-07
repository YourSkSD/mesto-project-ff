const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorication: "9fb1e8c4-834a-43a5-a89c-3a8ad4f3017d",
    "Content-Type": "application/json"
  }
};

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then((res) => {
    return getResponseData(res);
  });
};
