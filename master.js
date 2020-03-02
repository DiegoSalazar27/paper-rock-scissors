const rules__button = document.getElementById('rules__button')
const rulesContainer = document.getElementById('rulesContainer')
const closeRulesContainer = document.getElementById('closeRulesContainer')

const scoreTag = document.getElementById('score')
const main = document.getElementById('main')
const results = document.getElementById('results')
var user__response = false
var score = 0

const options = [
  paper = {
    name: 'paper',
    kill: ['rock', 'spock'],
  },
  rock = {
    name : 'rock',
    kill: ['scissors', 'lizzard'],
  },
  scissors = {
    name: 'scissors',
    kill: ['paper', 'lizzard'],
  }
]

const lizzard = {
  name: 'lizzard',
  kill: ['paper', 'spock']
}

const spock = {
  name: 'spock',
  kill: ['scissors', 'rock'],
}

if (user__response) {
  options.push(lizzard, spock)
}

const options__buttons = options.map(element => createElement(element))  //Creating button elements for the game

window.addEventListener('load', () =>{
  rules__button.addEventListener('click', () => rulesContainer.classList.add('rulesContainerActive'))
  closeRulesContainer.addEventListener('click', () => rulesContainer.classList.remove('rulesContainerActive'))

  options__buttons.forEach(element => main.appendChild(element))

  options__buttons.forEach(element => {
    element.addEventListener('click', game)
  })
})

function createElement(element){
  let container = document.createElement('div')
  let img = document.createElement('img')

  container.setAttribute('class', 'main__button')
  container.setAttribute('id', element.name)
  container.dataset.type = element.name;

  img.setAttribute('class', 'main__button__option')
  img.setAttribute('src', `./images/icon-${element.name}.svg`)
  img.setAttribute('alt', element.name)

  container.appendChild(img)

  return container
}

function game(){
  let type = this.dataset.type;
  this.dataset.user = 'true'

  const user_selection = options.filter(element => type === element.name)

  removeEvents()
  startGame(user_selection)
  main.classList.add('mainHide')
}

function removeEvents(){
  options__buttons.forEach(element =>{
    element.removeEventListener('click', game)
  })
}

function startGame(user_selection){
  let rand = Math.floor(Math.random() * (options.length - 1))  
  const house_selection = options[rand]

  let result = createElement(house_selection)
  results.lastElementChild.appendChild(result)
  result = createElement(user_selection[0])
  results.firstElementChild.appendChild(result)

  results.classList.add('results--show')

  if (house_selection.name === user_selection[0].name) {
    tieGame()
  }else if(house_selection.name === user_selection[0].kill[0] || house_selection.name === user_selection[0].kill[0]){
    userWins()
  }else{
    userLoses()
  }
  scoreTag.innerHTML = score
}

function tieGame(){
  console.log('Tie')
}

function userWins(){
  score++
  console.log('Wins')
}

function userLoses(){
  score > 0 ? score-- : null
  console.log('Loses')
}
