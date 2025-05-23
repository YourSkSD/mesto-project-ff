// copy content of template cardTemplate
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, onDeleteCard, onLikeCard, onOpenImagePopup) {
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
  const imageOfCard = cardElement.querySelector(".card__image");

  deleteButton.addEventListener("click", () => {
    onDeleteCard(cardElement);
  });

  likeButton.addEventListener("click", () => onLikeCard(likeButton));

  imageOfCard.addEventListener("click", () => onOpenImagePopup(cardData));

  return cardElement;
}

function onDeleteCard(cardElement) {
  cardElement.remove();
}

function onLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, onDeleteCard, onLikeCard };
