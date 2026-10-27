"use strict";

const foods = [
  {
    id: 1, name: "Margherita Pizza", category: "Pizza", price: 249,
    rating: 4.8, popularity: 98, restaurant: "Oven & Crust",
    description: "Classic cheese, tomato sauce and fresh basil.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    tag: "Bestseller"
  },
  {
    id: 2, name: "Classic Burger", category: "Burgers", price: 179,
    rating: 4.7, popularity: 95, restaurant: "Burger Barn",
    description: "Juicy patty, crisp lettuce and signature sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    tag: "Popular"
  },
  {
    id: 3, name: "Paneer Tikka", category: "Indian", price: 229,
    rating: 4.9, popularity: 96, restaurant: "Spice Garden",
    description: "Smoky paneer cubes with Indian spices.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80",
    tag: "Chef's pick"
  },
  {
    id: 4, name: "Garden Salad", category: "Healthy", price: 149,
    rating: 4.5, popularity: 78, restaurant: "Green Bowl",
    description: "Fresh greens, crunchy vegetables and light dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
    tag: "Fresh"
  },
  {
    id: 5, name: "Chocolate Cake", category: "Desserts", price: 129,
    rating: 4.8, popularity: 91, restaurant: "Sweet Crumbs",
    description: "Rich chocolate cake for your sweet cravings.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    tag: "Sweet treat"
  },
  {
    id: 6, name: "Cold Coffee", category: "Beverages", price: 99,
    rating: 4.6, popularity: 84, restaurant: "Brew Corner",
    description: "Chilled, creamy coffee for a refreshing break.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
    tag: "Refreshing"
  },
  {
    id: 7, name: "Farmhouse Pizza", category: "Pizza", price: 329,
    rating: 4.7, popularity: 90, restaurant: "Oven & Crust",
    description: "Loaded with peppers, onions, corn and cheese.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80",
    tag: "Loaded"
  },
  {
    id: 8, name: "Crispy Veg Burger", category: "Burgers", price: 139,
    rating: 4.4, popularity: 80, restaurant: "Burger Barn",
    description: "Crispy vegetable patty with fresh crunchy slaw.",
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=700&q=80",
    tag: "Value pick"
  },
  {
    id: 9, name: "Masala Dosa", category: "Indian", price: 159,
    rating: 4.8, popularity: 93, restaurant: "Spice Garden",
    description: "Golden dosa with spiced potato and chutneys.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80",
    tag: "Favourite"
  },
  {
    id: 10, name: "Fruit Smoothie", category: "Healthy", price: 119,
    rating: 4.5, popularity: 75, restaurant: "Green Bowl",
    description: "A refreshing blend of seasonal fruits.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=80",
    tag: "Fresh"
  },
  {
    id: 11, name: "Chocolate Brownie", category: "Desserts", price: 89,
    rating: 4.6, popularity: 87, restaurant: "Sweet Crumbs",
    description: "A fudgy chocolate brownie with a soft centre.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    tag: "Sweet treat"
  },
  {
    id: 12, name: "Fresh Lemonade", category: "Beverages", price: 69,
    rating: 4.3, popularity: 70, restaurant: "Brew Corner",
    description: "Fresh lemon, a hint of mint and chilled goodness.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=700&q=80",
    tag: "Refreshing"
  }
];

const restaurants = [
  {
    name: "Oven & Crust", cuisine: "Pizza · Italian",
    rating: 4.8, time: "20–30 min", badge: "Top rated",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Spice Garden", cuisine: "Indian · Desi",
    rating: 4.9, time: "25–35 min", badge: "Customer favourite",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Burger Barn", cuisine: "Burgers · Fast food",
    rating: 4.7, time: "15–25 min", badge: "Quick delivery",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80"
  }
];

const STORAGE_KEYS = {
  cart: "cravecart_cart_v1",
  orders: "cravecart_orders_v1"
};

const $ = (selector) => document.querySelector(selector);

const foodGrid = $("#foodGrid");
const restaurantGrid = $("#restaurantGrid");
const cartItems = $("#cartItems");
const emptyState = $("#emptyState");
const cartCount = $("#cartCount");
const toast = $("#toast");

