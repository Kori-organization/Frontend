// ----- Delete confirmation flow (teachers) -----
(function () {
    const confirmOverlay = document.getElementById('confirmDeleteOverlay');
    const confirmNameEl = document.getElementById('confirmName');
    const confirmCancel = document.getElementById('confirmCancel');
    const confirmDelete = document.getElementById('confirmDelete');
    const toastWrapTeacher = document.getElementById('toastWrapTeacher');

    // Ensure toast container is globally accessible if needed
    window.toastWrapTeacher = toastWrapTeacher;

    let pendingRow = null; // Stores the row that will be deleted

    // Opens the confirmation overlay
    function openConfirm() {
        if (!confirmOverlay) return;
        confirmOverlay.classList.add('show');
        confirmOverlay.setAttribute('aria-hidden', 'false');
    }

    // Closes the confirmation overlay
    function closeConfirm() {
        if (!confirmOverlay) return;
        confirmOverlay.classList.remove('show');
        confirmOverlay.setAttribute('aria-hidden', 'true');
        pendingRow = null;
    }

    // Listen for clicks on trash icons (event delegation per actions container)
    document.querySelectorAll('.actions').forEach(actions => {
        actions.addEventListener('click', e => {

            // Check if an image was clicked
            const img = e.target.closest('img');
            if (!img) return;

            // Ensure the clicked image is the trash icon
            const src = (img.getAttribute('src') || '').toLowerCase();
            if (!src.includes('trash')) return;

            // Find the corresponding row
            const row = img.closest('.student-row');
            if (!row) return;

            // Get teacher name (fallback to username if necessary)
            const nameEl = row.querySelector('.teacher-name') || row.querySelector('.teacher-username');
            const name = nameEl ? nameEl.textContent.trim() : 'este registro';

            // Store row and update confirmation modal
            pendingRow = row;
            confirmNameEl.textContent = name;
            openConfirm();
        });
    });

    // Cancel button (Voltar)
    if (confirmCancel) {
        confirmCancel.addEventListener('click', () => {
            closeConfirm();
        });
    }

    // Confirm delete button
    if (confirmDelete) {
        confirmDelete.addEventListener('click', () => {

            if (pendingRow) {

                // Optional fade-out animation before removing the row
                pendingRow.animate(
                    [
                        { opacity: 1, transform: 'translateY(0) scale(1)' },
                        { opacity: 0, transform: 'translateY(8px) scale(0.98)' }
                    ],
                    { duration: 180, easing: 'ease' }
                );

                // Remove row after animation completes
                setTimeout(() => {
                    pendingRow.remove();
                }, 180);
            }

            closeConfirm();

            // Show success toast
            const deletedName = confirmNameEl.textContent || 'Professor';

            if (typeof showToast === 'function') {
                showToast('teacher', 'success', 'Professor(a) excluído', `${deletedName} removido com sucesso.`);
            } else {

                // Fallback toast creation if showToast is not available
                const toast = document.createElement('div');
                toast.className = 'toast success';
                toast.innerHTML = `
                    <img src="../Assets/check-icon.svg" style="width:30px;height:22px">
                    <div class="toast-text">
                        <h4>Professor(a) excluído</h4>
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

    // Close overlay when clicking outside the modal
    if (confirmOverlay) {
        confirmOverlay.addEventListener('click', e => {
            if (e.target === confirmOverlay) closeConfirm();
        });
    }

    // Close overlay with ESC key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && confirmOverlay && confirmOverlay.classList.contains('show')) {
            closeConfirm();
        }
    });

})();