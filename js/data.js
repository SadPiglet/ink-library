const inkDatabase = [
  // ==== Wearingeul Inks ====
  {
    id: 1,
    brand: "Wearingeul",
    name: "The Phantom at the Opera",
    colour: "Blue",
    shimmer: false,
    sheen: true,
    shading: "Low",
    sheenColour: "Red",
    shimmerColour: null,
  },
  {
    id: 2,
    brand: "Wearingeul",
    name: "I Am a Cat",
    colour: "Grey",
    shimmer: true,
    sheen: false,
    shading: "Low",
    sheenColour: null,
    shimmerColour: "Gold",
  },
  {
    id: 3,
    brand: "Wearingeul",
    name: "Juliet",
    colour: "Pink",
    shimmer: true,
    sheen: false,
    shading: "Low",
    sheenColour: null,
    shimmerColour: "Gold",
  },
  // ==== Diamine inks ====
  {
    id: 4,
    brand: "Diamine",
    name: "Burnt Sienna",
    colour: "Brown",
    shimmer: false,
    sheen: false,
    shading: "Medium",
    sheenColour: null,
    shimmerColour: null,
  },
  {
    id: 5,
    brand: "Diamine",
    name: "Denim",
    colour: "Blue",
    shimmer: false,
    sheen: false,
    shading: "Medium",
    sheenColour: null,
    shimmerColour: null,
  },
  {
    id: 6,
    brand: "Diamine",
    name: "Monboddo's Hat",
    colour: "Purple",
    shimmer: false,
    sheen: false,
    shading: "Low",
    sheenColour: null,
    shimmerColour: null,
  },
  {
    id: 7,
    brand: "Diamine",
    name: "Vermillion",
    colour: "Red",
    shimmer: false,
    sheen: false,
    shading: "None",
    sheenColour: null,
    shimmerColour: null,
  },
  {
    id: 8,
    brand: "Diamine",
    name: "Red Dragon",
    colour: "Red",
    shimmer: false,
    sheen: false,
    shading: "None",
    sheenColour: null,
    shimmerColour: null,
  },
  {
    id: 9,
    brand: "Diamine",
    name: "Delamere Green",
    colour: "Green",
    shimmer: false,
    sheen: false,
    shading: "Medium",
    sheenColour: null,
    shimmerColour: null,
  },
  // ==== Octopus Fluids inks ==== 
  {
    id: 10,
    brand: "Octopus Fluids",
    name: "Goblin",
    colour: "Green",
    shimmer: false,
    sheen: true,
    shading: "None",
    sheenColour: "Purple",
    shimmerColour: null,
  },
  {
    id: 11,
    brand: "Octopus Fluids",
    name: "Dragon",
    colour: "Teal",
    shimmer: false,
    sheen: true,
    shading: "Medium",
    sheenColour: "Pink",
    shimmerColour: null,
  }
];

// ==== MY LIBRARY DATABASE ====
let myLibrary = {
  owned: [],
  wishlist: [],
  currentlyInked: [],
  favouriteOfTheMonth: null,
};

function saveLibrary() {
  const libraryJSON = JSON.stringify(myLibrary);
  localStorage.setItem("myLibrary", libraryJSON);
}

const savedLibrary = localStorage.getItem("myLibrary");

if (saveLibrary) {
  myLibrary = JSON.parse(savedLibrary);
}