// Skapa ink cards för varje bläck i databasen

const browseInks = document.querySelector("#browse-inks");

function renderInks(inks) {
  browseInks.textContent = "";
  inks.forEach((ink) => {
    const inkCard = document.createElement("div");
    const inkName = document.createElement("h3");
    const colour = document.createElement("p");
    const shading = document.createElement("p");

    inkCard.classList.add("ink-card");

    inkName.textContent = `${ink.brand} - ${ink.name}`;
    colour.textContent = `Colour: ${ink.colour}`;
    shading.textContent = `Shading: ${ink.shading}`;

    browseInks.appendChild(inkCard);
    inkCard.appendChild(inkName);
    inkCard.appendChild(colour);
    inkCard.appendChild(shading);

    if (ink.shimmer) {
      const shimmer = document.createElement("p");
      shimmer.textContent = `Shimmer: Yes (${ink.shimmerColour})`;
      inkCard.appendChild(shimmer);
    }

    if (ink.sheen) {
      const sheen = document.createElement("p");
      sheen.textContent = `Sheen: Yes (${ink.sheenColour})`;
      inkCard.appendChild(sheen);
    }
  });
}

renderInks(inkDatabase);

// ==== Skapa filter för färger ====
const colourFilters = document.querySelector("#colour-filter");

const colours = new Set(
  inkDatabase.map((ink) => ink.colour)
);

colours.forEach((colour) => {
  const colourInput = document.createElement("input");
  const colourLabel = document.createElement("label");

  colourInput.type = "checkbox";
  colourInput.id = colour;
  colourInput.name = "colour";
  colourInput.value = colour;

  colourLabel.textContent = colour;
  colourLabel.setAttribute("for", colour);

  colourFilters.appendChild(colourInput);
  colourFilters.appendChild(colourLabel);
});

const colourInputs = document.querySelectorAll('input[name="colour"]');
colourInputs.forEach((input) => {
  input.addEventListener("change", () => {
    filterInks();
  });
});

// ==== Skapa filter för effects ====
const effectFilters = document.querySelector("#effect-filter");

const effects = ["Shimmer", "Sheen"];

effects.forEach((effect) => {
  const effectInput = document.createElement("input");
  const effectLabel = document.createElement("label");

  effectInput.type = "checkbox";
  effectInput.id = effect;
  effectInput.name = "effect";
  effectInput.value = effect;

  effectLabel.textContent = effect;
  effectLabel.setAttribute("for", effect);

  effectFilters.appendChild(effectInput);
  effectFilters.appendChild(effectLabel);
});

const effectInputs = document.querySelectorAll('input[name="effect"]');
effectInputs.forEach((input) => {
  input.addEventListener("change", () => {
    filterInks();
  });
});

// ==== Skapa filter för shading ====
const shadingFilters = document.querySelector("#shading-filter");

const shadingLevels = ["Low", "Medium", "High"];

shadingLevels.forEach((level) => {
  const shadingInput = document.createElement("input");
  const shadingLabel = document.createElement("label");

  shadingInput.type = "checkbox";
  shadingInput.id = level;
  shadingInput.name = "shading";
  shadingInput.value = level;

  shadingLabel.textContent = level;
  shadingLabel.setAttribute("for", level);

  shadingFilters.appendChild(shadingInput);
  shadingFilters.appendChild(shadingLabel);
});

const shadingInputs = document.querySelectorAll('input[name="shading"]');

shadingInputs.forEach((input) => {
  input.addEventListener("change", () => {
    filterInks();
  });
});

// ==== Skapa sökfält ====
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", () => {
  filterInks();
});

// ==== Skapa sorteringsalternativ ====
const sortSelect = document.querySelector("#sort-select");

sortSelect.addEventListener("change", () => {
  filterInks();
});

// ==== Filtrera bläck baserat på valda filter ====
function filterInks() {

  const searchTerm = searchInput.value.toLowerCase();

  const selectedColours = Array.from(colourInputs)
    .filter((input) => input.checked)
    .map((input) => input.value);

  const selectedEffects = Array.from(effectInputs)
    .filter((input) => input.checked)
    .map((input) => input.value);

  const selectedShading = Array.from(shadingInputs)
    .filter((input) => input.checked)
    .map((input) => input.value);

    const filteredInks = inkDatabase.filter((ink) => {
      // Färg
      const colourMatch = 
      selectedColours.length === 0 || 
      selectedColours.includes(ink.colour);

      // Effekter
      const effectMatch = 
      selectedEffects.length === 0 || 
      selectedEffects.some((effect) => {
        if (effect === "Shimmer") return ink.shimmer;
        if (effect === "Sheen") return ink.sheen;
      });

      // Shading
      const shadingMatch = 
      selectedShading.length === 0 || 
      selectedShading.includes(ink.shading);

      // Sökterm
      const searchMatch =
      searchTerm === "" ||
      ink.name.toLowerCase().includes(searchTerm) ||
      ink.brand.toLowerCase().includes(searchTerm);

      return colourMatch && effectMatch && shadingMatch && searchMatch;

    });

    switch (sortSelect.value) {
      case "name-asc":
        filteredInks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredInks.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "brand-asc":
        filteredInks.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "brand-desc":
        filteredInks.sort((a, b) => b.brand.localeCompare(a.brand));
        break;
    }

    renderInks(filteredInks);
}