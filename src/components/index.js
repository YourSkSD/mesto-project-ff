import {
  createCard as createCard,
  onDeleteCard as onDeleteCard,
  isLikedCard as isLikedCard,
  updateCardLike as updateCardLike
} from "./card.js";
import { initialCards } from "./cards.js";
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
  getResponseData,
  getInitialCards,
  getUserData,
  updateUserProfile,
  updateUserAvatar,
  addNewCardToServer,
  deleteCardFromServer,
  addCardLike,
  removeCardLike
} from "./components/api.js";
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

// данные пользователя
const userName = document.querySelector(".profile__title");
const userProfession = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");
const profileOverlay = document.querySelector(".profile__overlay");

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

async function initialPage() {
  try {
    //Получаем данные с сервера
    const [userData, initialCards] = await Promise.all([
      getUserDara(),
      getInitialCards()
    ]);
    //Устанавливаем данные пользователя
    currentUserId = userData._id;
    userName = userData.name;
    userProfession = userData.about;
    userAvatar.src = userData.avatar;

    //Генерация карточек
    renderCards(initialCards);
  } catch (err) {
    console.log(`Ошибка: ${err}`);
  }
}

initialPage();

function renderCards(cards) {
  cardList.innerHTML = "";

  // Проверяем тип данных карточек
  if (Array.isArray(cards)) {
    cards.forEach((card) => {
      listOfCards.appendChild(
        createCard(
          card,
          onDeleteCard,
          onLikeCard,
          onOpenImagePopup,
          currentUserId
        )
      );
    });
  }
}

const onOpenImagePopup = (cardData) => {
  imageOfPopupImage.src = cardData.link;
  descriptionOfPopupImage.textContent = cardData.name;

  openModal(popupImage);
};

// initialCards.forEach((item) =>
//   listOfCards.append(
//     createCard(item, onDeleteCard, onLikeCard, onOpenImagePopup)
//   )
// );

//включаем валидацию полей форм
enableValidation(validationConfig);

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

function onLikeCard(cardId, cardElement) {
  const isLiked = isLikedCard(cardElement);
  const toggleLikeCard = isLiked ? removeCardLike : addCardLike;

  toggleLikeCard(cardId)
    .then((card) => {
      updateCardLike(cardElement, card.likes);
    })
    .catch((err) => {
      console.log("Ошибка при лайке карточки:", err);
    });
}

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

profileOverlay.addEventListener("click", () => {
  openModal(modals.profileImage);
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

// слушатель на отправку формы
newPlaceForm.addEventListener("submit", handleCardFormSubmit);

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
