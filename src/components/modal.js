export const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    // находим открытый попап
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  // добавить класс открытия попапа
  modal.classList.add("popup_is-opened", "popup_is-animated");
  // добавить слушатель на кнопку Escape
  document.addEventListener("keyup", handleEscKeyUp);
};

export const closeModal = (modal) => {
  // удалить класс открытия попапа
  modal.classList.remove("popup_is-opened");
  // удалить слушатель на кнопку Escape
  document.removeEventListener("keyup", handleEscKeyUp);
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
