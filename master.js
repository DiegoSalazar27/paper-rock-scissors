const paper = document.getElementById('paper')
const rock =  document.getElementById('rock')
const scissors =  document.getElementById('scissors')
const rules__button = document.getElementById('rules__button')
const rulesContainer = document.getElementById('rulesContainer')
const closeRulesContainer = document.getElementById('closeRulesContainer')

window.addEventListener('load', () =>{
  rules__button.addEventListener('click', () => rulesContainer.classList.add('rulesContainerActive'))
  closeRulesContainer.addEventListener('click', () => rulesContainer.classList.remove('rulesContainerActive'))
})
