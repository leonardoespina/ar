// Definición de los datos del menú
const menuItems = [
  {
    src: "models/leo.glb",
    title: "Cappuccino",
    price: "$4.50",
    rating: "4.5 (6,986)",
    ingredients: ["Coffee", "Milk", "Micilum Roasted"],
  },
  {
    src: "models/2.glb",
    title: "Hamburguesa Clásica",
    price: "$9.90",
    rating: "4.8 (3,452)",
    ingredients: ["Carne", "Queso", "Lechuga", "Tomate"],
  },
  {
    src: "models/3.glb",
    title: "Ensalada César",
    price: "$7.50",
    rating: "4.3 (2,156)",
    ingredients: ["Lechuga", "Pollo", "Parmesano", "Aderezo"],
  },
];

// Referencias a los elementos del DOM
const welcomeScreen = document.getElementById("welcome-screen");
const menuScreen = document.getElementById("menu-screen");
const enterBtn = document.getElementById("enterBtn");

const viewer = document.getElementById("viewer");
const loader = document.getElementById("loader");
const cardInfo = document.querySelector(".card-info");
const titleEl = document.getElementById("title");
const priceEl = document.getElementById("price");
const ingredientsEl = document.querySelector(".card-ingredients");
const ratingEl = document.querySelector(".card-rating");
const nextBtn = document.querySelector(".swiper-button-next");
const prevBtn = document.querySelector(".swiper-button-prev");

let currentIndex = 0;

/**
 * Muestra el menú y oculta la pantalla de bienvenida.
 */
// En tu app.js, modifica la función showMenu() así:
function showMenu() {
  welcomeScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");

  // Mostrar inmediatamente la información del primer ítem
  const firstItem = menuItems[currentIndex];
  titleEl.textContent = firstItem.title;
  priceEl.textContent = firstItem.price;
  ratingEl.innerHTML = `<span>★ ${firstItem.rating}</span>`;
  ingredientsEl.innerHTML = firstItem.ingredients
    .map((ing) => `<span class="ingredient-tag">${ing}</span>`)
    .join("");

  // Mostrar el loader mientras carga el modelo
  loader.style.display = "flex";
  cardInfo.classList.add("show"); // Mostrar la info inmediatamente

  // Cargar el modelo
  viewer.src = firstItem.src;

  viewer.addEventListener(
    "load",
    () => {
      loader.style.display = "none";
      viewer.autoRotate = true;
    },
    { once: true }
  );
}

/**
 * Actualiza el visor de modelos y la información del plato.
 * @param {number} index El índice del elemento del menú a mostrar.
 */
function loadMenuItem(index) {
  const item = menuItems[index];
  loader.style.display = "flex";

  // Oculta la información del plato para la animación de salida
  cardInfo.classList.remove("show");

  // Pequeño retraso para permitir que la animación de salida se complete
  setTimeout(() => {
    // Actualiza el contenido del plato
    titleEl.textContent = item.title;
    priceEl.textContent = item.price;
    ratingEl.innerHTML = `<span>★ ${item.rating}</span>`;
    ingredientsEl.innerHTML = item.ingredients
      .map((ing) => `<span class="ingredient-tag">${ing}</span>`)
      .join("");

    // Carga el nuevo modelo 3D
    viewer.src = item.src;

    // Cuando el modelo esté cargado, oculta el loader y muestra la información
    viewer.addEventListener(
      "load",
      () => {
        loader.style.display = "none";
        cardInfo.classList.add("show");
        viewer.autoRotate = true;
      },
      { once: true }
    );
  }, 800); // Coincide con la duración de la transición en CSS
}

/**
 * Maneja el cambio al siguiente elemento del menú.
 */
function goToNextItem() {
  currentIndex = (currentIndex + 1) % menuItems.length;
  loadMenuItem(currentIndex);
}

/**
 * Maneja el cambio al elemento anterior del menú.
 */
function goToPrevItem() {
  currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
  loadMenuItem(currentIndex);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  enterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showMenu();
  });
  nextBtn.addEventListener("click", goToNextItem);
  prevBtn.addEventListener("click", goToPrevItem);
});
