function closeModal(modalId){
        document.getElementById(modalId).style.display="none";
    }
    document.addEventListener("DOMContentLoaded", function () {
    let loginModal = document.getElementById("loginModal");
    let registerModal = document.getElementById("registerModal");

    // Проверка наличия модальных окон
    if (!loginModal || !registerModal) {
        console.error("Ошибка: модальные окна не найдены!");
        return;
    }

    // Открытие модальных окон
    document.getElementById("openLoginForm").addEventListener("click", function () {
        loginModal.style.display = "block";
    });

    document.getElementById("openRegisterForm").addEventListener("click", function () {
        registerModal.style.display = "block";
    });

    // Закрытие модальных окон
    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    // Закрытие окна при клике вне его
    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });

    // Функция для отправки данных на сервер
    function sendRequest(url, data) {
        return fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => response.json());
    }
    

    // Вход
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let username = document.getElementById("loginUsername").value;
        let password = document.getElementById("loginPassword").value;

        sendRequest("/login", { username, password })
            .then(data => {
                if (data.success) {
                    alert("Вход успешен!");
                    window.location.href = "/"; // Перенаправление на главную
                } else {
                    alert("Ошибка: " + data.message);
                }
            })
            .catch(error => console.error("Ошибка:", error));
    });

    // Регистрация
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let username = document.getElementById("registerUsername").value;
        let password = document.getElementById("registerPassword").value;

        sendRequest("/register", { username, password })
            .then(data => {
                if (data.success) {
                    alert("Регистрация успешна!");
                    window.location.href = "/"; // Перенаправление на главную
                } else {
                    alert("Ошибка: " + data.message);
                }
            })
            .catch(error => console.error("Ошибка:", error));
    });
});