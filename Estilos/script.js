const cards = [...document.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const searchInput = document.getElementById("search-input");
const cartCount = document.getElementById("cart-count");
const cartCountLarge = document.getElementById("cart-count-large");
const cartTotal = document.getElementById("cart-total");
const cartMessage = document.getElementById("cart-message");
const noResults = document.getElementById("no-results");
let activeCategory = "Todos";
let cartItems = 0;
let total = 0;

function updateCatalog() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = activeCategory === "Todos" || card.dataset.category === activeCategory;
    const matchesSearch = card.dataset.name.toLowerCase().includes(term);
    const show = matchesCategory && matchesSearch;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  noResults.classList.toggle("hidden", visible !== 0);
}
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  activeCategory = button.dataset.category;
  updateCatalog();
}));
searchInput.addEventListener("input", updateCatalog);

document.querySelectorAll(".add-button").forEach(button => button.addEventListener("click", () => {
  const card = button.closest(".product-card");
  cartItems++;
  total += Number(card.dataset.price);
  cartCount.textContent = cartItems;
  cartCountLarge.textContent = cartItems;
  cartTotal.textContent = total.toLocaleString("es-MX", {style:"currency", currency:"MXN"});
  cartMessage.textContent = `Agregaste: ${card.dataset.name}.`;
}));
document.getElementById("clear-cart").addEventListener("click", () => {
  cartItems = 0; total = 0;
  cartCount.textContent = "0";
  cartCountLarge.textContent = "0";
  cartTotal.textContent = "$0 MXN";
  cartMessage.textContent = "El carrito está vacío.";
});

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById("form-message");
  if (!form.checkValidity()) {
    message.textContent = "Revisa los campos: todos son obligatorios y deben tener un formato válido.";
    message.style.color = "#b42318";
    form.reportValidity();
    return;
  }
  const name = form.elements.nombre.value.trim();
  message.textContent = `¡Gracias, ${name}! Tu consulta de demostración fue validada correctamente.`;
  message.style.color = "#087f5b";
  form.reset();
});
