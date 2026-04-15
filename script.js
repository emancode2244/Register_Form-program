function showLogin() {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");
}

function showRegister() {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");

    registerTab.classList.add("active");
    loginTab.classList.remove("active");
}

function togglePassword(id) {
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}


function checkInput(input) {
    if (input.value !== "") {
        input.parentElement.classList.add("active");
    } else {
        input.parentElement.classList.remove("active");
    }
}

// Register
function register() {
    let name = regName.value.trim();
    let email = regEmail.value.trim();
    let pass = regPass.value.trim();

    let error = document.getElementById("regError");
    error.innerText = "";

    if (!name || !email || !pass) {
        error.innerText = "Fill all fields";
        return;
    }

    if (pass.length < 6) {
        error.innerText = "Password too short";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        error.innerText = "Email exists";
        return;
    }

    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    error.style.color = "lightgreen";
    error.innerText = "Success ✔";

    setTimeout(showLogin, 1000);
}

// Login
function login() {
    let email = loginEmail.value.trim();
    let pass = loginPass.value.trim();

    let error = document.getElementById("loginError");
    error.innerText = "";

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Welcome " + user.name);
    } else {
        error.innerText = "Wrong data";
    }
}