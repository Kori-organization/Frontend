const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirm = document.getElementById('toggleConfirm');

togglePassword.addEventListener('click', () => {
    password.type = password.type === 'password' ? 'text' : 'password';
    togglePassword.src = password.type === 'password'
        ? '../Assets/eye-off.svg'
        : '../Assets/eye.svg';
});

toggleConfirm.addEventListener('click', () => {
    confirmPassword.type = confirmPassword.type === 'password' ? 'text' : 'password';
    toggleConfirm.src = confirmPassword.type === 'password'
        ? '../Assets/eye-off.svg'
        : '../Assets/eye.svg';
});

document.querySelector("form").addEventListener("submit", function (e) {

    if (password.value !== confirmPassword.value) {
        e.preventDefault();
        alert("As senhas não coincidem!");
    }

});