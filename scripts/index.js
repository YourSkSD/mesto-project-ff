// список карточек
const listOfCards = document.querySelector(".places__list");

console.log(listOfCards);

function addCard(cardAdded, deleteCard) {
  // copy content of template cardTemplate
  const cardTemplate = document.querySelector("#card-template").content;
  // make clone of cardTemplate to cardElement
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // fill textContent of cardElement from array cardInitial
  cardElement.querySelector(".card__image").src =
    cardAdded.link || "./images/Not_found.jpg";
  cardElement.querySelector(".card__image").alt =
    `Пейзаж ${cardAdded.name}` || "Not found";
  cardElement.querySelector(".card__title").textContent =
    cardAdded.name || "Not specified";

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((item) => listOfCards.append(addCard(item, deleteCard)));
