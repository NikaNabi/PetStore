document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("openLoginForm");
    const registerBtn = document.getElementById("openRegisterForm");
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const closeButtons = document.querySelectorAll(".close");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const userDisplay = document.getElementById("userDisplay");

    function showModal(modal) {
        modal.classList.add("show");
    }

    function closeModal(modal) {
        modal.classList.remove("show");
    }

    if (loginBtn) loginBtn.addEventListener("click", () => showModal(loginModal));
    if (registerBtn) registerBtn.addEventListener("click", () => showModal(registerModal));

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            closeModal(this.closest(".modal"));
        });
    });

    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal")) {
            closeModal(event.target);
        }
    });

    function loginUser(username) {
        localStorage.setItem("loggedUser", JSON.stringify({
            name:username,
        email:"example@mail.com",
    phone:"1234567890",
address:"Не указан"}));
        window.location.href = "index.html";
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("loginUsername").value.trim();
            if (username) loginUser(username);
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("registerUsername").value.trim();
            if (username) loginUser(username);
        });
    }

    if (userDisplay) {
        const loggedUser = localStorage.getItem("loggedUser");
        if (loggedUser) {
            userDisplay.textContent = `🐾 ${loggedUser}`;
            userDisplay.href = "profile.html";
            userDisplay.style.fontWeight = "bold";

            const logoutBtn = document.createElement("a");
            logoutBtn.textContent = "🚪 Выход";
            logoutBtn.href = "#";
            logoutBtn.style.marginLeft = "15px";
            logoutBtn.style.fontWeight = "bold";

            logoutBtn.addEventListener("click", function (event) {
                event.preventDefault();
                localStorage.removeItem("loggedUser");
                window.location.href = "index.html";
            });

            userDisplay.parentNode.appendChild(logoutBtn);
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const usernameInput = document.getElementById("loginUsername");
            const username = usernameInput.value.trim();

            if (!username) {
                alert("Введите логин!");
                return;
            }

            localStorage.setItem("loggedUser", username); // Сохраняем имя пользователя
            window.location.href = "index.html"; // Переход на главную страницу
        });
    }
});