let cart = readStorage(STORAGE_KEYS.cart, []);
let orders = readStorage(STORAGE_KEYS.orders, []);
let activeCategory = "All";
let toastTimer;

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Unable to save data in this browser.");
    return false;
  }
}

function money(amount) {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function scrollToSection(selector) {
  const section = $(selector);
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRestaurants() {
  restaurantGrid.innerHTML = restaurants.map((restaurant) => `
    <article class="restaurant-card">
      <div class="restaurant-image">
        <img src="${restaurant.image}" alt="${escapeHTML(restaurant.name)} food"
             loading="lazy">
        <span class="restaurant-badge">${escapeHTML(restaurant.badge)}</span>
      </div>
      <div class="restaurant-info">
        <h3>${escapeHTML(restaurant.name)}</h3>
        <div class="restaurant-meta">
          <span>${escapeHTML(restaurant.cuisine)}</span>
          <span class="rating">★ ${restaurant.rating}</span>
        </div>
        <div class="restaurant-meta">
          <span>🕒 ${escapeHTML(restaurant.time)}</span>
          <span>● Available</span>
        </div>
        <button class="text-link restaurant-explore"
                data-restaurant="${escapeHTML(restaurant.name)}"
                style="margin-top:14px;border:0;background:none">
          Explore menu →
        </button>
      </div>
    </article>
  `).join("");
}

function renderFoods() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const category = activeCategory;
  const priceRange = $("#priceFilter").value;
  const sortBy = $("#sortFilter").value;

  let filtered = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(query) ||
      food.restaurant.toLowerCase().includes(query) ||
      food.category.toLowerCase().includes(query) ||
      food.description.toLowerCase().includes(query);

    const matchesCategory = category === "All" || food.category === category;

    let matchesPrice = true;
    if (priceRange === "under150") matchesPrice = food.price < 150;
    if (priceRange === "150to300") matchesPrice = food.price >= 150 && food.price <= 300;
    if (priceRange === "over300") matchesPrice = food.price > 300;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sortBy === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "high") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "popular") filtered.sort((a, b) => b.popularity - a.popularity);

  foodGrid.innerHTML = filtered.map((food) => `
    <article class="food-card">
      <div class="food-image">
        <img src="${food.image}" alt="${escapeHTML(food.name)}"
             loading="lazy">
        <span class="food-tag">${escapeHTML(food.tag)}</span>
      </div>
      <div class="food-info">
        <div class="food-title-row">
          <h3>${escapeHTML(food.name)}</h3>
          <span class="food-rating">★ ${food.rating}</span>
        </div>
        <p class="food-description">${escapeHTML(food.description)}</p>
        <p style="margin-top:6px;color:#827970;font-size:.75rem">
          ${escapeHTML(food.restaurant)} · ${escapeHTML(food.category)}
        </p>
        <div class="food-bottom">
          <span class="food-price">${money(food.price)}</span>
          <button class="add-button" data-add="${food.id}">+ Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyState.classList.toggle("hidden", filtered.length !== 0);
}

function updateCategoryButtons() {
  document.querySelectorAll(".chip").forEach((chip) => {
    const selected = chip.dataset.category === activeCategory;
    chip.classList.toggle("active", selected);
    chip.setAttribute("aria-pressed", String(selected));
  });

  $("#categoryFilter").value = activeCategory;
}

function addToCart(id) {
  const food = foods.find((item) => item.id === Number(id));
  if (!food) return;

  const existing = cart.find((item) => item.id === food.id);

  if (existing) {
    if (existing.quantity >= 20) {
      showToast("Maximum quantity is 20 per dish.");
      return;
    }
    existing.quantity += 1;
  } else {
    cart.push({ id: food.id, quantity: 1 });
  }

  saveStorage(STORAGE_KEYS.cart, cart);
  renderCart();
  showToast(`${food.name} added to your cart!`);
}

function changeQuantity(id, amount) {
  const item = cart.find((entry) => entry.id === Number(id));
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== Number(id));
  } else if (item.quantity > 20) {
    item.quantity = 20;
    showToast("Maximum quantity is 20 per dish.");
  }

  saveStorage(STORAGE_KEYS.cart, cart);
  renderCart();
}

function removeFromCart(id) {
  const item = foods.find((food) => food.id === Number(id));
  cart = cart.filter((entry) => entry.id !== Number(id));

  saveStorage(STORAGE_KEYS.cart, cart);
  renderCart();

  if (item) showToast(`${item.name} removed from cart.`);
}

function clearCart() {
  if (cart.length === 0) {
    showToast("Your cart is already empty.");
    return;
  }

  if (!confirm("Are you sure you want to clear your cart?")) return;

  cart = [];
  saveStorage(STORAGE_KEYS.cart, cart);
  renderCart();
  showToast("Your cart has been cleared.");
}

function getCartDetails() {
  const items = cart.map((entry) => {
    const food = foods.find((item) => item.id === entry.id);
    if (!food) return null;
    return { ...food, quantity: entry.quantity };
  }).filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 35;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  return { items, subtotal, delivery, tax, total };
}

function renderCart() {
  const details = getCartDetails();
  const count = details.items.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = count;
  cartCount.setAttribute("aria-label", `${count} items in cart`);

  if (!details.items.length) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <span>🛒</span>
        <h3>Your cart is looking a little empty</h3>
        <p>Explore the menu and add something delicious.</p>
        <a href="#menu">Browse food →</a>
      </div>
    `;
  } else {
    cartItems.innerHTML = details.items.map((item) => `
      <article class="cart-item">
        <img src="${item.image}" alt="${escapeHTML(item.name)}" loading="lazy">
        <div>
          <h3>${escapeHTML(item.name)}</h3>
          <small>${money(item.price)} each</small>
          <div class="quantity-controls">
            <button data-quantity="${item.id}" data-change="-1"
                    aria-label="Decrease ${escapeHTML(item.name)} quantity">−</button>
            <span>${item.quantity}</span>
            <button data-quantity="${item.id}" data-change="1"
                    aria-label="Increase ${escapeHTML(item.name)} quantity">+</button>
          </div>
          <button class="remove-button" data-remove="${item.id}">Remove item</button>
        </div>
        <div class="cart-item-price">${money(item.price * item.quantity)}</div>
      </article>
    `).join("");
  }

  $("#subtotal").textContent = money(details.subtotal);
  $("#deliveryFee").textContent = details.delivery === 0 && details.subtotal > 0
    ? "FREE" : money(details.delivery);
  $("#taxAmount").textContent = money(details.tax);
  $("#totalAmount").textContent = money(details.total);
  $("#checkoutPreview").textContent = `Your order total: ${money(details.total)}`;

  $("#checkoutButton").disabled = details.items.length === 0;
  $("#checkoutButton").style.opacity = details.items.length ? "1" : ".55";
  $("#checkoutButton").style.cursor = details.items.length ? "pointer" : "not-allowed";
}

