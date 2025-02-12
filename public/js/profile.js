document.addEventListener("DOMContentLoaded", function () {
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userPhone = document.getElementById("userPhone");
    const userAddress = document.getElementById("userAddress");
    const logoutBtn = document.getElementById("logoutBtn");
    const changePasswordBtn = document.getElementById("changePasswordBtn");
    const editAddressBtn = document.getElementById("editAddressBtn");

    // Загружаем данные пользователя из localStorage
    let user = JSON.parse(localStorage.getItem("loggedUser")) || {};

    // Если данных нет, создаем объект с дефолтными значениями
    if (!user.name) user.name = "Не указано";
    if (!user.email) user.email = "Не указано";
    if (!user.phone) user.phone = "Не указано";
    if (!user.address) user.address = "Не указано";
    if (!user.password) user.password = "Не указан"; // Добавим пароль, если его нет

    // Устанавливаем данные в профиль
    userName.textContent = user.name;
    userEmail.textContent = user.email;
    userPhone.textContent = user.phone;
    userAddress.textContent = user.address;

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
        const newValue = prompt(`Введите новое значение для ${field.textContent}:`, field.textContent);
        if (newValue !== null && newValue.trim() !== "") {
            field.textContent = newValue;
            user[userKey] = newValue;
            localStorage.setItem("loggedUser", JSON.stringify(user)); // Сохраняем изменения
        }
    }

    // Навешиваем обработчики на кнопки редактирования
    document.getElementById("editNameBtn").addEventListener("click", () => editField("userName", "name"));
    document.getElementById("editEmailBtn").addEventListener("click", () => editField("userEmail", "email"));
    document.getElementById("editPhoneBtn").addEventListener("click", () => editField("userPhone", "phone"));
    editAddressBtn.addEventListener("click", () => editField("userAddress", "address"));

    // Функция для изменения пароля
    function changePassword() {
        const currentPassword = prompt("Введите текущий пароль:");
        
        // Проверяем, правильно ли введен текущий пароль
        if (currentPassword !== user.password) {
            alert("Неверный текущий пароль");
            return;
        }

        const newPassword = prompt("Введите новый пароль:");
        if (newPassword && newPassword.trim() !== "") {
            user.password = newPassword;  // Сохраняем новый пароль в объект пользователя
            localStorage.setItem("loggedUser", JSON.stringify(user)); // Сохраняем изменения в localStorage
            alert("Пароль изменен успешно!");
        }
    }

    // Навешиваем обработчик на кнопку изменения пароля
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener("click", changePassword);
    }

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