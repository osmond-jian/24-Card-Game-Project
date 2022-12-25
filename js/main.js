//The goal of this card game is to create a deck of cards.

//Lookup table for deck creation
const suits = ["spades", "diamonds", "hearts", "clubs"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//24 card game object
const gameObject = {
    gameDeck:[],

    fieldDeck:[],

    graveDeck:[],
//create deck function  Are these the only dictonary pairings we want for a card object?
    newDeck: function newDeck () {
        let deck = new Array();
            for (let i = 0; i < suits.length; i++){
                for (let x = 0; x < values.length; x++){
                    let card ={Value: values[x], Suit: suits[i], formula:`${values[x]}`, type:'number'};
                    deck.push(card);
                }
            }
        return deck;
    },
//shuffle deck function    
    shuffleDeck:function shuffle(deck){
        for (let i = 0; i < 1000; i++){
            let cardSwitch1 = Math.floor((Math.random() * deck.length));
            let cardSwitch2 = Math.floor((Math.random() * deck.length));
            let switch3 = deck[cardSwitch1];
    
            deck[cardSwitch1] = deck[cardSwitch2];
            deck[cardSwitch2] = switch3;
    
        }
    },
//renders cards in deck onto DOM
    renderDeck: function renderDeck (deck){
        gameObject.unrenderDeck();
        
        for (let i = 0; i < deck.length; i++){
            let card  = document.createElement("div");
            let value = document.createElement("div");
            let suit = document.createElement("div");
            card.className = "card";
            value.className = "value";
            suit.className = "suit " + deck[i].Suit;
    
            value.innerHTML = deck[i].Value;
            card.appendChild(value);
            card.appendChild(suit);
    
            document.getElementById("deck").appendChild(card);
        }
    },
//unrenders cards of deck from the DOM
    unrenderDeck: function unrenderDeck (){
        document.getElementById("deck").innerHTML = "";
    },    
//deals a card from the top of the deck
    dealCard: function dealCard (deck){
        return deck.pop();
    },
//new game
    newGame: function newGame(){
        gameObject.gameDeck = gameObject.newDeck();
        gameObject.fieldDeck = [];
        gameObject.graveDeck = [];
        
        console.log ("Reset Game");
        console.log (gameObject.gameDeck); //remove after

    },
//move 4 cards to field deck
    moveFourToField: function moveFourToField (){
        while (gameObject.fieldDeck.length > 0){
            gameObject.graveDeck.push(gameObject.dealCard(gameObject.fieldDeck));
        }
        
        for (i=0; i<= 3; i++){
            gameObject.fieldDeck.push(gameObject.dealCard(gameObject.gameDeck));
        }

        gameObject.renderDeck(gameObject.fieldDeck);
    },
//forfeit round
    giveUpButton: function giveUpButton(){
        console.log ('round forfeitted');
    },

}

// group new object for math and associated things

const mathObject = {
//declare variables/properties
//current expression will be used to keep track of the math expression being built to make '24'
    currentExpression:'',
//player score
    player1Score:0,
    player2Score:0,
    player3Score:0,
    player4Score:0,
//declare methods/functions
    evaluate24: function evaluate24 (expression){
        if (Number(expression) == Number('24') ){
            return true;
        }else{
            return false;
        }
    },
//add button
    addButton: function addButton (){
        console.log('the add button is clicked');
    },
//subtract button
    subtractButton: function subtractButton(){
        console.log('the subtract button is clicked');
    },
//multiply button
    multiplyButton: function multiplyButton(){
        console.log('the multiply button is clicked');
    },
//divide button
    divideButton: function divideButton(){
        console.log('the divide button is clicked');
    },
//parenthesis button
    bracketsButton: function bracketsButton(){
        console.log('the brackets button is clicked');
    },
//exponents button
    exponentButton: function exponentButton(){
        console.log('the exponents button is clicked');
    },
//factorial button *secret*
    factorialButton: function factorialButton(){
        console.log('the factorial button is clicked');
    },
//modulus button *secret*
    modulusButton: function modulusButton(){
        console.log('the modulus button is clicked');
    },
//backspace button
    backSpaceButton: function backSpaceButton(){
        console.log('the backspace button is clicked');
    },
//enter button
    enterButton: function enterButton(){
        console.log('the enter button is clicked');
        if (evaluate24(mathObject.currentExpression) && gameObject.allCardsUsed){
            mathObject.player1Score++;
        }else if (evaluate24(mathObject.currentExpression) && !gameObject.allCardsUsed){
            console.log ('you must use all 4 cards');
        }else{
            console.log ('the expression does not equal 24');
        }
    },
//generic card button
    cardButton: function cardButton(card){
        console.log(`the ${card} card button is clicked`);
    },


}

//calculator button objects
const calculatorButtons = [
    {
        name:"left bracket",
        symbol:"(",
        formula:"(",
        type:"operator",
    },

    {
        name:"right bracket",
        symbol:")",
        formula:")",
        type:"operator",
    },

    {
        name:"exponent",
        symbol:"^",
        formula:"Math.pow()",
        type:"operator",
    },

    {
        name:"add",
        symbol:"+",
        formula:"+",
        type:"operator",
    },

    {
        name:"subtract",
        symbol:"-",
        formula:"-",
        type:"operator",
    },

    {
        name:"multiply",
        symbol:"x",
        formula:"*",
        type:"operator",
    },

    {
        name:"divide",
        symbol:"/",
        formula:"/",
        type:"operator",
    },

    {
        name:"Calculate",
        symbol:"=",
        formula:"=",
        type:"key",
    },

    {
        name:"BackSpace",
        symbol:"<-",
        formula:"false",
        type:"key",
    },

    {
        name:"Forfeit",
        symbol:"Forfeit",
        formula:"false",
        type:"key",
    }, 

    {
        name:"modulus",
        symbol:"%",
        formula:"%",
        type:"operator",
    },

    {
        name:"factorial",
        symbol:"!",
        formula:"none",
        type:"operator",
    }
    
]

//create buttons
calculatorButtons.forEach(button => {
    const calcButton = document.querySelector(".calcButton");
    calcButton.innerHTML += `<a href='javascript:void(0)' class = "button" onclick="mathObject.${button.name}Button()"> ${button.symbol}</a>`;
})




gameObject.newGame();
gameObject.renderDeck(gameObject.gameDeck);




//3 "decks" - main deck, field 'deck', graveyard/points 'deck'
// game start needs to pop 4 cards from main to field, render field
// have some UI to interact/do math with the field, but after a "round", place those 4 cards into the graveyard 'deck'. OPTIONAL: let players who got the point hold onto the cards like the actual card game
// add a point tracking system
//give up a round -> shuffle back into main deck and pop out 4 new cards


//hard part - back end stuff
// interact with server to see who 'wins' the point
// being able to save the game state somehow and send that information to backend
// vote to give up a round -> shuffle back into main deck 

