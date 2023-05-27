// Aqui também? Tem problema não, fica a vontade!
// Mas... você já achou o easter egg na home?

(function () {
  const words = [
    "sou habilidoso em programar",
    "sou bom em identificar informações-chave",
    "sei promover produtos e serviços nos meios digitais",
    "encontro soluções para problemas",
  ];

  // Embaralha as palavras para garantir uma ordem aleatória
  words.sort(() => Math.random() - 0.5);

  let currentIndex = 0;
  let text = document.querySelector("#type-it");
  let counter = 0;
  let stepInterval = null;
  let delInterval = null;
  let delTimeout = null;
  const typingSpeed = 60; // velocidade de digitação
  const deletingSpeed = 50; // velocidade de deleção

  function delIntervalCallback() {
    delInterval = setInterval(del, deletingSpeed);
    clearTimeout(delTimeout);
  }

  function del() {
    if (counter === 0) {
      currentIndex = (currentIndex + 1) % words.length;
      if (currentIndex === 0) {
        words.sort(() => Math.random() - 0.5); // re-embaralha as palavras após todas terem sido exibidas
      }
      clearInterval(delInterval);
      stepInterval = setInterval(step, typingSpeed);
    } else {
      text.textContent = text.textContent.slice(0, -1);
      counter--;
    }
  }

  function step() {
    if (counter >= words[currentIndex].length) {
      clearInterval(stepInterval);
      delTimeout = setTimeout(delIntervalCallback, 2000);
    } else {
      text.textContent += words[currentIndex][counter];
      counter++;
    }
  }

  stepInterval = setInterval(step, typingSpeed);
})();

// Adicionando o JavaScript para adicionar e remover a classe "shadow" do menu quando a página rola
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const nav = document.querySelector("nav");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    nav.classList.add("shadow");
  } else {
    nav.classList.remove("shadow");
  }
}

// Portfolio Lightbox
const portfolioBoxBtn = document.querySelectorAll(".portfolio-box .slider-btn");
const totalPortfolioBoxBtn = portfolioBoxBtn.length;
const portfolioBox = document.querySelectorAll(".portfolio-box");
const totalPortfolioBox = portfolioBox.length;
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

let itemIndex = 0;

for (let i = 0; i < totalPortfolioBox; i++) {
  (function (index) {
    portfolioBoxBtn[index].addEventListener("click", function () {
      itemIndex = index;
      toggleLightbox();
      changeItem();
    });
    portfolioBox[index].addEventListener("click", function () {
      itemIndex = index;
    });
  })(i);
}

function toggleLightbox() {
  lightbox.classList.toggle("open");
}

function changeItem() {
  const imgSrc = portfolioBox[itemIndex]
    .querySelector(".portfolio-img img")
    .getAttribute("src");
  lightboxImg.src = imgSrc;
}

function prevItem() {
  itemIndex = (itemIndex - 1 + totalPortfolioBox) % totalPortfolioBox;
  changeItem();
}

function nextItem() {
  itemIndex = (itemIndex + 1) % totalPortfolioBox;
  changeItem();
}

lightboxClose.addEventListener("click", function () {
  closeLightbox();
});

function closeLightbox() {
  toggleLightbox();
}

lightboxImg.addEventListener("click", function (event) {
  itemIndex = (itemIndex + 1) % totalPortfolioBox;
  changeItem();
});

lightbox.addEventListener("click", function (event) {
  if (event.target == lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    closeLightbox();
  }
});

// Quando o usuário rolar 20px para baixo a partir do topo do documento, mostre o botão
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("btnTopo").style.display = "block";
  } else {
    document.getElementById("btnTopo").style.display = "none";
  }
}

// Quando o usuário clicar no botão, role para o topo do documento
document.getElementById("btnTopo").addEventListener("click", topFunction);

function topFunction() {
  document.body.scrollTop = 0; // Para o Safari
  document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
}
