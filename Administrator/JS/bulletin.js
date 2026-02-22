const btnSave = document.querySelector('.save-btn');

btnSave.addEventListener('click', calcularTudo);

function calcularTudo() {
    const n1 = document.querySelectorAll('.n1');
    const n2 = document.querySelectorAll('.n2');
    const rec = document.querySelectorAll('.rec');
    const medias = document.querySelectorAll('.media-final');
    const status = document.querySelectorAll('.status');

    let aprovadoGeral = true;

    n1.forEach((_, i) => {
        const nota1 = Number(n1[i].value) || 0;
        const nota2 = Number(n2[i].value) || 0;

        const media = (nota1 + nota2) / 2;

        let mediaFinal = media;

        if (media < 7) {
            rec[i].disabled = false;
            const r = Number(rec[i].value) || 0;
            mediaFinal = (media + r) / 2;
        } else {
            rec[i].disabled = true;
            rec[i].value = '';
        }

        medias[i].textContent = mediaFinal.toFixed(1);

        if (mediaFinal >= 7) {
            status[i].textContent = 'Aprovado';
            status[i].classList.remove('red');
            status[i].classList.add('green');
        } else {
            status[i].textContent = 'Reprovado';
            status[i].classList.remove('green');
            status[i].classList.add('red');
            aprovadoGeral = false;
        }
    });

    const finalBox = document.querySelector('.final-status span');
    finalBox.textContent = `Situação final: ${aprovadoGeral ? 'Aprovado' : 'Reprovado'}.`;
}

document.addEventListener('DOMContentLoaded', calcularTudo);

const toast = document.getElementById('toast');
let toastTimeout;

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function validarNota(input) {
    input.addEventListener('input', () => {
        const valor = Number(input.value);

        if (input.value === '') return;

        if (valor < 0 || valor > 10) {
            input.value = '';
            showToast('Número inválido (0 a 10)');
            calcularTudo();
        }
    });
}

document.querySelectorAll('.nota').forEach(validarNota);