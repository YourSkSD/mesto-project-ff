// copy content of template cardTemplate
const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  cardData,
  handleDeleteClick,
  onLikeCard,
  onOpenImagePopup,
  userId
) {
  // make clone of cardTemplate to cardElement
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imageOfCard = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  // fill textContent of cardElement from array cardInitial
  cardImage.src = cardData.link || "./images/Not_found.jpg";
  cardImage.alt = `Пейзаж ${cardData.name}` || "Not found";
  cardTitle.textContent = cardData.name || "Not specified";

  if (cardData.owner._id !== userId) {
    deleteButton.classList.add("card__delete-button_hidden");
  } else {
    deleteButton.addEventListener("click", () => {
      if (handleDeleteClick) {
        handleDeleteClick(cardData._id, cardElement);
      }
    });
  }

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    onLikeCard(cardData._id, cardElement)
  );

  imageOfCard.addEventListener("click", () => onOpenImagePopup(cardData));

  return cardElement;
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

export { createCard, isLikedCard, updateCardLike };
