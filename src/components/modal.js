export const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    // находим открытый попап
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  // добавить класс открытия попапа
  modal.classList.add("popup_is-opened");
  // добавить слушатель на кнопку Escape
  modal.addEventListener("keyup", handleEscKeyUp);
};

export const closeModal = (modal) => {
  // удалить класс открытия попапа
  modal.classList.remove("popup_is-opened");
  // удалить слушатель на кнопку Escape
  modal.removeEventListener("keyup", handleEscKeyUp);
};

export const handleCloseEvent = (elementPopup) => {
  // ищем кнопку крестик в попапе
  const closeButton = elementPopup.querySelector(".popup__close");
  closeButton.addEventListener("click", (evt) => {
    closeModal(elementPopup);
  });

  elementPopup.addEventListener("mousedown", (evt) => {
    // если event.target содержит класс "popup", то закрываем
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(elementPopup);
    }
  });
};

// const profileEditButton = document.querySelector(".profile__edit-button");
// const profileAddButton = document.querySelector(".profile__add-button");
// const popupEditProfile = document.querySelector(".popup_type_edit");
// const popupAddProfile = document.querySelector(".popup_type_new-card");
// const popupCloseButton = document.querySelector(".popup__close");

// profileEditButton.addEventListener("click", () => {
//   popupEditProfile.classList.add("popup_is-opened");
// });

// popupEditProfile.addEventListener("click", (evt) => {
//   if (evt.target.classList.contains("popup_is-opened")) {
//     popupEditProfile.classList.remove("popup_is-opened");
//   }
// });

// popupCloseButton.addEventListener("click", (evt) => {
//   if (evt.target.classList.contains("popup_is-opened")) {
//     evt.target.classList.remove("popup_is-opened");
//   }
// });

// profileAddButton.addEventListener("click", () => {
//   popupAddProfile.classList.add("popup_is-opened");
// });
