// Calendar functionality
const calendarElement = document.getElementById('calendar');
const currentMonthElement = document.getElementById('current-month');
const previousMonthButton = document.getElementById('previous-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();
const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

function renderCalendar() {
    calendarElement.innerHTML = ''; // Clear calendar
    daysOfWeek.forEach(day => {
        const element = document.createElement('div');
        element.className = 'day head';
        element.textContent = day;
        calendarElement.appendChild(element);
    }); // Add calendar headers

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' }); // Set header on top
    const formattedMonth =
        monthName.charAt(0).toUpperCase() + monthName.slice(1);

    currentMonthElement.textContent = `${formattedMonth} de ${year}`;


    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get first day of month
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarElement.appendChild(document.createElement('div'));
    } // Add empty spaces

    const today = new Date();
    for (let day = 1; day <= totalDaysInMonth; day++) { // Create days
        const element = document.createElement('div');
        element.className = 'day';
        element.textContent = day;
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            element.classList.add('today');
        }
        calendarElement.appendChild(element); // Mark today and add to calendar
    }
}

previousMonthButton.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar()
};

nextMonthButton.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar()
}; // Previous and next month buttons

renderCalendar();

// Monster click effect
const monsterImage = document.querySelector('.monster-container img');

monsterImage.addEventListener('click', () => {
    monsterImage.classList.remove('shake'); // Reset animation
    void monsterImage.offsetWidth;          // Force reflow
    monsterImage.classList.add('shake');
});

// Calculator
const n1Input = document.getElementById('n1');
const n2Input = document.getElementById('n2');
const resultValue = document.querySelector('.result-value');

const MEDIA = 7;

function limitarInput(input) {
    let valor = parseFloat(input.value);

    if (isNaN(valor)) return;

    if (valor > 10) input.value = 10;
    if (valor < 0) input.value = 0;
}

function calcular() {
    limitarInput(n1Input);
    limitarInput(n2Input);

    const n1 = parseFloat(n1Input.value);
    const n2 = parseFloat(n2Input.value);

    if (isNaN(n1) || isNaN(n2)) {
        resultValue.textContent = '';
        return;
    }

    const soma = n1 + n2;
    const mediaAtual = soma / 2;

    if (mediaAtual >= MEDIA) {
        resultValue.textContent = '0';
    } else {
        const falta = (MEDIA * 2 - soma).toFixed(1);
        resultValue.textContent = falta;
    }
}

n1Input.addEventListener('input', calcular);
n2Input.addEventListener('input', calcular);