const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.src = 'Assets/eye.svg';
    } else {
        passwordInput.type = 'password';
        togglePassword.src = 'Assets/eye-off.svg';
    }
});

const form = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", function(e)
{
    e.preventDefault();

    let valid = true;

    // Reset
    emailError.style.display = "none";
    passwordError.style.display = "none";

    email.classList.remove("input-error");
    password.classList.remove("input-error");


    // Email error example
    if(email.value !== "admin@kori.com")
    {
        emailError.style.display = "block";
        email.classList.add("input-error");
        valid = false;
    }


    // Password validation
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/;

    if(!regex.test(password.value))
    {
        passwordError.style.display = "block";
        password.classList.add("input-error");
        valid = false;
    }


    if(valid)
    {
        alert("Login sucesso!");
        // location.href = "home.html";
    }

});