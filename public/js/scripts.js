// Контейнеры для корзины и товаров
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total-price');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartBtn = document.getElementById('cart-btn');

// Проверяем, существуют ли нужные элементы
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
            itemElem.innerHTML = `
                <p><strong>${item.name}</strong></p>
                <p>${item.price}₽ x ${item.quantity}</p>`
            ;
            cartItemsContainer.appendChild(itemElem);
            total += item.price * item.quantity;
        });

        totalPriceElem.textContent = `${total}₽`; // Обновляем сумму
    }

    // Обработчик кликов по кнопкам "Добавить в корзину"
    function attachAddToCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productName = button.getAttribute('data-name');
                const productPrice = parseFloat(button.getAttribute('data-price'));

                if (productName && !isNaN(productPrice)) {
                    addToCart(productName, productPrice); // Добавляем товар
                } else {
                    console.error("Ошибка: Некорректные данные товара");
                }
            });
        });
    }

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

// Получаем кнопку "Перейти к оплате"
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'payment.html'; // Переход на страницу оплаты
    });
}

// Оплата (проверка данных карты)
const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCVC = document.getElementById('card-cvc').value;
        const address = document.getElementById('address').value;

        // Для демонстрации выводим данные в консоль
        console.log('Card Number:', cardNumber);
        console.log('Card Expiry:', cardExpiry);
        console.log('Card CVC:', cardCVC);
        console.log('Address:', address);

        // Здесь можно добавить реальную интеграцию с платежной системой
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.getElementById("checkout-btn");
  const loggedUser = localStorage.getItem("loggedUser");

  if (checkoutBtn) {
      if (!loggedUser) {
          checkoutBtn.textContent = "Войти в личный кабинет";
          checkoutBtn.addEventListener("click", function () {
              window.location.href = "login.html"; // Перенаправление на вход
          });
      } else {
          checkoutBtn.textContent = "Оплатить";
          checkoutBtn.addEventListener("click", function () {
              window.location.href = "payment.html"; // Перенаправление на оплату
          });
      }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const userDisplay = document.getElementById("userDisplay"); // Кнопка профиля
  const logoutBtn = document.getElementById("logoutBtn"); // Кнопка выхода
  let loggedUser = localStorage.getItem("loggedUser");

  // Проверяем, есть ли данные и корректны ли они
  try {
      loggedUser = loggedUser ? JSON.parse(loggedUser) : null;
  } catch (error) {
      console.error("Ошибка при разборе JSON:", error);
      loggedUser = null;
  }

  if (userDisplay) {
      if (loggedUser && loggedUser.name) {
          userDisplay.textContent = `🐾 ${loggedUser.name}`;
          userDisplay.href = "profile.html"; // Перенаправление в личный кабинет

          if (logoutBtn) {
              logoutBtn.style.display = "inline-block";
              logoutBtn.addEventListener("click", function () {
                  localStorage.removeItem("loggedUser");
                  window.location.href = "index.html"; // Перезагрузка страницы
              });
          }
      } else {
          userDisplay.textContent = "🐾 Вход";
          userDisplay.href = "login.html"; // Если не вошёл, ведём на логин
          if (logoutBtn) logoutBtn.style.display = "none";
      }
  }
});