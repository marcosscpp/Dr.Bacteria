function activatePixel(phpUrl) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", phpUrl, true);
  xhr.send();
}
activatePixel("../pageview.php");

AOS.init();

const eventContainer = document.querySelector("[data-expand='container']");
setTimeout(() => {
  if (eventContainer.classList.contains("closed")) {
    toggleEvent();
  }
}, 3000);
const eventBtn = document.querySelector("[data-expand='btn']");
eventBtn.addEventListener("click", toggleEvent);

function toggleEvent() {
  eventBtn.firstElementChild.classList.toggle("closed");
  eventContainer.classList.toggle("closed");
  const isExpanded = eventBtn.getAttribute("aria-expanded") === "true";
  eventBtn.setAttribute("aria-expanded", !isExpanded);
  eventBtn.firstElementChild.alt = isExpanded ? "Expandir" : "Colapsar";
}

const btns = document.querySelectorAll("[data-scroll^='#']");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-scroll");
    const elementToScroll = document.querySelector(targetSelector);
    elementToScroll.scrollIntoView({ block: "center", behavior: "smooth" });
  });
});

const btnTop = document.querySelector("[data-scroll='top']");
btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const loader = form.querySelector(".loader__container");
  loader.classList.add("loading");
  form.classList.add("loading");
  const formData = new FormData(form);

  fetch("../send-lead.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      response.text();
      loader.classList.remove("loading");
      form.classList.remove("loading");
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (isIOS) {
        window.location.href = "/proximos-passos";
      } else {
        const newWindow = window.open("/proximos-passos", "_blank");
        if (!newWindow) {
          window.location.href = "/proximos-passos";
        }
      }
    })
    .catch((error) => {});

  fetch("../cadastro.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .catch((error) => {});
});

const slide = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: ".slide-button-next",
    prevEl: ".slide-button-prev",
  },
  breakpoints: {
    700: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    920: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1600: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
];

const messages = {
  "complete-name": {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido.",
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um email válido.",
  },
  whatsapp: {
    valueMissing: "O campo de celular não pode estar vazio.",
    tooShort: "O campo de celular não tem caracteres suficientes.",
  },
};

const fields = document.querySelectorAll("[required]");
document.querySelector("[type='submit']").addEventListener("click", () => {
  fields.forEach((field) => {
    checkField(field);
  });
});

fields.forEach((field) => {
  field.addEventListener("blur", () => checkField(field));
  field.addEventListener("invalid", (e) => e.preventDefault());
});

function checkField(field) {
  let msg = "";
  field.setCustomValidity("");

  errorTypes.forEach((erro) => {
    if (field.validity[erro]) {
      msg = messages[field.name][erro];
    }
  });
  const errorMessage = field.nextElementSibling;
  const inputValidator = field.checkValidity();

  if (!inputValidator) {
    errorMessage.innerText = msg;
    field.classList.add("default-input--error");
  } else {
    errorMessage.innerText = "";
    field.classList.remove("default-input--error");
  }

  if (field.name == "whatsapp") {
    const regex = /^(\(?\d{2}\)?)?\s?(\d{4,5}[\s-]?\d{4})$/;
    if (!regex.test(field.value)) {
      errorMessage.innerText =
        "Por favor, preencha um número de celular válido. Formato esperado: (XX) XXXXX-XXXX.";
    }
  }
}

// Mask
document.getElementById("whatsapp").addEventListener("input", function (e) {
  let newValue = e.target.value.replace(/\D/g, "");
  newValue = newValue.replace(/^(\d{2})(\d)/g, "($1) $2");
  newValue = newValue.replace(/(\d)(\d{4})$/, "$1-$2");
  e.target.value = newValue;
});
