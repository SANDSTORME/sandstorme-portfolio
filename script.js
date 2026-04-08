document.documentElement.classList.add("js");

const root = document.documentElement;
const revealItems = document.querySelectorAll("[data-reveal]");
const showcase = document.querySelector("[data-showcase]");
const dockCards = document.querySelectorAll(".dock-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compactShowcase = window.matchMedia("(max-width: 720px)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const lowPowerDevice = Boolean(
  reduceMotion ||
  compactShowcase ||
  !finePointer ||
  connection?.saveData ||
  (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4) ||
  (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4)
);

if (lowPowerDevice) {
  root.classList.add("performance-mode");
}

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
      subtitle: "Louren\u00E7o",
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
  const animateShowcase = !lowPowerDevice;
  const enablePointerEffects = animateShowcase && finePointer;
  const swapDelay = compactShowcase ? 90 : 140;
  const shiftDuration = compactShowcase ? 260 : 420;
  const loopDelay = 7200;

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

    if (immediate || !animateShowcase) {
      showcase.classList.remove("is-shifting");
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
    if (!animateShowcase) {
      return;
    }

    window.clearInterval(loopTimer);
    loopTimer = window.setInterval(() => {
      setSlide((activeIndex + 1) % slides.length);
    }, loopDelay);
  }

  showcaseButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-showcase-index"));
      setSlide(index);

      if (animateShowcase) {
        startLoop();
      }
    });
  });

  if (animateShowcase) {
    showcase.addEventListener("pointerenter", () => {
      window.clearInterval(loopTimer);
    });

    showcase.addEventListener("pointerleave", () => {
      startLoop();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.clearInterval(loopTimer);
        return;
      }

      startLoop();
    });
  }

  setSlide(0, true);
  startLoop();

  if (enablePointerEffects) {
    let showcaseFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const renderShowcasePointer = () => {
      showcaseFrame = 0;

      const strongX = `${pointerX * 22}px`;
      const strongY = `${pointerY * 18}px`;
      const softX = `${pointerX * 12}px`;
      const softY = `${pointerY * 10}px`;
      const inverseX = `${pointerX * -10}px`;
      const inverseY = `${pointerY * -8}px`;
      const spotX = `${50 + pointerX * 28}%`;
      const spotY = `${42 + pointerY * 18}%`;

      showcase.style.setProperty("--parallax-x", strongX);
      showcase.style.setProperty("--parallax-y", strongY);
      showcase.style.setProperty("--parallax-soft-x", softX);
      showcase.style.setProperty("--parallax-soft-y", softY);
      showcase.style.setProperty("--parallax-invert-x", inverseX);
      showcase.style.setProperty("--parallax-invert-y", inverseY);
      showcase.style.setProperty("--spot-x", spotX);
      showcase.style.setProperty("--spot-y", spotY);
    };

    showcase.addEventListener("pointermove", event => {
      const bounds = showcase.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

      if (!showcaseFrame) {
        showcaseFrame = window.requestAnimationFrame(renderShowcasePointer);
      }
    });

    showcase.addEventListener("pointerleave", () => {
      if (showcaseFrame) {
        window.cancelAnimationFrame(showcaseFrame);
        showcaseFrame = 0;
      }

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

if (!lowPowerDevice && finePointer) {
  dockCards.forEach(card => {
    let dockFrame = 0;
    let glowX = 50;
    let glowY = 50;

    const renderDockPointer = () => {
      dockFrame = 0;
      card.style.setProperty("--glow-x", `${glowX}%`);
      card.style.setProperty("--glow-y", `${glowY}%`);
    };

    card.addEventListener("pointermove", event => {
      const bounds = card.getBoundingClientRect();
      glowX = ((event.clientX - bounds.left) / bounds.width) * 100;
      glowY = ((event.clientY - bounds.top) / bounds.height) * 100;

      if (!dockFrame) {
        dockFrame = window.requestAnimationFrame(renderDockPointer);
      }
    });

    card.addEventListener("pointerleave", () => {
      if (dockFrame) {
        window.cancelAnimationFrame(dockFrame);
        dockFrame = 0;
      }

      card.style.setProperty("--glow-x", "50%");
      card.style.setProperty("--glow-y", "50%");
    });
  });
}
