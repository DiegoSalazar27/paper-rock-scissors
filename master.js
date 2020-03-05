const rules__button = document.getElementById('rules__button')
const rulesContainer = document.getElementById('rulesContainer')
const rulesImg = document.getElementById('rulesImg')
const closeRulesContainer = document.getElementById('closeRulesContainer')

const scoreTag = document.getElementById('score')
const main = document.getElementById('main')
const results = document.getElementById('results')
const user = results.firstElementChild.lastElementChild
const house = results.lastElementChild.lastElementChild
const conclusion__title = document.getElementById('conclusion__title')
const play_again = document.getElementById('play_again')
const change = document.getElementById('change')

const rulesBonus = './images/image-rules-bonus.svg'
const rulesNormal = './images/image-rules.svg'
var user__response = false
var score = 0
var main__buttons = document.getElementsByClassName('main__buttons')

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
  rulesImg.setAttribute('src', rulesBonus)
  main.classList.add('bonus')
}

const options__buttons = options.map(element => createElement(element))  //Creating button elements for the game

window.addEventListener('load', () =>{
  change.addEventListener('click', changeGame)

  rules__button.addEventListener('click', () => rulesContainer.classList.add('rulesContainerActive'))
  closeRulesContainer.addEventListener('click', () => rulesContainer.classList.remove('rulesContainerActive'))

  options__buttons.forEach(element => main.appendChild(element))
  
  searchButtons()

  play_again.addEventListener('click', () =>{
    searchButtons()

    change.addEventListener('click', changeGame)
    results.classList.remove('results--show')
    main.classList.remove('mainHide')
    conclusion__title.parentElement.classList.remove('conclusion--Active')
    house.parentElement.style.setProperty('transform', 'translate(-60%)')
    user.parentElement.style.setProperty('transform', 'translate(60%)')
  })
})

function searchButtons(){
  main.childNodes.forEach(element =>{
    if (element.classList) {
      element.addEventListener('click', game)  
    }
  })
}

function changeGame(){
  user__response = !user__response
  if (user__response) {
    options.push(lizzard, spock)
    let element = createElement(lizzard)
    main.appendChild(element)

    element = createElement(spock)
    main.appendChild(element)

    rulesImg.setAttribute('src', rulesBonus)
    main.classList.add('bonus')
    searchButtons()
  }else{
    main.removeChild(main.lastElementChild)
    main.removeChild(main.lastElementChild)
    options.pop()
    options.pop()

    rulesImg.setAttribute('src', rulesNormal)
    main.classList.remove('bonus')
    searchButtons()
  }
}

function createElement(element, containerDiv, Containerimg ){
  let container = containerDiv || document.createElement('div')
  let img = Containerimg  || document.createElement('img')

  container.setAttribute('class', 'main__button')
  container.classList.add(element.name)
  container.dataset.type = element.name;

  img.setAttribute('class', 'main__button__option')
  img.setAttribute('src', `./images/icon-${element.name}.svg`)
  img.setAttribute('alt', element.name)
  
  if (!container.lastElementChild) {
    container.appendChild(img)
  }

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
  change.removeEventListener('click', changeGame)
}

function startGame(user_selection){
  let rand = Math.floor(Math.random() * (options.length - 1))  
  const house_selection = options[rand]

  createElement(house_selection, house, house.firstElementChild)
  createElement(user_selection[0], user, user.firstElementChild)

  results.classList.add('results--show')

  if (house_selection.name === user_selection[0].name) {
    tieGame()
  }else if(house_selection.name === user_selection[0].kill[0] || house_selection.name === user_selection[0].kill[1]){
    userWins()
  }else{
    userLoses()
  }
  scoreTag.innerHTML = score
  conclusion__title.parentElement.classList.add('conclusion--Active')
  setTimeout(() =>{
    house.parentElement.style.setProperty('transform', 'translate(0)')
    user.parentElement.style.setProperty('transform', 'translate(0)')
  }, 1000)
}

function tieGame(){
  conclusion__title.innerHTML = 'Tie Game' 
}

function userWins(){
  conclusion__title.innerHTML = 'You win'
  score++
}

function userLoses(){
  conclusion__title.innerHTML = 'You lose'
  score > 0 ? score-- : null
}