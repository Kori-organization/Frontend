// ===== DOM ELEMENT REFERENCES =====

// Main grade modal overlay
const gradeOverlay = document.getElementById('gradeOverlay');

// Confirmation modal overlay
const confirmOverlay = document.getElementById('confirmOverlay');

// Toast notifications container
const toastWrap = document.querySelector('.toast-wrap');

// Grade input fields
const nota1Input = document.getElementById('nota1');
const nota2Input = document.getElementById('nota2');

// Average grade display
const avgValue = document.getElementById('avgValue');

// Admin warning hint
const saveHint = document.getElementById('saveHint');

// Student information in modal
const gradeTitle = document.getElementById('gradeTitle');
const gradeEmail = document.getElementById('gradeEmail');
const gradeMat = document.getElementById('gradeMat');

// Confirmation modal data
const confirmStudent = document.getElementById('confirmStudent');
const confirmAvg = document.getElementById('confirmAvg');

// Currently selected student row
let currentRow = null;


// ===== GLOBAL CLICK HANDLER =====

// Detect clicks on "add grade" buttons
document.addEventListener('click', (e) => {
    const plus = e.target.closest('.action-btn.plus');
    if (!plus) return;

    const row = plus.closest('.student-row');
    openGradeModal(row);
});


// ===== MODAL CONTROL FUNCTIONS =====

// Open grade modal and populate student data
function openGradeModal(row) {
    currentRow = row;

    gradeTitle.textContent = row.querySelector('.nome').textContent.trim();
    gradeEmail.textContent = row.querySelector('.email').textContent.trim();
    gradeMat.textContent = row.querySelector('.matricula').textContent.trim();

    // Reset inputs and UI
    nota1Input.value = '';
    nota2Input.value = '';
    avgValue.textContent = '—';
    saveHint.style.display = 'none';

    // Show modal
    gradeOverlay.classList.add('show');
    gradeOverlay.setAttribute('aria-hidden', 'false');
    nota1Input.focus();
}

// Close grade modal
function closeGradeModal() {
    gradeOverlay.classList.remove('show');
    gradeOverlay.setAttribute('aria-hidden', 'true');
}

// Close confirmation modal
function closeConfirmModal() {
    confirmOverlay.classList.remove('show');
    confirmOverlay.setAttribute('aria-hidden', 'true');
}


// ===== GRADE UTILITIES =====

// Parse numeric grade value safely
function getGradeValue(input) {
    if (!input.value) return 0;

    const value = parseFloat(input.value.replace(',', '.'));
    return isNaN(value) ? 0 : value;
}

// Clamp grade value between 0 and 10
function clampGrade(input) {
    let value = getGradeValue(input);

    if (value > 10) value = 10;
    if (value < 0) value = 0;

    // Format value with one decimal (remove .0)
    input.value = value === 0 ? '' : value.toFixed(1).replace('.0', '');
}

// Calculate average value
function calculateAverageValue() {
    const v1 = getGradeValue(nota1Input);
    const v2 = getGradeValue(nota2Input);
    return ((v1 + v2) / 2).toFixed(1);
}

// Update average display dynamically
function calcAvg() {
    if (!nota1Input.value && !nota2Input.value) {
        avgValue.textContent = '—';
        return;
    }

    avgValue.textContent = calculateAverageValue();
}


// ===== INPUT EVENTS =====

// Recalculate average while typing
nota1Input.addEventListener('input', calcAvg);
nota2Input.addEventListener('input', calcAvg);

// Clamp values when input loses focus
nota1Input.addEventListener('blur', () => clampGrade(nota1Input));
nota2Input.addEventListener('blur', () => clampGrade(nota2Input));


// ===== BUTTON ACTIONS =====

// Close grade modal
document.getElementById('btnBack').addEventListener('click', closeGradeModal);

// Save grades button
document.getElementById('btnSaveNote').addEventListener('click', () => {
    clampGrade(nota1Input);
    clampGrade(nota2Input);

    const avg = calculateAverageValue();

    // Show admin warning
    saveHint.style.display = 'block';

    // Populate confirmation modal
    confirmStudent.textContent = gradeTitle.textContent;
    confirmAvg.textContent = `Média: ${avg}`;

    // Show confirmation modal
    confirmOverlay.classList.add('show');
    confirmOverlay.setAttribute('aria-hidden', 'false');
});

// Cancel confirmation
document.getElementById('confirmCancel').addEventListener('click', closeConfirmModal);

// Confirm save action
document.getElementById('confirmSend').addEventListener('click', () => {
    const btn = document.getElementById('confirmSend');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    // Simulate async request
    setTimeout(() => {
        const success = Math.random() < 0.88;

        if (success) {
            showToast('success', 'Nota salva com sucesso.', 'A nota foi salva com êxito.');

            // Store average on row dataset
            if (currentRow) {
                currentRow.dataset.average = calculateAverageValue();
                currentRow.style.boxShadow = '0 10px 28px rgba(2,6,23,0.06)';
            }

            closeConfirmModal();
            closeGradeModal();
        } else {
            showToast(
                'error',
                'Não foi possível salvar a nota.',
                'Verifique sua conexão e tente novamente.'
            );
            closeConfirmModal();
        }

        // Reset button state
        btn.disabled = false;
        btn.textContent = 'Tem certeza?';
    }, 720);
});


// ===== OVERLAY CLICK HANDLERS =====

// Close grade modal when clicking outside
gradeOverlay.addEventListener('click', (e) => {
    if (e.target === gradeOverlay) closeGradeModal();
});

// Close confirmation modal when clicking outside
confirmOverlay.addEventListener('click', (e) => {
    if (e.target === confirmOverlay) closeConfirmModal();
});


// ===== TOAST NOTIFICATION =====

// Create and display toast message
function showToast(type = 'success', title = '', subtitle = '') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconSrc =
        type === 'error'
            ? '../Assets/error-icon.svg'
            : '../Assets/check-icon.svg';

    toast.innerHTML = `
        <img src="${iconSrc}" class="toast-icon" alt="">
        <div class="toast-text">
            <h4>${title}</h4>
            <p>${subtitle}</p>
        </div>
    `;

    toastWrap.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('hide');
    }, 2600);

    setTimeout(() => {
        toast.remove();
    }, 3200);
}


// ===== KEYBOARD SHORTCUTS =====

// Close modals using ESC key
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    if (confirmOverlay.classList.contains('show')) closeConfirmModal();
    else if (gradeOverlay.classList.contains('show')) closeGradeModal();
});
