function createCard(cardData, deleteCard, likeCard) {
  // copy content of template cardTemplate
  const cardTemplate = document.querySelector("#card-template").content;
  // make clone of cardTemplate to cardElement
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // fill textContent of cardElement from array cardInitial
  cardElement.querySelector(".card__image").src =
    cardData.link || "./images/Not_found.jpg";
  cardElement.querySelector(".card__image").alt =
    `Пейзаж ${cardData.name}` || "Not found";
  cardElement.querySelector(".card__title").textContent =
    cardData.name || "Not specified";

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", () => likeCard(likeButton));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
