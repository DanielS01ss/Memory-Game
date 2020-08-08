let symbols = ["fa fa-bomb","fa fa-bomb","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-diamond","fa fa-diamond"
,"fa fa-anchor" ,"fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-bicycle","fa fa-bicycle",
"fa fa-leaf","fa fa-leaf"];
const startBtn = document.querySelector(".start-btn");
const mainContainer = document.querySelector("#container");
const introDialog = document.querySelector(".start-dialog");
const listItems = document.querySelectorAll('.card');
let showedCards = [];
let moves = 0;
const movesContainer = document.querySelector("#moves");
let matches = 0;
const gameOverPannel = document.querySelector(".game-over");
let stars = 3;
let endMessage = "You have an astonishing memory!";
let seconds = 0;
let minutes = 0;
const time = document.querySelector("#time");
const restartGame = document.querySelector('.restart');
const playAgainBtn = document.querySelector('.play-again-btn');

//event listener additions
startBtn.addEventListener('click',startGame);
restartGame.addEventListener('click',insideGameRestart);
playAgainBtn.addEventListener('click',playAgain);

function timeHandler()
{
  seconds++;
  if(seconds == 60)
  {
    minutes++;
  }
  time.innerHTML = minutes+"m "+seconds+"s ";

}

function startGame()
{
    ///1 pornire conometru
    ///shuffle lista
    /// asignare elemente
    ///refacere miscari
    ///symbols = shuffle(symbols);
    ///pornim si timerul
    setInterval(timeHandler,1000);
    introDialog.classList.add("not-displayed");
    mainContainer.classList.remove("not-displayed");
    initialize();
}


///ii dam mare shuffle la lista inainte de a face orice (ps e luata de pe stackoverflow)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function starsManager()
{
  const ratings = document.querySelector('.ratings');
  if(moves === 30)
  {
    stars--;
    endMessage = "You have a pretty good memory!";
    ratings.firstChild.remove();

  }
  else if(moves===35)
  {
    stars--;
    endMessage = "Nice memory!";
    ratings.firstChild.remove();
  }
  else if(moves==50)
  {
    stars--;
    endMessage = "I think you can do it better";
    ratings.firstChild.remove();
  }
}

function endGame(){
  
  mainContainer.classList.add("not-displayed");
  gameOverPannel.classList.remove("not-displayed");
 //afisare miscari
  const movesContainer = document.querySelector("#moves-count");
  movesContainer.textContent = moves;
  const scoreContainer = document.querySelector(".score-count");
  const ratings = document.querySelector('.ratings');
  scoreContainer.textContent = ratings.textContent;
  const endGameText = document.querySelector(".end-game-text");
  const timeContainer = document.querySelector(".time-elapsed ");
  console.log(time.innerHTML);
  timeContainer.textContent = time.innerHTML;
  endGameText.textContent = endMessage;
}

function clickEvent()
{
 
  const thisElement = this;
  const thisCard = this;
  this.classList.add("show");
  this.removeEventListener('click',clickEvent);
  this.firstElementChild.classList.toggle("display-none");
  showedCards.push(this);
  ///la win animation plus win
 
  if(showedCards.length===2)
  {
    moves++;
    movesContainer.textContent = moves;

    if(showedCards[0].firstElementChild.firstElementChild.classList[1] === showedCards[1].firstElementChild.firstElementChild.classList[1])
    {
      matches++;
      let someCards = showedCards.map((elem)=>{
        return elem;
      });

      thisCard.removeEventListener("click",clickEvent);
      showedCards[0].removeEventListener("click",clickEvent);
       setTimeout(function(){
         
       someCards[0].classList.remove("show");
       someCards[0].classList.add("win");
       someCards[0].classList.add("animation");
  
        someCards[1].classList.remove("show");
        someCards[1].classList.add("win");
        someCards[1].classList.add("animation");
      
        
      },100);
      showedCards[1].removeEventListener('click',clickEvent);
      showedCards[0].removeEventListener('click',clickEvent);
      showedCards.length = 0;
        

    }
    else{

     let someCards = showedCards.map((elem)=>{
       return elem;
     });
     showedCards[0].classList.remove("show");
     showedCards[0].classList.add("wrong");
     showedCards[1].classList.remove("show");
     showedCards[1].classList.add("wrong");
    
      setTimeout(()=>{
       someCards[0].classList.remove("wrong");
       someCards[1].classList.remove("wrong");
       someCards[0].firstElementChild.classList.toggle("display-none");
       someCards[1].firstElementChild.classList.toggle("display-none");
       someCards.length = 0;

        
      },300); 
      showedCards[0].addEventListener('click',clickEvent);
        showedCards[1].addEventListener('click',clickEvent);
        showedCards.length = 0;
    }

    if(matches == 8)
    {
    setTimeout(endGame,2000);
     
    }
 
    
  } 
  ///functiile astea vin executate indiferent de rezultat
  starsManager();
}



function initialize()
{
    symbols = shuffle(symbols);

    for(let i=0;i<16;i++)
    {
        let element = document.createElement("i");
        element.setAttribute("class",symbols[i]);
        listItems[i].firstElementChild.appendChild(element);
        listItems[i].addEventListener('click',clickEvent);     
    }

   
   

}

///implementam functia de restart game pe restart din game
function insideGameRestart()
{
  ///repunem timpul la 0
  seconds = 0;
  minutes = 0;
  timeHandler();
  ///luam fiecare element
  for(const item of listItems)
  {

    if(item.classList.contains("show")){
      item.classList.remove("show");
      item.firstElementChild.classList.add('display-none');
    }
    if(item.classList.contains("win")){
      item.classList.remove("win");
      item.classList.remove("animation");
      item.firstElementChild.classList.add('display-none');
    }
    if(item.classList.contains("wrong")){
      item.classList.remove("wrong");
      if(!item.classList.contains("display-none")){
        item.firstElementChild.classList.add('display-none');
      }
      
    }
    item.firstElementChild.firstElementChild.remove()
    item.removeEventListener('click',clickEvent);
  }
  showedCards = [];

  matches = 0;
  moves = 0;
  movesContainer.textContent = moves;
  initialize();

}


function playAgain()
{
  gameOverPannel.classList.add("not-displayed");
  mainContainer.classList.remove("not-displayed");
  insideGameRestart();
}

