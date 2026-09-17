// Skapa ink cards för varje bläck i databasen

const browseInks = document.querySelector("#browse-inks");

function renderInks(inks) {
  browseInks.textContent = "";
  inks.forEach((ink) => {
    const inkCard = document.createElement("div");
    const inkName = document.createElement("h3");
    const colour = document.createElement("p");
    const colourSwatch= document.createElement("span");
    const shading = document.createElement("span");

    // Knappar
    const wishlistBtn = document.createElement("button");
    const ownedBtn = document.createElement("button");

    wishlistBtn.textContent = "♡ Wishlist";
    ownedBtn.textContent = "＋ Add to Library";

    inkCard.classList.add("ink-card");

    inkName.textContent = `${ink.brand} - ${ink.name}`;
    colour.textContent = `Colour: ${ink.colour}`;
    colourSwatch.classList.add("ink-swatch");
    
    shading.classList.add("tag");
    shading.textContent = `Shading · ${ink.shading}`;

    colour.prepend(colourSwatch);
    colourSwatch.style.backgroundColor = ink.colour;

    browseInks.appendChild(inkCard);
    inkCard.appendChild(inkName);
    inkCard.appendChild(colour);
    inkCard.appendChild(shading);


    if (ink.shimmer) {
      const shimmer = document.createElement("span");
      shimmer.classList.add("tag");
      shimmer.textContent = `Shimmer · ${ink.shimmerColour}`;
      inkCard.appendChild(shimmer);
    }

    if (ink.sheen) {
      const sheen = document.createElement("span");
      sheen.classList.add("tag");
      sheen.textContent = `Sheen · ${ink.sheenColour}`;
      inkCard.appendChild(sheen);
    }

    inkCard.appendChild(wishlistBtn);
    inkCard.appendChild(ownedBtn);

    wishlistBtn.addEventListener("click", () => {
      if (myLibrary.wishlist.includes(ink.id)) {
        myLibrary.wishlist = myLibrary.wishlist.filter((id) => id !== ink.id);
      } else {
        myLibrary.wishlist.push(ink.id);
      }

      myLibrary.owned = myLibrary.owned.filter((id) => id !== ink.id);

      updateLibraryButtons(ink, wishlistBtn, ownedBtn);
    });

    ownedBtn.addEventListener("click", () => {
      if (myLibrary.owned.includes(ink.id)) {
        myLibrary.owned = myLibrary.owned.filter((id) => id !== ink.id);
      } else {
        myLibrary.owned.push(ink.id);
      }

      myLibrary.wishlist = myLibrary.wishlist.filter((id) => id !== ink.id);

      updateLibraryButtons(ink, wishlistBtn, ownedBtn);  
    });

    updateLibraryButtons(ink, wishlistBtn, ownedBtn);
  });
}

function updateLibraryButtons(ink, wishlistBtn, ownedBtn) {
  if (myLibrary.wishlist.includes(ink.id)) {
    wishlistBtn.textContent = "♥ Wishlisted";
  } else {
    wishlistBtn.textContent = "♡ Wishlist";
  }

  if (myLibrary.owned.includes(ink.id)) {
    ownedBtn.textContent = "✓ In my Library";
  } else {
    ownedBtn.textContent = "＋ Add to Library";
  }
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
  const colourItem = document.createElement("li");

  colourInput.type = "checkbox";
  colourInput.id = colour;
  colourInput.name = "colour";
  colourInput.value = colour;

  colourLabel.textContent = colour;
  colourLabel.setAttribute("for", colour);

  colourItem.appendChild(colourInput);
  colourItem.appendChild(colourLabel);

  const colourOptions = colourFilters.querySelector("ul");
  colourOptions.appendChild(colourItem);
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
  const effectItem = document.createElement("li");

  effectInput.type = "checkbox";
  effectInput.id = effect;
  effectInput.name = "effect";
  effectInput.value = effect;

  effectLabel.textContent = effect;
  effectLabel.setAttribute("for", effect);

  effectItem.appendChild(effectInput);
  effectItem.appendChild(effectLabel);

  const effectsOptions = effectFilters.querySelector("ul");
  effectsOptions.appendChild(effectItem);
});

const effectInputs = document.querySelectorAll('input[name="effect"]');

effectInputs.forEach((input) => {
  input.addEventListener("change", () => {
    filterInks();
  });
});

// ==== Skapa filter för shading ====

const shadingFilters = document.querySelector("#shading-filter");
const shadingLevels = ["None", "Low", "Medium", "High"];

shadingLevels.forEach((level) => {
  const shadingInput = document.createElement("input");
  const shadingLabel = document.createElement("label");
  const shadingItem = document.createElement("li");

  shadingInput.type = "checkbox";
  shadingInput.id = level;
  shadingInput.name = "shading";
  shadingInput.value = level;

  shadingLabel.textContent = level;
  shadingLabel.setAttribute("for", level);

  shadingItem.appendChild(shadingInput);
  shadingItem.appendChild(shadingLabel);

  const shadingOptions = shadingFilters.querySelector("ul");
  shadingOptions.appendChild(shadingItem);
});

const shadingInputs = document.querySelectorAll('input[name="shading"]');

shadingInputs.forEach((input) => {
  input.addEventListener("change", () => {
    filterInks();
  });
});

//

const filterDropdowns = document.querySelectorAll("#ink-filters details");
filterDropdowns.forEach((dropdown) => {
  dropdown.addEventListener("toggle", () => {
    if (dropdown.open) {
      filterDropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.removeAttribute("open");
        }
      });
    }
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