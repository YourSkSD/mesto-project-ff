import { createCard, deleteCard } from "./card.js";
import { initialCards } from "./cards.js";
import {
  handleCloseEvent,
  closeModal,
  openModal,
  handleEscKeyUp
} from "./modal.js";
import "../pages/index.css";

// список карточек
const listOfCards = document.querySelector(".places__list");

initialCards.forEach((item) =>
  listOfCards.append(createCard(item, deleteCard))
);

// const попапРедактированияПрофия = document.querySelector("...");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");

// const попапДобавленияКарточки = document.querySelector("...");
const profileAddButton = document.querySelector(".profile__add-button");
const popupAddProfile = document.querySelector(".popup_type_new-card");

// const попапКартинки = document.querySelector("...");
const cardsContainer = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");

profileEditButton.addEventListener("click", (evt) => {
  openModal(popupEditProfile);
  // функцияЧтобыПовеситьСлушатели(попапРедактированияПрофия);
  handleCloseEvent(popupEditProfile);
});

profileAddButton.addEventListener("click", (evt) => {
  openModal(popupAddProfile);
  // функцияЧтобыПовеситьСлушатели(попапДобавленияКарточки);
  handleCloseEvent(popupAddProfile);
});

cardsContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    const elemCurrentImage = evt.target;
    // console.log(`${elemCurrentImage.src} ${elemCurrentImage.alt}`);
    const elemPopupImage = popupImage.querySelector(".popup__image");
    // console.log(elemPopupImage);
    elemPopupImage.src = elemCurrentImage.src;
    elemPopupImage.alt = elemCurrentImage.alt;

    openModal(popupImage);
    // функцияЧтобыПовеситьСлушатели(попапКартинки);
    handleCloseEvent(popupImage);
  }
});
