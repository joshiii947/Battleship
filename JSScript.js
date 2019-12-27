let location1 = Math.floor(Math.random()*5);
let location2 = location1+1;
let location3 = location2+1;

let guess;
let hits = 0;
let guesses = 0;
let isSunk = false;
let view={
  displayMessage:function(msg){
    let messageArea=document.getElementById("messageArea");
    messageArea.innerHTML=msg;
  },
  displayHit:function(location){
    let cell=document.getElementById(location);
    cell.setAttribute("class","hit");
  },
  displayMiss:function(location){
    let cell=document.getElementById(location);
    cell.setAttribute("class","miss");
  }
};

while (isSunk == false) {
  guess = prompt("Ready aim ,fire from 0-6");
  if (guess < 0 || guess > 6) alert("please enter a valid number");
  else {
    guesses = guesses + 1;
    if (guess == location1 || guess == location2 || guess == location3) {
      alert("HIT");
      hits = hits + 1;

      if (hits == 3) {
        isSunk = true;
        alert("YOUT SANK MY BATTLESHIP");
      }
    } else {
      alert("MISS");
    }
  }
}

view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
view.displayMessage("Tap tap, is this thing on?");
var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
            { locations: ["24", "34", "44"], hits: ["", "", ""] },
            { locations: ["10", "11", "12"], hits: ["", "", ""] }],
    fire: function(guess) {
           for (var i = 0; i < this.numShips; i++) {
                let ship = this.ships[i];
                let locations=ship.locations;
                let index=locations.indexOf(guess);
                if(index>=0){
                  ship.hits[index]="hit";
                  view.displayHit(guess);
                  view.displayMessage("HIT!");
                  if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                       this.shipsSunk++;
                     }
                return true;
                    }
                }
                view.displayMiss(guess);
                view.displayMessage("You missed.");
              return false;
            },
   isSunk: function(ship) {
      for (var i = 0; i < this.shipLength; i++) {
         if (ship.hits[i] !== "hit") {
            return false;
                 }
            }
         return true;
        }
  };

  function parseGuess(guess){
    var alphabet=["A","B","C","D","E","F","G"];
    if(guess==null || guess.length!=2){
        alert("Please enter a letter and a number on the board");
    }
    else{
       firstChar=guess.charAt(0);
       let row = alphabet.indexOf(firstChar);
       let column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
              alert("Oops, that isn't on the board.");
     }
      else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
         alert("Oops, that's off the board!");
     } else {
         return row + column;
    }
    }
  return null;
  }

let controller={
  guesses=0,
  processGuess=function(guess){
    var location=parseGuess(guess);
     if(location){
       this.guesses++;
       let hit=model.fire(location);
       if(hit && model.shipsSunk==model.numShips){
         view.displayMessage("All the battleships are sank "+ this.guesses +" guesses");
       }
     }
  }
};

function init(){
  let firebutton=document.getElementById("firebutton");
  firebutton.onclick=handlefirebutton;
  let guessinput=document.getElementById("guessinput");
  guessinput.onkeypress=handleKeyPress;
}
function handleKeyPress(e) {
 var fireButton = document.getElementById("fireButton");
 if (e.keyCode === 13) {
 fireButton.click();
 return false;
 }
}

function handlefirebutton(){
  let guessinput=document.getElementById("guessinput");
  let guess=guessinput.value;
  controller.processGuess(guess);
  guessinput.value="";
}

window.onload=init;
