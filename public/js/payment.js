document.getElementById("payment-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Отключаем стандартную отправку формы

    const cardNumber = document.getElementById("card-number").value.trim();
    const cardName = document.getElementById("card-name").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const address = document.getElementById("address").value.trim();

    // Проверка номера карты (16 цифр)
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
        alert("Введите корректный номер карты в формате 0000 0000 0000 0000");
        return;
    }

    // Проверка имени (только буквы и пробел)
    if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(cardName)) {
        alert("Введите корректное имя владельца карты");
        return;
    }

    // Проверка срока действия (формат MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert("Введите корректный срок действия в формате MM/YY");
        return;
    }

    // Проверка CVV (3 цифры)
    if (!/^\d{3}$/.test(cvv)) {
        alert("Введите корректный CVV (3 цифры)");
        return;
    }

    // Проверка адреса (не пустой, минимум 5 символов)
    if (address.length < 5) {
        alert("Введите корректный адрес доставки");
        return;
    }

    // Если все данные верны
    document.getElementById("success-message").classList.remove("hidden");

    // Выводим сообщение с адресом (можно заменить на API отправки заказа)
    alert(`Ваш заказ будет доставлен по адресу: ${address}`);

    setTimeout(() => {
        window.location.href = "index.html"; // Перенаправление на главную страницу
    }, 2000);
});

document.getElementById("card-number").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").substring(0, 16);
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    e.target.value = value;
});

document.getElementById("expiry-date").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    e.target.value = value;
});