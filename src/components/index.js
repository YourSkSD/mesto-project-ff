import {
  createCard as createCard,
  isLikedCard as isLikedCard,
  updatedCardLike as updatedCardLike
} from "./card.js";
// import { initialCards } from "./cards.js";
import {
  handleCloseEvent,
  closeModal,
  openModal,
  handleEscKeyUp
} from "./modal.js";
import {
  enableValidation,
  setEventListeners,
  toggleButtonState,
  hasInvalidInput,
  checkInputValidity,
  hideInputError,
  showInputError,
  clearValidation
} from "./validation.js";
import {
  getInitialCards,
  getUserData,
  updateUserProfile,
  updateUserAvatar,
  addCardToServer,
  deleteCardFromServer,
  addCardLike,
  deleteCardLike
} from "./api.js";
import "../pages/index.css";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// ID текущего пользователя сессии
let currentUserId = null;
// список карточек
const listOfCards = document.querySelector(".places__list");
// const попапКартинки = document.querySelector("...");
const popupImage = document.querySelector(".popup_type_image");
// элементы формы
const imageOfPopupImage = popupImage.querySelector(".popup__image");
const descriptionOfPopupImage = popupImage.querySelector(".popup__caption");

// const попапРедактированияПрофия = document.querySelector("...");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");

// const попапДобавленияКарточки = document.querySelector("...");
const profileAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");

// попап новый Аватар
const popupNewAvatar = document.querySelector(".popup_new-image");

// данные пользователя
const userName = document.querySelector(".profile__title");
const userProfession = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");
const profileOverlay = document.querySelector(".profile__overlay");

// формы страницы
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const editAvatarForm = document.forms["new-image"];

// поля профиля пользователя для записи
const nameUserFormField = editProfileForm.querySelector("input[name='name']");
const descriptionFormField = editProfileForm.querySelector(
  "input[name='description']"
);

const cardNameForm = popupAddCard.querySelector("input[name='place-name']");
const cardLinkForm = popupAddCard.querySelector("input[name='image-link']");
const saveButton = popupAddCard.querySelector(".popup__button");

// поля для добавления карточки
const nameCardFormField = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const linkImageCardFormField = newPlaceForm.querySelector(
  ".popup__input_type_url"
);

async function initialPage() {
  try {
    //Получаем данные с сервера
    const [userData, initialCards] = await Promise.all([
      getUserData(),
      getInitialCards()
    ]);
    //Устанавливаем данные пользователя
    currentUserId = userData._id;
    userName.textContent = userData.name;
    userProfession.textContent = userData.about;
    userAvatar.src = userData.avatar;

    //Генерация карточек
    renderCards(initialCards);
  } catch (err) {
    console.log(`Ошибка: ${err}`);
  }
}

function renderCards(initialCards) {
  listOfCards.innerHTML = "";

  // Проверяем тип данных карточек
  if (Array.isArray(initialCards)) {
    initialCards.forEach((card) => {
      listOfCards.append(
        createCard(
          card,
          handleDeleteClick,
          onLikeCard,
          onOpenImagePopup,
          currentUserId
        )
      );
    });
  } else {
    console.log("Ожидался массив карточек, получено:", initialCards);
  }
}

initialPage();

const onOpenImagePopup = (cardData) => {
  imageOfPopupImage.src = cardData.link;
  imageOfPopupImage.alt = cardData.name;

  descriptionOfPopupImage.textContent = cardData.name;

  openModal(popupImage);
};

// initialCards.forEach((item) =>
//   listOfCards.append(
//     createCard(item, onDeleteCard, onLikeCard, onOpenImagePopup)
//   )
// );

// const handleCardFormSubmit = (evt) => {
//   // сбрасываем стандартную отправку формы с перезагрузкой страницы
//   evt.preventDefault();
//   if (nameCardFormField && linkImageCardFormField) {
//     const cardData = {
//       name: nameCardFormField.value,
//       link: linkImageCardFormField.value
//     };
//     listOfCards.prepend(
//       createCard(cardData, onDeleteCard, onLikeCard, onOpenImagePopup)
//     );
//   }

//   // сбрасываем поля
//   newPlaceForm.reset();
//   // закрываем форму
//   closeModal(popupAddCard);
// };

function onLikeCard(cardId, cardElement) {
  const isLiked = isLikedCard(cardElement);
  const toggleLikeCard = isLiked ? deleteCardLike : addCardLike;

  toggleLikeCard(cardId)
    .then((card) => {
      updatedCardLike(cardElement, card.likes);
    })
    .catch((err) => {
      console.log("Ошибка при лайке карточки:", err);
    });
}

