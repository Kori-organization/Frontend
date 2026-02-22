// ===== COPY FUNCTION =====

const botoesCopiar = document.querySelectorAll(".copy-btn");
const toastCopy = document.getElementById("copyToast");

botoesCopiar.forEach(botao => {

    botao.addEventListener("click", () => {

        const card = botao.closest(".obs-card");
        const texto = card.querySelector("p").innerText;

        navigator.clipboard.writeText(texto)
            .then(() => {

                toastCopy.classList.add("show");

                setTimeout(() => {
                    toastCopy.classList.remove("show");
                }, 2000);

            });

    });

});


document.addEventListener('DOMContentLoaded', () => {

    const deleteButtons = document.querySelectorAll('.delete-btn');

    const confirmDeleteOverlay = document.getElementById('confirmDeleteOverlay');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const confirmCancelBtn = document.getElementById('confirmCancel');

    const toastWrap = document.getElementById('toastWrapTeacher');

    let cardToDelete = null;

    // =========================
    // TOAST
    // =========================
    function createToast(title, message = '', type = 'success') {

        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'error' : 'success'}`;

        const icon = type === 'error'
            ? '../Assets/error-icon.svg'
            : '../Assets/check-icon.svg';

        toast.innerHTML = `
            <img src="${icon}" style="width:30px;height:22px" alt="">
            <div class="toast-text">
                <h4>${title}</h4>
                ${message ? `<p>${message}</p>` : ''}
            </div>
        `;

        toastWrap.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // =========================
    // OPEN MODAL
    // =========================
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cardToDelete = btn.closest('.obs-card');
            confirmDeleteOverlay.classList.add('show');
        });
    });

    // =========================
    // CANCEL
    // =========================
    confirmCancelBtn.addEventListener('click', () => {
        confirmDeleteOverlay.classList.remove('show');
        cardToDelete = null;
    });

    // =========================
    // CONFIRMATION
    // =========================
    confirmDeleteBtn.addEventListener('click', () => {

        if (!cardToDelete) return;

        // DO NOT remove the card

        confirmDeleteOverlay.classList.remove('show');

        createToast(
            'Observação excluída <br> com sucesso',
            '',
            'success'
        );

        cardToDelete = null;
    });

    // =========================
    // ESC MODAL
    // =========================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            confirmDeleteOverlay.classList.remove('show');
        }
    });

});