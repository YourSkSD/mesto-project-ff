import {
  createCard as createCard,
  onDeleteCard as onDeleteCard,
  onLikeCard as onLikeCard
} from "./card.js";
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

// const попапКартинки = document.querySelector("...");
const popupImage = document.querySelector(".popup_type_image");
// элементы формы
const imageOfPopupImage = popupImage.querySelector(".popup__image");
const descriptionOfPopupImage = popupImage.querySelector(".popup__caption");

const onOpenImagePopup = (cardData) => {
  imageOfPopupImage.src = cardData.link;
  descriptionOfPopupImage.textContent = cardData.name;

  openModal(popupImage);
};

initialCards.forEach((item) =>
  listOfCards.append(
    createCard(item, onDeleteCard, onLikeCard, onOpenImagePopup)
  )
);

// const попапРедактированияПрофия = document.querySelector("...");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");

// const попапДобавленияКарточки = document.querySelector("...");
const profileAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");

// данные пользователя
const userName = document.querySelector(".profile__title");
const userProfession = document.querySelector(".profile__description");

// формы страницы
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

// поля профиля пользователя для записи
const nameUserFormField = editProfileForm.querySelector("input[name='name']");
const descriptionFormField = editProfileForm.querySelector(
  "input[name='description']"
);

// поля для добавления карточки
const nameCardFormField = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const linkImageCardFormField = newPlaceForm.querySelector(
  ".popup__input_type_url"
);

const handleCardFormSubmit = (evt) => {
  // сбрасываем стандартную отправку формы с перезагрузкой страницы
  evt.preventDefault();
  if (nameCardFormField && linkImageCardFormField) {
    const cardData = {
      name: nameCardFormField.value,
      link: linkImageCardFormField.value
    };
    listOfCards.prepend(
      createCard(cardData, onDeleteCard, onLikeCard, onOpenImagePopup)
    );
  }

  // сбрасываем поля
  newPlaceForm.reset();
  // закрываем форму
  closeModal(popupAddCard);
};

const handleProfileFormSubmit = (evt) => {
  // сбрасываем стандартную отправку формы с перезагрузкой страницы
  evt.preventDefault();

  // после заполнения полей передаём их на страницу
  if (nameUserFormField.value) userName.textContent = nameUserFormField.value;
  if (descriptionFormField.value)
    userProfession.textContent = descriptionFormField.value;

  // сбрасываем поля
  editProfileForm.reset();
  // закрываем форму
  closeModal(popupEditProfile);
};

// слушатель на отправку формы
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// функцияЧтобыПовеситьСлушатели(попапРедактированияПрофия);
handleCloseEvent(popupEditProfile);

profileEditButton.addEventListener("click", (evt) => {
  // заполнение полей значениями со страницы
  nameUserFormField.value = userName.textContent;
  descriptionFormField.value = userProfession.textContent;

  openModal(popupEditProfile);
});

// слушатель на отправку формы
newPlaceForm.addEventListener("submit", handleCardFormSubmit);

// функцияЧтобыПовеситьСлушатели(попапДобавленияКарточки);
handleCloseEvent(popupAddCard);

profileAddButton.addEventListener("click", (evt) => {
  openModal(popupAddCard);
});

// функцияЧтобыПовеситьСлушатели(попапКартинки);
handleCloseEvent(popupImage);
