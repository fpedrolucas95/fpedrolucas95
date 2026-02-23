// Aqui também? Tem problema não, fica a vontade!
// Mas... você já achou o easter egg na home?

// ============================================================
// Typing Effect
// ============================================================
(function () {
    const words = [
        "sou Desenvolvedor .NET | C# | MAUI",
        "trabalho com APIs RESTful e WebSocket",
        "integro IA e Automação em software",
        "aplico Clean Code e arquitetura DDD",
    ];

    words.sort(() => Math.random() - 0.5);

    let currentIndex = 0;
    const text = document.querySelector("#type-it");
    let counter = 0;
    let stepInterval = null;
    let delInterval = null;
    let delTimeout = null;
    const typingSpeed = 55;
    const deletingSpeed = 35;

    function delIntervalCallback() {
        delInterval = setInterval(del, deletingSpeed);
        clearTimeout(delTimeout);
    }

    function del() {
        if (counter === 0) {
            currentIndex = (currentIndex + 1) % words.length;
            if (currentIndex === 0) {
                words.sort(() => Math.random() - 0.5);
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
            delTimeout = setTimeout(delIntervalCallback, 2500);
        } else {
            text.textContent += words[currentIndex][counter];
            counter++;
        }
    }

    stepInterval = setInterval(step, typingSpeed);
})();

// ============================================================
// Navigation: scroll effects + active link
// ============================================================
const navbar = document.getElementById("navbar");
const btnTopo = document.getElementById("btnTopo");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
    let current = "";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", function () {
    // Navbar shadow
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Back-to-top button
    if (window.scrollY > 300) {
        btnTopo.style.display = "flex";
    } else {
        btnTopo.style.display = "none";
    }

    updateActiveLink();
});

// ============================================================
// Hamburger menu
// ============================================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
    link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
    });
});

// ============================================================
// Back to top
// ============================================================
btnTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================================
// Portfolio Lightbox
// ============================================================
const portfolioCards = document.querySelectorAll(".portfolio-card");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
let itemIndex = 0;

function toggleLightbox() {
    lightbox.classList.toggle("open");
}

function changeItem() {
    const imgEl = portfolioCards[itemIndex].querySelector(".portfolio-card-img img");
    if (imgEl) lightboxImg.src = imgEl.getAttribute("src");
}

function prevItem() {
    itemIndex = (itemIndex - 1 + portfolioCards.length) % portfolioCards.length;
    changeItem();
}

function nextItem() {
    itemIndex = (itemIndex + 1) % portfolioCards.length;
    changeItem();
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", toggleLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) toggleLightbox();
    });
}

document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") toggleLightbox();
    if (e.key === "ArrowLeft") prevItem();
    if (e.key === "ArrowRight") nextItem();
});
