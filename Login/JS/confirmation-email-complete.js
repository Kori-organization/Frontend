const mode = "success";
// const mode = "error";

const icon = document.getElementById("statusIcon");
const title = document.getElementById("statusTitle");
const text = document.getElementById("statusText");
const resend = document.getElementById("resendText");


if (mode === "success") {
    icon.src = "../Assets/check-icon.svg";
    title.innerHTML = "Email enviado!";
    text.innerHTML =
        `Vá até sua caixa de entrada e clique em <br>
                Alterar Senha no email que mandamos para <br>
                <span>gabriela.ricci@kori.com.br</span>.`;
    resend.innerHTML = "Não recebeu um email?";
}
else {
    icon.src = "../Assets/error-icon.svg";
    title.innerHTML =
        "Não foi possível<br>enviar o email.";
    text.innerHTML =
        `Por favor, verifique se o endereço<br>
                <span>gabriela.ricci@kori.com.br</span>
                está apto a receber mensagens e tente novamente.`;
    resend.innerHTML = "";
}