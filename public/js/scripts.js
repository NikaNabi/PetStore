
let wishlist = []; // Глобальная переменная для вишлиста

document.addEventListener("DOMContentLoaded", function () {
  let wishlist = [];

  const wishlistButton = document.getElementById("wishlist");
  const wishlistModal = document.getElementById("wishlist-modal");
  const wishlistItemsContainer = document.getElementById("wishlist-items");
  const closeWishlistBtn = document.getElementById("close-wishlist");

  function updateWishlist() {
      wishlistItemsContainer.innerHTML = "";

      if (wishlist.length === 0) {
          wishlistItemsContainer.innerHTML = "<p>В вашем виш-листе нет товаров.</p>";
      } else {
          wishlist.forEach((item) => {
              const itemElement = document.createElement("div");
              itemElement.classList.add("wishlist-item");
              itemElement.innerHTML = 
                  `<p>${item.name}</p>
                  <p>Цена: ${item.price} ₽</p>
                  <button class="add-to-cart-from-wishlist-btn" data-name="${item.name}" data-price="${item.price}">Добавить в корзину</button>
              `;
              wishlistItemsContainer.appendChild(itemElement);
          });
      }

      wishlistButton.innerHTML = `❤️ Виш-лист (${wishlist.length})`;
  }

  // Делегирование событий для кнопки "Добавить в вишлист"
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-wishlist")) {
        const productCard = event.target.closest(".product-card");
        const productName = productCard.querySelector("h3").innerText;
        const priceElement = productCard.querySelector(".price"); // Ищем элемент с ценой

        if (!priceElement) {
            console.error("Ошибка: не найден элемент с ценой");
            return;
        }

        const productPrice = parseFloat(priceElement.innerText.replace(/[^\d]/g, "")); // Извлекаем только число

        if (!productPrice || isNaN(productPrice)) {
            console.error("Ошибка: некорректная цена товара");
            return;
        }

        if (!wishlist.some((item) => item.name === productName)) {
            wishlist.push({ name: productName, price: productPrice });
            updateWishlist();
        }

        event.target.innerText = "✅ Добавлено";
        event.target.disabled = true;
    }
});

  // Открытие вишлиста
  wishlistButton.addEventListener("click", function () {
      wishlistModal.classList.remove("hidden");
      wishlistModal.style.display = "block";
      updateWishlist();
  });

  // Закрытие вишлиста
  closeWishlistBtn.addEventListener("click", function () {
      wishlistModal.classList.add("hidden");
      wishlistModal.style.display = "none";
  });

  // Закрытие при клике вне окна
  window.addEventListener("click", function (event) {
      if (event.target === wishlistModal) {
          wishlistModal.classList.add("hidden");
          wishlistModal.style.display = "none";
      }
  });

  // Добавление товара из вишлиста в корзину
  wishlistItemsContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("add-to-cart-from-wishlist-btn")) {
          const productName = event.target.getAttribute("data-name");
          const productPrice = event.target.getAttribute("data-price");

          addToCart(productName, productPrice);
          wishlist = wishlist.filter((item) => item.name !== productName);
          updateWishlist();
      }
  });
});
    // Форма входа и регистрации
    const loginBtn = document.getElementById("openLoginForm");
    const registerBtn = document.getElementById("openRegisterForm");
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const closeButtons = document.querySelectorAll(".close");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const userDisplay = document.getElementById("userDisplay");
    const logoutBtn = document.getElementById("logoutBtn");

    // Открытие и закрытие модальных окон
    function showModal(modal) {
        modal.classList.add("show");
        modal.style.display = "block"; // Добавляем, чтобы окно стало видимым
    }function closeModal(modal) {
      modal.classList.remove("show");
      modal.style.display = "none"; // Скрываем окно
  }

  if (loginBtn) loginBtn.addEventListener("click", () => showModal(loginModal));
  if (registerBtn) registerBtn.addEventListener("click", () => showModal(registerModal));

  closeButtons.forEach(button => {
      button.addEventListener("click", function () {
          closeModal(this.closest(".modal"));
      });
  });



    // Функция для входа пользователя (сохранение в localStorage)
    function loginUser(username) {
        localStorage.setItem("loggedUser", JSON.stringify({
            name: username,
            email: "example@mail.com",
            phone: "1234567890",
            address: "Не указан"
        }));
        updateUserDisplay();
        window.location.href = "index.html"; // Перенаправление на главную
    }

    // Обновление отображения пользователя
    function updateUserDisplay() {
        const loggedUser = localStorage.getItem("loggedUser");
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            userDisplay.textContent = `🐾 ${user.name}`;
            userDisplay.href = "profile.html"; // Перенаправление в личный кабинет
            userDisplay.style.fontWeight = "bold";

            if (logoutBtn) {
                logoutBtn.style.display = "inline-block";
                logoutBtn.addEventListener("click", function () {
                    localStorage.removeItem("loggedUser");
                    window.location.href = "index.html"; // Перезагрузка страницы
                });
            }
        } else {
            userDisplay.textContent = "🐾 Вход";
            userDisplay.href = "login.html"; // Если не вошел, ведем на логин
            if (logoutBtn) logoutBtn.style.display = "none";
        }
    }

    // Обработчик отправки формы входа
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("loginUsername").value.trim();
            if (username) loginUser(username);
        });
    }

    // Обработчик отправки формы регистрации
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("registerUsername").value.trim();
            if (username) loginUser(username); // Для простоты при регистрации сразу логиним пользователя
        });
    }

    // Обновление отображения пользователя на главной странице
    updateUserDisplay();

    // Контейнеры для корзины и товаров
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartBtn = document.getElementById('cart-btn');

    if (cartModal && cartItemsContainer && totalPriceElem && closeCartBtn && cartBtn) {
        // Массив для хранения товаров в корзине
        let cart = [];
// Функция для добавления товара в корзину
function addToCart(productName, productPrice) {
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
      existingProduct.quantity += 1; // Увеличиваем количество, если товар уже в корзине
  } else {
      cart.push({
          name: productName,
          price: productPrice,
          quantity: 1
      });
  }

  updateCart(); // Обновляем корзину
}

