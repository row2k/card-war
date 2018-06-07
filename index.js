let prompt = require('prompt-sync')();
// Ask the players their names
let player1Name = prompt('Player 1, what is your name?');
let player2Name = prompt('Player 2, what is your name?');

// // Test with static
// let player1Name = 'Parzival';
// let player2Name = 'Art3mis';
// Play
//
console.log(`OK ${player1Name} and ${player2Name}, get ready to go to WAR!`);

// Create a deck of cards
//ordered arrays of values
const suits = ['hearts', 'clubs', 'spades', 'diamonds'];
const ranks = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
const scores = [14,2,3,4,5,6,7,8,9,10,11,12,13]
function DeckConstructor() {
  let deck = {};
  let cards = [];
  for(i = 0; i<suits.length; i++) {
    for(j = 0; j<ranks.length; j++) {
      let eachCard = {};
      eachCard.suit = suits[i];
      eachCard.rank = ranks[j];
      eachCard.title = `${ranks[j]} of ${suits[i]}`;
      eachCard.score = scores[j];
      cards.push(eachCard);
    }
  }
  deck.cards = cards;
  return deck
}
//initiate deck
let deck = DeckConstructor();
// Shuffle the deck of cards (might not need this if picking cards is random when drawing)

// Fisher-Yates Shuffle Unbiased Randomization https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random()*m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
shuffle(deck.cards); // This will shuffle in-place

// Create player and deal shuffled decks
function Player(username){
  let player ={};
  let hand =[];
  player.username = username;
  return player
}
// Create Players
let player1 = Player(player1Name);
let player2 = Player(player2Name);

function deal(){
  player1.hand = deck.cards.slice(0,26);
  player2.hand = deck.cards.slice(26,52)
}
deal();
// console.log(player1.hand[0]); //checkpoint
// console.log(player2.hand[0]);

// Be able to play a single round of comparing two cards, WITHOUT the weird War scenario (just skip it for now)
let table = []; //setup table
let m=1; // round counter
let n=1; // loop breaker
while(n<1000000) {
  console.log(`##################### This is Round ${m}.`)
  m++;
  if(player1.hand.length===0 ||  player2.hand.length === 0) {
    console.log(`Game Over! ${table.length} cards left on the table.`);
    n=2222222; // redundant break loop
    if(player1.hand.length > player2.hand.length){ //declare winner
      console.log(`${player1.username} won the War!`);
    } else {
      console.log(`${player2.username} won the War!`);
    }
  } else {
    table.push(...player1.hand.splice(0,1)); // throw the first card onto the table
    table.push(...player2.hand.splice(0,1));
    console.log(`${player1.username} draws ${table[table.length-2].title}`); //second to the last card
    console.log(`${player2.username} draws ${table[table.length-1].title}`); //last card drawn, handing Equal
    if (table[table.length-2].score>table[table.length-1].score) {
      console.log(`${player1.username} wins!`);
      player1.hand.push(...table); //concat also works
      table=[];
    } else if (table[table.length-2].score < table[table.length-1].score) {
      console.log(`${player2.username} wins!`);
      player2.hand.push(...table);
      table=[];
    } else { /*TRY A RECURSIVE FUNCTION FOR THIS PART ref=sean_lab_solution*/
      console.log('War! Fold one and draw another!');
      /*This code block is repeated*/if(player1.hand.length === 0 || player2.hand.length === 0) {
        if (table[table.length-2].score>table[table.length-1].score) {
          console.log(`${player1.username} wins!`);
          player1.hand.push(...table); //concat array also works
          table=[]; //clear table
        } else if (table[table.length-2].score<table[table.length-1].score) {
          console.log(`${player2.username} wins!`);
          player2.hand.push(...table);
          table=[]; //clear table
        }
      } else {
        table.push(...player1.hand.splice(0,1));
        table.push(...player2.hand.splice(0,1));
      }
    }
    n++;
  }
  console.log(`${player1.username} has ${player1.hand.length} cards.`);
  console.log(`${player2.username} has ${player2.hand.length} cards.`);
}



// Play
//
// console.log(`OK ${player1Name} and ${player2Name}, get ready to go to WAR!`);
