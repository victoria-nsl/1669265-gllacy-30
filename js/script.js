//Карусель

const textSlide = document.querySelectorAll(".slider-item");
const btnSlide = document.querySelectorAll(".btn-slider-controls");
const wrapSlide = document.querySelector(".wrap-site");

const changeSlide = function (wrapSlide, textSlide, btnSlide, index) {
  for (let z = 0; z < textSlide.length; z++) {
    if (wrapSlide.classList.contains(`wrap-site-${z}`)) {
      wrapSlide.classList.remove(`wrap-site-${z}`);
    }
  }

  wrapSlide.classList.add(`wrap-site-${index}`);

  for (let i = 0; i < textSlide.length; i++) {
    if (textSlide[i].classList.contains("current-slide")) {
      textSlide[i].classList.remove("current-slide");
    }
  }

  textSlide[index].classList.add("current-slide");

  for (let q = 0; q < btnSlide.length; q++) {
    if (btnSlide[q].classList.contains("current-btn")) {
      btnSlide[q].classList.remove("current-btn");
    }
  }
  btnSlide[index].classList.add("current-btn");
};

for (let counter = 0; counter < btnSlide.length; counter++) {
  btnSlide[counter].addEventListener("click", function () {
    changeSlide(wrapSlide, textSlide, btnSlide, counter);
  });
}

//Модальное окно

const btnConnection = document.querySelector(".btn-connection");
const popupWrite = document.querySelector(".modal-write");
const formWrite = popupWrite.querySelector(".modal-write-form");
const btnClose = popupWrite.querySelector(".modal-close");
const fieldName = popupWrite.querySelector(".user-item:nth-child(1) input");
const fieldEmail = popupWrite.querySelector(".user-item:nth-child(2) input");
const fieldText = popupWrite.querySelector(".user-item:nth-child(3) textarea");

let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

btnConnection.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupWrite.classList.add("modal-show");
  if (storageName && storageEmail) {
    fieldName.value = storageName;
    fieldEmail.value = storageEmail;
    fieldText.focus();
  } else {
    fieldName.focus();
  }
});

btnClose.addEventListener("click", function () {
  popupWrite.classList.remove("modal-show");
  if (popupWrite.classList.contains("modal-error")) {
    popupWrite.classList.remove("modal-error");
  }
});

formWrite.addEventListener("submit", function (evt) {
  if (!fieldName.value || !fieldEmail.value || !fieldText.value) {
    evt.preventDefault();
    popupWrite.classList.add("modal-error");
  }
  if (isStorageSupport) {
    localStorage.setItem("name", fieldName.value);
    localStorage.setItem("email", fieldEmail.value);
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupWrite.classList.contains("modal-show")) {
      evt.preventDefault();
      popupWrite.classList.remove("modal-show");
      if (popupWrite.classList.contains("modal-error")) {
        popupWrite.classList.remove("modal-error");
      }
    }
  }
});
