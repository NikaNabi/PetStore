document.addEventListener("DOMContentLoaded", function () {
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userPhone = document.getElementById("userPhone");
    const userAddress = document.getElementById("userAddress");
    const logoutBtn = document.getElementById("logoutBtn");

    // Загружаем данные пользователя из localStorage
    const user = JSON.parse(localStorage.getItem("loggedUser")) || {};

   // Устанавливаем данные в профиль
    userName.textContent = user.name || "Не указано";
    userEmail.textContent = user.email || "Не указано";
    userPhone.textContent = user.phone || "Не указано";
    userAddress.textContent = user.address || "Не указано";
    // Выход из аккаунта
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedUser");
            window.location.href = "index.html";
        });
    }

    // Функция редактирования
    function editField(fieldId, userKey) {
        const field = document.getElementById(fieldId);
        const newValue = prompt(`Введите новое значение для ${field.textContent}:, field.textContent`);
        if (newValue !== null && newValue.trim() !== "") {
            field.textContent = newValue;
            user[userKey] = newValue;
            localStorage.setItem("loggedUser", JSON.stringify(user));
        }
    }

    // Навешиваем обработчики на кнопки редактирования
    document.getElementById("editName").addEventListener("click", () => editField("userName", "name"));
    document.getElementById("editEmail").addEventListener("click", () => editField("userEmail", "email"));
    document.getElementById("editPhone").addEventListener("click", () => editField("userPhone", "phone"));
    document.getElementById("editAddress").addEventListener("click", () => editField("userAddress", "address"));

    // Переключение секций в личном кабинете
    const menuButtons = document.querySelectorAll(".menu-btn");
    const sections = document.querySelectorAll(".profile-section");

    menuButtons.forEach(button => {
        button.addEventListener("click", function () {
            menuButtons.forEach(btn => btn.classList.remove("active"));
            sections.forEach(sec => sec.classList.remove("active"));

            const sectionId = this.getAttribute("data-section");
            document.getElementById(sectionId).classList.add("active");
            this.classList.add("active");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const menuButtons = document.querySelectorAll(".menu-btn");
    const sections = document.querySelectorAll(".profile-section");

    menuButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Убираем активный класс у всех секций и кнопок
            menuButtons.forEach(btn => btn.classList.remove("active"));
            sections.forEach(sec => sec.classList.remove("active"));

            // Добавляем активный класс к выбранной секции
            const sectionId = this.getAttribute("data-section");
            document.getElementById(sectionId).classList.add("active");
            this.classList.add("active");
        });
    });
});
