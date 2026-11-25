const ASSET_BASE_URL = "https://assets.aceternity.com/gta6";
const DEFAULT_DURATION = 3.6;

const GTA_LAYERS = [
  { file: "01-jl.webp", name: "J and L", initialScale: 1.234, revealDelay: 0.46 },
  { file: "06-gator.webp", name: "Gator", initialScale: 1.318, revealDelay: 0.56 },
  { file: "04-boobie.webp", name: "Boobie", initialScale: 1.403, revealDelay: 0.65 },
  {
    file: "03-gal.webp",
    name: "Gal",
    initialScale: 1.518,
    revealDelay: 0.74,
    layerClass: "gta-layer--gal",
    hotspot: {
      href: "projects.html",
      label: "Projects",
      className: "gta-hotspot--gal",
      left: "2.4%",
      top: "30.3%",
      width: "31.6%",
      height: "40.5%",
    },
  },
  { file: "02-biker.webp", name: "Biker", initialScale: 1.646, revealDelay: 0.84 },
  { file: "00-heli.webp", name: "Helicopter", initialScale: 1.797, revealDelay: 0.93 },
  {
    file: "07-raul.webp",
    name: "Raul",
    initialScale: 1.98,
    revealDelay: 1.02,
    layerClass: "gta-layer--raul",
    hotspot: {
      href: "radar.html",
      label: "Radar",
      className: "gta-hotspot--raul",
      left: "35.4%",
      top: "78.0%",
      width: "31.0%",
      height: "19.6%",
    },
  },
  { file: "05-lambo.webp", name: "Lambo", initialScale: 2.186, revealDelay: 1.11 },
  { file: "08-speedboat.webp", name: "Speedboat", initialScale: 2.42, revealDelay: 1.21 },
  { file: "09-logohole.webp", name: "Logo hole", initialScale: 2.446, revealDelay: 1.9 },
  { file: "10-vilogo.webp", name: "VI logo", initialScale: 2.446, revealDelay: 0.5 },
  { text: ["priyantar", "jonak"], name: "priyantar jonak", href: "about.html", initialScale: 3.306, revealDelay: 0.8, isLogo: true },
];

const poster = document.querySelector(".poster");
const stage = document.querySelector(".gta-poster-stage");
const replayButton = document.querySelector(".replay-button");

if (poster && stage && replayButton) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  poster.style.setProperty("--poster-duration", `${DEFAULT_DURATION}s`);

  GTA_LAYERS.forEach((layer, index) => {
    let el;
    if (layer.text) {
      el = document.createElement("div");
      el.className = "gta-layer gta-layer--logo gta-wordmark";
      const link = document.createElement("a");
      link.href = layer.href || "#";
      link.className = "gta-wordmark__link";
      link.setAttribute("aria-label", `${layer.name} — about page`);
      layer.text.forEach((line) => {
        const span = document.createElement("span");
        span.textContent = line;
        link.appendChild(span);
      });
      el.appendChild(link);
    } else {
      el = document.createElement("img");
      el.src = `${ASSET_BASE_URL}/${layer.file}`;
      el.alt = layer.name;
      el.draggable = false;
      el.decoding = "async";
      el.className = [
        "gta-layer",
        layer.isLogo ? "gta-layer--logo" : "",
        layer.layerClass || "",
      ]
        .filter(Boolean)
        .join(" ");
    }
    el.style.zIndex = String(index);
    el.style.setProperty("--initial-scale", String(layer.initialScale));
    el.style.setProperty("--reveal-delay", `${layer.revealDelay}s`);
    stage.appendChild(el);

    if (layer.hotspot) {
      const hotspot = document.createElement("a");
      hotspot.href = layer.hotspot.href;
      hotspot.className = `gta-hotspot ${layer.hotspot.className || ""}`.trim();
      hotspot.setAttribute("aria-label", layer.hotspot.label);
      hotspot.style.left = layer.hotspot.left;
      hotspot.style.top = layer.hotspot.top;
      hotspot.style.width = layer.hotspot.width;
      hotspot.style.height = layer.hotspot.height;
      stage.appendChild(hotspot);
    }
  });

  const playIntro = () => {
    poster.classList.remove("is-playing");
    if (reducedMotion.matches) {
      return;
    }
    void poster.offsetWidth;
    poster.classList.add("is-playing");
  };

  replayButton.addEventListener("click", playIntro);
  playIntro();
}
