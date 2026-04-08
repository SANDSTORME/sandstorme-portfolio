document.documentElement.classList.add("js");

const revealItems = document.querySelectorAll("[data-reveal]");
const showcase = document.querySelector("[data-showcase]");
const dockCards = document.querySelectorAll(".dock-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compactShowcase = window.matchMedia("(max-width: 720px)").matches;

revealItems.forEach((item, index) => {
  window.setTimeout(() => {
    item.classList.add("is-visible");
  }, 120 + index * 90);
});

if (showcase) {
  const showcaseKicker = document.getElementById("showcase-kicker");
  const showcaseLabel = document.getElementById("showcase-label");
  const showcaseTitle = document.getElementById("showcase-title");
  const showcaseSubtitle = document.getElementById("showcase-subtitle");
  const showcaseSignature = document.getElementById("showcase-signature");
  const showcaseDescription = document.getElementById("showcase-description");
  const showcasePrimary = document.getElementById("showcase-primary");
  const showcaseSecondary = document.getElementById("showcase-secondary");
  const showcaseButtons = showcase.querySelectorAll("[data-showcase-index]");

  const slides = [
    {
      mode: "horizon",
      kicker: "real name",
      label: "origem",
      title: "Eduardo",
      subtitle: "Lourenço",
      signature: "storm protocol // origem",
      description: "Nome real primeiro. O resto orbita em volta disso.",
      primaryLabel: "Abrir projeto",
      primaryHref: "https://biblioteca-pimentasvii-1.onrender.com/",
      secondaryLabel: "Abrir GitHub",
      secondaryHref: "https://github.com/SANDSTORME",
      theme: {
        highlight: "#eef7ff",
        core: "#4c8fff",
        shadow: "#10264d",
        glow: "rgba(76, 143, 255, 0.38)",
        moonLeft: "#f2c06d",
        moonRight: "#dbd9cb"
      }
    },
    {
      mode: "orbit",
      kicker: "online alias",
      label: "assinatura",
      title: "Sandstorme",
      subtitle: "No controle",
      signature: "sandstorme // presenca online",
      description: "Meu nome nas redes. Direto, forte e facil de lembrar.",
      primaryLabel: "Abrir Instagram",
      primaryHref: "https://www.instagram.com/_sandstorme/",
      secondaryLabel: "Escrever no Gmail",
      secondaryHref: "mailto:eduardolouren%C3%A7o.costa21@gmail.com",
      theme: {
        highlight: "#f2fbff",
        core: "#66c6ff",
        shadow: "#0d3158",
        glow: "rgba(102, 198, 255, 0.34)",
        moonLeft: "#ffb86a",
        moonRight: "#d5e8f0"
      }
    },
    {
      mode: "surface",
      kicker: "main mission",
      label: "destaque",
      title: "Biblioteca",
      subtitle: "Pimentas VII",
      signature: "missao principal // escola",
      description: "O projeto que merece mais peso dentro do site.",
      primaryLabel: "Abrir biblioteca",
      primaryHref: "https://biblioteca-pimentasvii-1.onrender.com/",
      secondaryLabel: "Ver GitHub",
      secondaryHref: "https://github.com/SANDSTORME",
      theme: {
        highlight: "#fff3d8",
        core: "#d8c19d",
        shadow: "#685645",
        glow: "rgba(224, 197, 155, 0.28)",
        moonLeft: "#a39b90",
        moonRight: "#6ea3ff"
      }
    }
  ];

  let activeIndex = 0;
  let loopTimer = 0;
  let swapTimer = 0;
  let shiftTimer = 0;
  const swapDelay = compactShowcase ? 110 : 180;
  const shiftDuration = compactShowcase ? 440 : 760;
  const loopDelay = compactShowcase ? 6800 : 5600;

  function applySlide(index) {
    const slide = slides[index];

    showcase.dataset.mode = slide.mode;
    showcaseKicker.textContent = slide.kicker;
    showcaseLabel.textContent = slide.label;
    showcaseTitle.textContent = slide.title;
    showcaseSubtitle.textContent = slide.subtitle;
    showcaseSignature.textContent = slide.signature;
    showcaseDescription.textContent = slide.description;
    showcasePrimary.textContent = slide.primaryLabel;
    showcasePrimary.href = slide.primaryHref;
    showcaseSecondary.textContent = slide.secondaryLabel;
    showcaseSecondary.href = slide.secondaryHref;
    showcase.style.setProperty("--planet-highlight", slide.theme.highlight);
    showcase.style.setProperty("--planet-core", slide.theme.core);
    showcase.style.setProperty("--planet-shadow", slide.theme.shadow);
    showcase.style.setProperty("--planet-glow", slide.theme.glow);
    showcase.style.setProperty("--moon-left", slide.theme.moonLeft);
    showcase.style.setProperty("--moon-right", slide.theme.moonRight);

    showcaseButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  }

  function setSlide(index, immediate = false) {
    window.clearTimeout(swapTimer);
    window.clearTimeout(shiftTimer);
    activeIndex = index;

    if (immediate) {
      applySlide(index);
      return;
    }

    showcase.classList.add("is-shifting");

    swapTimer = window.setTimeout(() => {
      applySlide(index);
    }, swapDelay);

    shiftTimer = window.setTimeout(() => {
      showcase.classList.remove("is-shifting");
    }, shiftDuration);
  }

  function startLoop() {
    window.clearInterval(loopTimer);
    loopTimer = window.setInterval(() => {
      setSlide((activeIndex + 1) % slides.length);
    }, loopDelay);
  }

  showcaseButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-showcase-index"));
      setSlide(index);
      startLoop();
    });
  });

  showcase.addEventListener("pointerenter", () => {
    window.clearInterval(loopTimer);
  });

  showcase.addEventListener("pointerleave", () => {
    startLoop();
  });

  setSlide(0, true);
  startLoop();

  if (!reduceMotion) {
    showcase.addEventListener("pointermove", event => {
      const bounds = showcase.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      const strongX = `${x * 22}px`;
      const strongY = `${y * 18}px`;
      const softX = `${x * 12}px`;
      const softY = `${y * 10}px`;
      const inverseX = `${x * -10}px`;
      const inverseY = `${y * -8}px`;
      const spotX = `${50 + x * 28}%`;
      const spotY = `${42 + y * 18}%`;

      showcase.style.setProperty("--parallax-x", strongX);
      showcase.style.setProperty("--parallax-y", strongY);
      showcase.style.setProperty("--parallax-soft-x", softX);
      showcase.style.setProperty("--parallax-soft-y", softY);
      showcase.style.setProperty("--parallax-invert-x", inverseX);
      showcase.style.setProperty("--parallax-invert-y", inverseY);
      showcase.style.setProperty("--spot-x", spotX);
      showcase.style.setProperty("--spot-y", spotY);
    });

    showcase.addEventListener("pointerleave", () => {
      showcase.style.setProperty("--parallax-x", "0px");
      showcase.style.setProperty("--parallax-y", "0px");
      showcase.style.setProperty("--parallax-soft-x", "0px");
      showcase.style.setProperty("--parallax-soft-y", "0px");
      showcase.style.setProperty("--parallax-invert-x", "0px");
      showcase.style.setProperty("--parallax-invert-y", "0px");
      showcase.style.setProperty("--spot-x", "72%");
      showcase.style.setProperty("--spot-y", "28%");
    });
  }
}

if (!reduceMotion) {
  dockCards.forEach(card => {
    card.addEventListener("pointermove", event => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      card.style.setProperty("--glow-x", `${x}%`);
      card.style.setProperty("--glow-y", `${y}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--glow-x", "50%");
      card.style.setProperty("--glow-y", "50%");
    });
  });
}
