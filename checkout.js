document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let fullname = document.getElementById("fullname").value.trim();
    let address = document.getElementById("address").value.trim();
    let phone = document.getElementById("phone").value.trim();
    if (!/^\d{10,15}/.test(phone)){
        alert("");
        return;
    }
    let payment = document.getElementById("payment").value;

    if (fullname === "" || address === ""|| phone === "") {
        alert("Заполните все поля!");
        return;
    }

    alert(`Заказ оформлен! Доставка по адресу: ${address}`);
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});