// const handleProfileFormSubmit = (evt) => {
//   // сбрасываем стандартную отправку формы с перезагрузкой страницы
//   evt.preventDefault();

//   // после заполнения полей передаём их на страницу
//   if (nameUserFormField.value) userName.textContent = nameUserFormField.value;
//   if (descriptionFormField.value)
//     userProfession.textContent = descriptionFormField.value;

//   // сбрасываем поля
//   editProfileForm.reset();
//   // закрываем форму
//   closeModal(popupEditProfile);
// };

const handleProfileFormSubmit = (evt) => {
  // сбрасываем стандартную отправку формы с перезагрузкой страницы
  evt.preventDefault();

  // после заполнения полей передаём их на страницу
  const newUserData = {
    name: nameUserFormField.value,
    about: descriptionFormField.value
  };

  const saveButton = editProfileForm.querySelector(".popup__button");

  setLoadingState(saveButton, true, "Сохранение...");

  updateUserProfile(newUserData)
    .then((user) => {
      userName.textContent = user.name;
      userProfession.textContent = user.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      setLoadingState(saveButton, false);
    });
  // closeModal(popupEditProfile);
};

profileOverlay.addEventListener("click", () => {
  openModal(popupNewAvatar);
});

// слушатель на отправку формы
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// функцияЧтобыПовеситьСлушатели(попапРедактированияПрофия);
handleCloseEvent(popupEditProfile);

profileEditButton.addEventListener("click", (evt) => {
  // заполнение полей значениями со страницы
  nameUserFormField.value = userName.textContent;
  descriptionFormField.value = userProfession.textContent;
  openModal(popupEditProfile);
  clearValidation(popupEditProfile, validationConfig);
});

//Создаем новую карточку
function addNewCard(evt, onOpenImagePopup) {
  evt.preventDefault();

  //Новая карточка
  const newCardData = {
    name: cardNameForm.value,
    link: cardLinkForm.value
  };

  setLoadingState(saveButton, true, "Сохранение...");

  addCardToServer(newCardData)
    .then((cardFromServer) => {
      const newCard = createCard(
        cardFromServer,
        handleDeleteClick,
        onLikeCard,
        onOpenImagePopup,
        currentUserId
      );

      listOfCards.prepend(newCard);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      setLoadingState(saveButton, false);
    });
}

// слушатель на отправку формы
// newPlaceForm.addEventListener("submit", handleCardFormSubmit);
newPlaceForm.addEventListener("submit", (evt) => {
  addNewCard(evt, onOpenImagePopup);
  newPlaceForm.reset();
  clearValidation(popupAddCard, validationConfig);
});

// слушатель на открытие формы редактирование Аватара
profileOverlay.addEventListener("click", () => {
  openModal(popupNewAvatar);
});

handleCloseEvent(popupNewAvatar);

// слушатель на отправку формы нового Аватара
editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const url = editAvatarForm["link"].value;
  clearValidation(popupNewAvatar, validationConfig);

  const saveButton = editAvatarForm.querySelector(".popup__button");
  setLoadingState(saveButton, true, "Сохранение...");

  updateUserAvatar(url)
    .then((url) => {
      userAvatar.src = url.avatar;
      closeModal(popupNewAvatar);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log("Ошибка при обновлении изображения:", err);
    })
    .finally(() => {
      setLoadingState(saveButton, false);
    });
});

// функцияЧтобыПовеситьСлушатели(попапДобавленияКарточки);
handleCloseEvent(popupAddCard);

profileAddButton.addEventListener("click", (evt) => {
  openModal(popupAddCard);
  clearValidation(popupAddCard, validationConfig);
});

// функцияЧтобыПовеситьСлушатели(попапКартинки);
handleCloseEvent(popupImage);

//Состояние кнопки загрузки
function setLoadingState(button, isLoading, loadingText = "Сохранение...") {
  if (!button) return;

  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || "Сохранить";
    button.disabled = false;
  }
}

//включаем валидацию полей форм
enableValidation(validationConfig);

//Удаляем карточку
let cardIdToDelete = null;
let cardElementToDelete = null;

function handleDeleteClick(cardId, cardElement) {
  cardIdToDelete = cardId;
  cardElementToDelete = cardElement;
  onDeleteCard(cardIdToDelete, cardElementToDelete);
}

function onDeleteCard(cardIdToDelete, cardElementToDelete) {
  if (cardIdToDelete && cardElementToDelete) {
    deleteCardFromServer(cardIdToDelete)
      .then(() => {
        cardElementToDelete.remove();
      })
      .catch((err) => {
        console.error("Ошибка при удалении карточки:", err);
      });
  }
}
