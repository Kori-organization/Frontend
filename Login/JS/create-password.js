const toggles = document.querySelectorAll('.toggle-password');

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = document.getElementById(toggle.dataset.target);

        if (input.type === 'password') {
            input.type = 'text';
            toggle.src = '../../Assets/eye.svg';
        } else {
            input.type = 'password';
            toggle.src = '../../Assets/eye-off.svg';
        }
    });
});

const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');

document.querySelector("form").addEventListener("submit", function (e) {

    e.preventDefault();

    if (newPassword.value !== confirmNewPassword.value) {
        e.preventDefault();
        alert("As senhas não coincidem!");
    } else {
        window.location.href = "new-password.html";
    }
});