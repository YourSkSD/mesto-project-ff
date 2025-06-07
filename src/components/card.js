import { addCardLike } from "./api";

// copy content of template cardTemplate
const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  cardData,
  onDeleteCard,
  onLikeCard,
  onOpenImagePopup,
  userId
) {
  // make clone of cardTemplate to cardElement
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imageOfCard = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  // fill textContent of cardElement from array cardInitial
  cardElement.querySelector(".card__image").src =
    cardData.link || "./images/Not_found.jpg";
  cardElement.querySelector(".card__image").alt =
    `Пейзаж ${cardData.name}` || "Not found";
  cardElement.querySelector(".card__title").textContent =
    cardData.name || "Not specified";

  if (cardData.owner._id !== userId) {
    deleteButton.classList.add("card__delete-button_hidden");
  } else {
    deleteButton.addEventListener("click", () => {
      if (onDeleteCard) {
        onDeleteCard(cardData._id, cardElement);
      }
    });
  }

  if (cardData.likes.some((user) => isIterable._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => onLikeCard(likeButton));

  imageOfCard.addEventListener("click", () => onOpenImagePopup(cardData));

  return cardElement;
}

function onDeleteCard(cardId, cardElement) {
  let cardIdToDelete = cardId;
  let cardElementToDelete = cardElement;
  if (cardIdToDelete && cardElementToDelete) {
    deleteCardFromServer(cardIdToDelete)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error("Ошибка при удалении карточки:", err);
      });
  }
}

function isLikedCard(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  return likeButton.classList.contains("card__like-button_is-active");
}


function updateCardLike(cardElement, likes) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  likeButton.classList.toggle("card__like-button_is-active");
  likeCounter.textContent = likes.length;
}

export { createCard, onDeleteCard, isLikedCard, updateCardLike };