function renderOrderHistory() {
  const history = $("#orderHistory");

  if (!orders.length) {
    history.innerHTML = `
      <div class="cart-empty">
        <span>🧾</span>
        <h3>No orders yet</h3>
        <p>Your confirmed demo orders will appear here.</p>
      </div>
    `;
    return;
  }

  history.innerHTML = [...orders].reverse().map((order) => `
    <article class="history-card">
      <div class="history-head">
        <strong>Order #${escapeHTML(order.id)}</strong>
        <span>✓ Confirmed</span>
      </div>
      <p>${escapeHTML(order.date)}</p>
      <p>${order.items.map((item) =>
        `${escapeHTML(item.name)} × ${item.quantity}`
      ).join(", ")}</p>
      <p class="history-total">Total: ${money(order.total)}</p>
    </article>
  `).join("");
}

function showOrderConfirmation(order) {
  $("#orderMessage").textContent =
    `Thank you, ${order.customer.name}! Your demo order has been saved on this device.`;

  $("#orderDetails").innerHTML = `
    <p><span>Order number</span><strong>#${escapeHTML(order.id)}</strong></p>
    <p><span>Customer</span><strong>${escapeHTML(order.customer.name)}</strong></p>
    <p><span>Phone</span><strong>${escapeHTML(order.customer.phone)}</strong></p>
    <p><span>Items</span><strong>${order.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></p>
    ${order.items.map((item) => `
      <p><span>${escapeHTML(item.name)} × ${item.quantity}</span><strong>${money(item.price * item.quantity)}</strong></p>
    `).join("")}
    <p><span>Delivery fee</span><strong>${order.delivery === 0 ? "FREE" : money(order.delivery)}</strong></p>
    <p><span>Taxes</span><strong>${money(order.tax)}</strong></p>
    <p><span>Order total</span><strong>${money(order.total)}</strong></p>
    <p><span>Deliver to</span><strong>${escapeHTML(order.customer.address)}</strong></p>
  `;

  $("#orderSection").classList.remove("hidden");
  scrollToSection("#orderSection");
}

