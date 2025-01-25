// Контейнеры для корзины и товаров
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total-price');
const closeCartBtn = document.getElementById('close-cart-btn');

// Массив для корзины
let cart = [];

// Функция для добавления товара в корзину
function addToCart(productName, productPrice) {
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1; // Увеличиваем количество, если товар уже в корзине
  } else {
    const product = {
      name: productName,
      price: productPrice,
      quantity: 1
    };
    cart.push(product); // Добавляем новый товар в корзину
  }

  updateCart(); // Обновляем отображение корзины
}

// Функция для обновления корзины
function updateCart() {
  cartItemsContainer.innerHTML = ''; // Очищаем контейнер корзины
  let total = 0;

  cart.forEach(item => {
    const itemElem = document.createElement('div');
    itemElem.classList.add('cart-item');
    itemElem.innerHTML = 
      `<p><strong>${item.name}</strong></p>
      <p>${item.price}₽ x ${item.quantity}</p>`
    ;
    cartItemsContainer.appendChild(itemElem);
    total += item.price * item.quantity;
  });

  totalPriceElem.textContent = `${total}₽`; // Обновляем итоговую сумму
}

// Обработчик кликов по кнопкам "Добавить в корзину"
function attachAddToCartListeners() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const productName = button.getAttribute('data-name');
      const productPrice = parseFloat(button.getAttribute('data-price'));

      if (productName && !isNaN(productPrice)) {
        addToCart(productName, productPrice); // Добавляем товар в корзину
      } else {
        console.error("Ошибка: Некорректные данные товара");
      }
    });
  });
}

// Открытие модального окна корзины
function openCart() {
  cartModal.style.display = 'block';
}

// Закрытие модального окна корзины
closeCartBtn.onclick = function () {
  cartModal.style.display = 'none';
};

// Закрытие корзины при клике за ее пределами
window.onclick = function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
  }
};

// Инициализация добавления товаров в корзину при загрузке страницы
attachAddToCartListeners();

// Открытие корзины
document.getElementById('cart-btn').addEventListener('click', openCart);

// Получаем кнопку "Перейти к оплате"
const checkoutBtn = document.getElementById('checkout-btn');

// Добавляем обработчик события на клик по кнопке
checkoutBtn.addEventListener('click', () => {
  // Переходим на страницу оплаты
  window.location.href = 'payment.html';
});
// Получаем элементы кнопок для входа и регистрации
const loginToggle = document.getElementById('login-toggle');
const registerToggle = document.getElementById('register-toggle');

// Получаем сами формы
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Переключаем формы при клике на кнопки
loginToggle.addEventListener('click', () => {
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});

registerToggle.addEventListener('click', () => {
  registerForm.style.display = 'block';
  loginForm.style.display = 'none';
});

// Изначально показываем форму для входа
loginForm.style.display = 'block';
registerForm.style.display = 'none';
// Обработчик для формы входа
document.getElementById('login-form-element').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    // Пример проверки данных (можно добавить реальную валидацию или подключение к серверу)
    if (email && password) {
      // Если данные введены, редиректим на главную страницу
      window.location.href = 'index.html';
    } else {
      alert('Пожалуйста, заполните все поля!');
    }
  });
  
  // Обработчик для формы регистрации
  document.getElementById('register-form-element').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы
  
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
  
    // Пример проверки данных
    if (password === confirmPassword) {
      // Если все в порядке, редиректим на главную страницу
      window.location.href = 'index.html';
    } else {
      alert('Пароли не совпадают!');
    }
  });
  const user = localStorage.getItem('user');
  if (user) {
    // Отображать кнопку "Выйти" и скрывать "Вход"
  } else {
    // Показывать кнопку "Вход"
  }
  
// Пример для кнопки "Выйти" (если используется авторизация на клиентской стороне)
document.getElementById('logout-btn').addEventListener('click', function(event) {
    event.preventDefault();
    // Очищаем данные пользователя из localStorage или sessionStorage (если такие использовались)
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    // Перенаправляем на страницу входа
    window.location.href = 'login-register.html';
  });
  document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
  
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCVC = document.getElementById('card-cvc').value;
    const address = document.getElementById('address').value;
  
    // Для демонстрации выводим данные в консоль
    console.log('Card Number:', cardNumber);
    console.log('Card Expiry:', cardExpiry);
    console.log('Card CVC:', cardCVC);
    console.log('Address:', address);
  
    // Здесь нужно будет интегрировать с платёжной системой для реальной обработки данных
  });