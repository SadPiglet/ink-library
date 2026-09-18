// ==== 1. Gemensamma funktioner ====

// Skapa och rendera ink cards
function renderInks(inks, container, showCurrentlyInked = false) {
  container.textContent = "";
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

    container.appendChild(inkCard);
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
    
    if (showCurrentlyInked) {
      const currentlyInkedBtn = document.createElement("button");

      currentlyInkedBtn.textContent = "+ Add to pen";

      if (myLibrary.currentlyInked.includes(ink.id)) {
        currentlyInkedBtn.textContent = "Remove from pen";
      }

      inkCard.appendChild(currentlyInkedBtn);

      currentlyInkedBtn.addEventListener("click", () => {
        if (myLibrary.currentlyInked.includes(ink.id)) {
          myLibrary.currentlyInked = myLibrary.currentlyInked.filter((id) => id !== ink.id);
        } else {
          myLibrary.currentlyInked.push(ink.id);
        }

        saveLibrary();

        if (myLibrary.currentlyInked.includes(ink.id)) {
          currentlyInkedBtn.textContent = "Remove from pen";
        } else {
          currentlyInkedBtn.textContent = "+ Add to pen";
        }
      });
      
    }



    wishlistBtn.addEventListener("click", () => {
      if (myLibrary.wishlist.includes(ink.id)) {
        myLibrary.wishlist = myLibrary.wishlist.filter((id) => id !== ink.id);
      } else {
        myLibrary.wishlist.push(ink.id);
      }

      myLibrary.owned = myLibrary.owned.filter((id) => id !== ink.id);

      saveLibrary();

      updateLibraryButtons(ink, wishlistBtn, ownedBtn);
    });

    ownedBtn.addEventListener("click", () => {
      if (myLibrary.owned.includes(ink.id)) {
        myLibrary.owned = myLibrary.owned.filter((id) => id !== ink.id);
      } else {
        myLibrary.owned.push(ink.id);
      }

      myLibrary.wishlist = myLibrary.wishlist.filter((id) => id !== ink.id);

      saveLibrary();

      updateLibraryButtons(ink, wishlistBtn, ownedBtn);  
    });

    updateLibraryButtons(ink, wishlistBtn, ownedBtn);
  });
}

// Hämta bläck utifrån ID:n
function getInksByIds(ids) {
  return inkDatabase.filter((ink) => ids.includes(ink.id));
}

// Visa meddelande när en biblioteksektion är tom
function renderEmptyState(inks, container, message) {
  if (inks.length === 0) {
    container.textContent = message;
    return true;
  }

  return false;
}

// Uppdatera Wishlist- och Owned-knappar
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

// ==== 2. Browse-specifik kod ====
function initBrowse() {
  const browseInks = document.querySelector("#browse-inks");

  // Rendera bläcken
  renderInks(inkDatabase, browseInks);

  // Färgfilter
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

  // Effektfilter
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

  // Shading-filter
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

  // Dropdown-toggle
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

  // Sökfält
  const searchInput = document.querySelector("#search-input");
  searchInput.addEventListener("input", () => {
    filterInks();
  });

  // Sortering
  const sortSelect = document.querySelector("#sort-select");

  sortSelect.addEventListener("change", () => {
    filterInks();
  });

  // Filterfunktion
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

      renderInks(filteredInks, browseInks);
  }
}

// ==== 3. My Library specifik kod ====
function initMyLibrary() {
  const ownedPreview = document.querySelector("#owned-preview");
  const wishlistPreview = document.querySelector("#wishlist-preview");
  const currentlyInkedPreview = document.querySelector("#currently-inked-preview");

  const ownedInks = getInksByIds(myLibrary.owned);
  const wishlistInks = getInksByIds(myLibrary.wishlist);
  const currentlyInked = getInksByIds(myLibrary.currentlyInked);

  if (!renderEmptyState(ownedInks, ownedPreview, "No inks in your library yet.")) {
    renderInks(ownedInks.slice(0, 2), ownedPreview);
  }

  if (!renderEmptyState(wishlistInks, wishlistPreview, "Your wishlist is empty.")) {
    renderInks(wishlistInks.slice(0, 2), wishlistPreview);
  }

  if (
    !renderEmptyState(
      currentlyInked, currentlyInkedPreview,
      "No pens are currently inked."
    )
  ) {
    renderInks(currentlyInked.slice(0, 2), currentlyInkedPreview, true);
  }
}

// ==== 4. Owned specifik kod ====
function initOwned() {
  const ownedContainer = document.querySelector("#owned-inks");

  const ownedInks = getInksByIds(myLibrary.owned);

  renderInks(ownedInks, ownedContainer, true);
}

// ==== 5. Currently inked specifik kod ====
function initCurrentlyInked() {
  const currentlyInkedContainer = document.querySelector("#currently-inked-inks");
  const currentlyInked = getInksByIds(myLibrary.currentlyInked);

  renderInks(currentlyInked, currentlyInkedContainer, true);
}

if (document.querySelector("#browse-inks")) {
  initBrowse();
}

if (document.querySelector("#library")) {
  initMyLibrary();
}

if (document.querySelector("#owned-inks")) {
  initOwned();
}

if (document.querySelector("#currently-inked-inks")) {
  initCurrentlyInked();
}