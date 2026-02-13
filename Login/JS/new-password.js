const monster = document.querySelector('.monster');

monster.addEventListener('click', () => {
    monster.classList.remove('shake');
    void monster.offsetWidth;
    monster.classList.add('shake');
});