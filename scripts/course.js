const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  spaceBetween: 100,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function initAccordion() {
  const accordionList = document.querySelectorAll("[data-faq] dt");
  const activeClass = "active";

  if (accordionList.length) {
    accordionList[0].classList.add(activeClass);
    accordionList[0].nextElementSibling.classList.add(activeClass);

    function activeAccordion() {
      this.classList.toggle(activeClass);
      this.nextElementSibling.classList.toggle(activeClass);
    }

    accordionList.forEach((item) => {
      item.addEventListener("click", activeAccordion);
    });
  }
}

initAccordion();

const btnTop = document.querySelector("[data-scroll='top']");
btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function activatePixel(phpUrl, extra) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", phpUrl, true);
  xhr.send();
}

activatePixel("../viewcontent2.php");

const buttonsCheckout = document.querySelectorAll("[data-checkout]");
buttonsCheckout.forEach((btn) => {
  console.log(btn)
  btn.addEventListener("click", (e) => {
    activatePixel("../checkout.php");
  });
});
