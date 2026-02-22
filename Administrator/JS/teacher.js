// ----- Delete confirmation flow (teachers) -----
(function () {
    const confirmOverlay = document.getElementById('confirmDeleteOverlay');
    const confirmNameEl = document.getElementById('confirmName');
    const confirmCancel = document.getElementById('confirmCancel');
    const confirmDelete = document.getElementById('confirmDelete');
    const toastWrapTeacher = document.getElementById('toastWrapTeacher');

    // fallback in case your existing getEl strategy is used elsewhere:
    window.toastWrapTeacher = toastWrapTeacher;

    let pendingRow = null; // row to be deleted

    // helper to open overlay
    function openConfirm() {
        if (!confirmOverlay) return;
        confirmOverlay.classList.add('show');
        confirmOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeConfirm() {
        if (!confirmOverlay) return;
        confirmOverlay.classList.remove('show');
        confirmOverlay.setAttribute('aria-hidden', 'true');
        pendingRow = null;
    }

    // Click on trash icon (delegation)
    document.querySelectorAll('.actions').forEach(actions => {
        actions.addEventListener('click', e => {
            const img = e.target.closest('img');
            if (!img) return;

            const src = (img.getAttribute('src') || '').toLowerCase();
            if (!src.includes('trash')) return; // só reage a ícones de trash (arquivo com 'trash' no nome)

            const row = img.closest('.student-row');
            if (!row) return;

            // pega nome do professor (ou username / fallback)
            const nameEl = row.querySelector('.teacher-name') || row.querySelector('.teacher-username');
            const name = nameEl ? nameEl.textContent.trim() : 'este registro';

            pendingRow = row;
            confirmNameEl.textContent = name;
            openConfirm();
        });
    });

    // Cancel / Voltar
    if (confirmCancel) {
        confirmCancel.addEventListener('click', () => {
            closeConfirm();
        });
    }

    // Confirm delete
    if (confirmDelete) {
        confirmDelete.addEventListener('click', () => {
            if (pendingRow) {
                // animação opcional: reduz e remove
                pendingRow.animate([
                    { opacity: 1, transform: 'translateY(0) scale(1)' },
                    { opacity: 0, transform: 'translateY(8px) scale(0.98)' }
                ], { duration: 180, easing: 'ease' });

                // Espera a animação terminar para realmente remover (não necessário, mas fica suave)
                setTimeout(() => {
                    pendingRow.remove();
                }, 180);
            }

            closeConfirm();

            // Mostra toast (usa sua função showToast já existente)
            const deletedName = confirmNameEl.textContent || 'Professor';
            if (typeof showToast === 'function') {
                showToast('teacher', 'success', 'Professor excluído', `${deletedName} removido com sucesso.`);
            } else {
                // fallback — cria toast diretamente se showToast não existir
                const toast = document.createElement('div');
                toast.className = 'toast success';
                toast.innerHTML = `
          <img src="../Assets/check-icon.svg" style="width:30px;height:22px">
          <div class="toast-text">
            <h4>Professor excluído</h4>
            <p>${deletedName} removido com sucesso.</p>
          </div>
        `;
                toastWrapTeacher && toastWrapTeacher.appendChild(toast);
                setTimeout(() => {
                    toast.classList.add('hide');
                    setTimeout(() => toast.remove(), 300);
                }, 4000);
            }
        });
    }

    // click outside overlay to close
    if (confirmOverlay) {
        confirmOverlay.addEventListener('click', e => {
            if (e.target === confirmOverlay) closeConfirm();
        });
    }

    // ESC fecha
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && confirmOverlay && confirmOverlay.classList.contains('show')) {
            closeConfirm();
        }
    });

})();