function handleCheckout(event) {
  event.preventDefault();

  if (!cart.length) {
    showToast("Please add food to your cart first.");
    scrollToSection("#menu");
    return;
  }

  const form = event.currentTarget;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const details = getCartDetails();

  const order = {
    id: `${Date.now().toString().slice(-8)}`,
    date: new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    }),
    customer: {
      name: String(formData.get("customerName")).trim(),
      phone: String(formData.get("phone")).trim(),
      email: String(formData.get("email")).trim(),
      address: String(formData.get("address")).trim(),
      instructions: String(formData.get("instructions") || "").trim()
    },
    items: details.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    subtotal: details.subtotal,
    delivery: details.delivery,
    tax: details.tax,
    total: details.total
  };

  if (!order.customer.name || !order.customer.address) {
    showToast("Please enter your name and delivery address.");
    return;
  }

  const previousOrders = orders;
  orders = [...orders, order];

  if (!saveStorage(STORAGE_KEYS.orders, orders)) {
    orders = previousOrders;
    return;
  }

  cart = [];
  saveStorage(STORAGE_KEYS.cart, cart);

  renderCart();
  renderOrderHistory();
  showOrderConfirmation(order);
  form.reset();
  showToast("Your demo order is confirmed!");
}

function setupEvents() {
  $("#searchInput").addEventListener("input", renderFoods);
  $("#priceFilter").addEventListener("change", renderFoods);
  $("#sortFilter").addEventListener("change", renderFoods);

  $("#categoryFilter").addEventListener("change", (event) => {
    activeCategory = event.target.value;
    updateCategoryButtons();
    renderFoods();
  });

  $("#categoryChips").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-category]");
    if (!chip) return;

    activeCategory = chip.dataset.category;
    updateCategoryButtons();
    renderFoods();
  });

  foodGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(button.dataset.add);
  });

  restaurantGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-restaurant]");
    if (!button) return;

    $("#searchInput").value = button.dataset.restaurant;
    activeCategory = "All";
    updateCategoryButtons();
    renderFoods();
    scrollToSection("#menu");
  });

  cartItems.addEventListener("click", (event) => {
    const quantityButton = event.target.closest("[data-quantity]");
    const removeButton = event.target.closest("[data-remove]");

    if (quantityButton) {
      changeQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
    }

    if (removeButton) removeFromCart(removeButton.dataset.remove);
  });

  $("#cartButton").addEventListener("click", () => scrollToSection("#cartSection"));
  $("#clearCartButton").addEventListener("click", clearCart);

  $("#checkoutButton").addEventListener("click", () => {
    if (!cart.length) {
      showToast("Your cart is empty. Add some food first!");
      return;
    }
    scrollToSection("#checkoutSection");
  });

  $("#checkoutForm").addEventListener("submit", handleCheckout);

  $("#continueShopping").addEventListener("click", () => {
    $("#orderSection").classList.add("hidden");
    scrollToSection("#menu");
  });

  const menuToggle = $("#menuToggle");
  const navMenu = $("#navMenu");

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });

  const backTop = $("#backTop");

  window.addEventListener("scroll", () => {
    backTop.classList.toggle("visible", window.scrollY > 450);
  }, { passive: true });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initializeApp() {
  // Ignore invalid saved cart entries if the menu changes in a future version.
  cart = cart
    .filter((item) => foods.some((food) => food.id === item.id))
    .map((item) => ({
      id: item.id,
      quantity: Math.max(1, Math.min(20, Number(item.quantity) || 1))
    }));

  saveStorage(STORAGE_KEYS.cart, cart);

  renderRestaurants();
  renderFoods();
  renderCart();
  renderOrderHistory();
  setupEvents();

  $("#year").textContent = new Date().getFullYear();
}

initializeApp();