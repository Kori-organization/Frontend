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
    currentMonthElement.textContent = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }); // Set header year and month

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