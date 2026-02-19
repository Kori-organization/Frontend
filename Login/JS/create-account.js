const form = document.getElementById("createAccountForm");

const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");


// SHOW / HIDE PASSWORD
togglePassword.addEventListener('click', () => {

    password.type = password.type === 'password' ? 'text' : 'password';

    togglePassword.src =
        password.type === 'password'
        ? '../Assets/eye-off.svg'
        : '../Assets/eye.svg';

});

toggleConfirm.addEventListener('click', () => {

    confirmPassword.type =
        confirmPassword.type === 'password' ? 'text' : 'password';

    toggleConfirm.src =
        confirmPassword.type === 'password'
        ? '../Assets/eye-off.svg'
        : '../Assets/eye.svg';

});


// VALIDATION
form.addEventListener("submit", function(e)
{
    e.preventDefault();

    let valid = true;

    // reset errors
    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmError.style.display = "none";

    email.classList.remove("input-error");
    password.classList.remove("input-error");
    confirmPassword.classList.remove("input-error");


    // email validation
    if(!email.value.includes("@"))
    {
        emailError.style.display = "block";
        email.classList.add("input-error");
        valid = false;
    }


    // password regex
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/;

    if(!regex.test(password.value))
    {
        passwordError.style.display = "block";
        password.classList.add("input-error");
        valid = false;
    }


    // confirm password
    if(password.value !== confirmPassword.value)
    {
        confirmError.style.display = "block";
        confirmPassword.classList.add("input-error");
        valid = false;
    }


    if(valid)
    {
        alert("Conta criada com sucesso!");

        // redirecionar
        // location.href = "../index.html";
    }

});