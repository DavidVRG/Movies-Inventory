/* VARIABLES */
const toggleBtn = document.querySelector('.toggleButton')
const dropdown = document.querySelector('.dropdown')

/* NAVBAR */
toggleBtn.addEventListener('click', () => {
    dropdown.classList.toggle('showFlex')
})