// Функция для обновления корзины
function updateCart() {
  cartItemsContainer.innerHTML = ''; // Очищаем контейнер
  let total = 0;

  cart.forEach(item => {
      const itemElem = document.createElement('div');
      itemElem.classList.add('cart-item');
      itemElem.innerHTML = 
         ` <p><strong>${item.name}</strong></p>
          <p>${item.price}₽ x ${item.quantity}</p>`
      ;
      cartItemsContainer.appendChild(itemElem);
      total += item.price * item.quantity;
  });

  totalPriceElem.textContent =` ${total}₽`; // Обновляем сумму
}

// Функция для добавления обработчиков кликов по кнопкам "Добавить в корзину"
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-to-cart')) {
      const button = event.target;
      const productName = button.getAttribute('data-name');
      const productPrice = parseFloat(button.getAttribute('data-price'));

      if (productName && !isNaN(productPrice)) {
          addToCart(productName, productPrice);
      } else {
          console.error("Ошибка: Некорректные данные товара");
      }
  }
});

// Ждём загрузки DOM, а затем вызываем attachAddToCartListeners()
document.addEventListener("DOMContentLoaded", function () {
    attachAddToCartListeners();
});

// Открытие модального окна корзины
cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'block';
});

// Закрытие корзины
closeCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Закрытие корзины при клике вне ее
window.addEventListener('click', event => {
  if (event.target === cartModal) {
      cartModal.style.display = 'none';
  }
});

// Инициализация обработчиков товаров
attachAddToCartListeners();
}

// Кнопка "Перейти к оплате" (для перехода на страницу оплаты)
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
checkoutBtn.addEventListener('click', () => {
  const loggedUser = localStorage.getItem("loggedUser");
  if (loggedUser) {
      window.location.href = 'payment.html'; // Переход на страницу оплаты
  } else {
      window.location.href = 'login.html'; // Если не вошел, перенаправление на страницу логина
  }
});
}
document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const allProducts = document.querySelectorAll('.product-card');

  function filterProductsByCategory(category) {
      allProducts.forEach(product => {
          const productCategory = product.getAttribute('data-category');
          if (category === 'all' || productCategory === category) {
              product.style.display = 'block';
          } else {
              product.style.display = 'none';
          }
      });
  }

  categoryButtons.forEach(button => {
      button.addEventListener('click', function () {
          const category = button.getAttribute('data-category');
          filterProductsByCategory(category);
      });
  });

  // Показываем все товары по умолчанию
  filterProductsByCategory('all');
});
