// calendário
const cal = document.getElementById('calendar');
const monthEl = document.getElementById('month');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let date = new Date();
const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

function render() {
    cal.innerHTML = ''; // apagar 
    days.forEach(d => { const el = document.createElement('div'); el.className = 'day head'; el.textContent = d; cal.appendChild(el); }); // adiciona o calendário

    const y = date.getFullYear(), m = date.getMonth();
    monthEl.textContent = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }); // define o ano e mês do cabeçalho

    const first = new Date(y, m, 1).getDay(); // descobre o primeiro dia do mês
    const total = new Date(y, m + 1, 0).getDate(); // descobre o total de dias no mês
    for (let i = 0; i < first; i++) { cal.appendChild(document.createElement('div')); } // Descobre os espaços vazios 

    const today = new Date();
    for (let d = 1; d <= total; d++) { // cria os dias 
        const el = document.createElement('div');
        el.className = 'day';
        el.textContent = d;
        if (d === today.getDate() && m === today.getMonth() && y === today.getFullYear()) el.classList.add('today');
        cal.appendChild(el); // marca o dia de hoje e adiciona no calendário
    }
}
prev.onclick = () => { date.setMonth(date.getMonth() - 1); render() };
next.onclick = () => { date.setMonth(date.getMonth() + 1); render() }; // botão de mês anterior e posterior
render();

// Clicar no monstro
const monster = document.querySelector('.monster img');

monster.addEventListener('click', () => {
    monster.classList.remove('shake'); // reseta
    void monster.offsetWidth;          // força reflow
    monster.classList.add('shake');
});