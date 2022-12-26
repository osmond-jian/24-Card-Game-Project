//The goal of this card game is to create a deck of cards.

//Lookup table for deck creation
const suits = ["spades", "diamonds", "hearts", "clubs"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//24 card game object
const gameObject = {
    gameDeck:[],

    fieldDeck:[],

    graveDeck:[],

    mathExpression:[],
//create deck function  Are these the only dictonary pairings we want for a card object?
    newDeck: function newDeck () {
    //turn Ace, Jack, Queen, King to numerical equivalent
        function letterToNumber (letter){
            if (letter === 'A' || letter === 'a'){
                return '1';
            }else if (letter ==='J' || letter ==='j'){
                return '11';
            }else if (letter === 'Q'|| letter ==='q'){
                return '12';
            }else if (letter ==='K'||letter ==='k'){
                return '13';
            }else{
                return letter;
            }
        }
    // loop to create the array of card objects
        let deck = new Array();
            for (let i = 0; i < suits.length; i++){
                for (let x = 0; x < values.length; x++){
                    let card ={name:`${values[x]+suits[i]}`, Value: values[x], Suit: suits[i], formula:`${letterToNumber(values[x])}`, type:'number', selected:false};
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
            card.setAttribute("id", `${deck[i].name}`);
        }
    },
//unrenders cards of deck from the DOM
    unrenderDeck: function unrenderDeck (){
        const deckElement = document.getElementById(`deck`)
        while (deckElement.firstChild){
            deckElement.removeChild(deckElement.firstChild);
        }
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

        gameObject.mathExpression = [];
        mathObject.unrenderExpression();
        gameObject.player1Score = 0;

        console.log ("Reset Game");
        console.log (gameObject.gameDeck); //remove after

    },
//moves all cards from field deck to "fieldDeckToThisDeck", and put 4 cards into field deck from "deckToFieldDeck"
    moveFourToField: function moveFourToField (fieldDeckToThisDeck, deckToFieldDeck){
        while (gameObject.fieldDeck.length > 0){
            if (fieldDeckToThisDeck === 'graveDeck'){
                gameObject.graveDeck.push(gameObject.dealCard(gameObject.fieldDeck));
            }else if (fieldDeckToThisDeck === 'gameDeck'){
                gameObject.gameDeck.push(gameObject.dealCard(gameObject.fieldDeck));
            }
        }
        gameObject.shuffleDeck(gameObject.gameDeck);

        for (i=0; i<= 3; i++){
            if (deckToFieldDeck === 'gameDeck'){
                gameObject.fieldDeck.push(gameObject.dealCard(gameObject.gameDeck));
            }
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
    currentExpression:[],
//player score
    player1Score:0,
    player2Score:0,
    player3Score:0,
    player4Score:0,
//declare methods/functions
    evaluate24: function evaluate24 (expression){
        let answer = expression.join('')
        if (eval(answer) == Number('24') ){
            return true;
        }else{
            return false;
        }
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
        console.log(`the ${card.Value} of ${card.Suit} card is selected`);
        card.selected = !card.selected
        if (card.selected === true){
            gameObject.mathExpression.push(card.formula);
            card.index = gameObject.mathExpression.length - 1
        }else{
            gameObject.mathExpression.splice(card.index, gameObject.mathExpression.length - card.index);
            gameObject.fieldDeck.forEach(fieldCard =>{
                if (fieldCard.index > card.index){
                    fieldCard.index = null;
                    fieldCard.selected = !fieldCard.selected;
                }
            })
            card.index = null;
        }
        mathObject.renderExpression(gameObject.mathExpression);
    },
//generic operator button
    calculate: function calculate (button){
        console.log (`the ${button.name} button has been clicked`);
        if (button.type == 'operator'){
            gameObject.mathExpression.push(button.formula);
        }else if (button.type =='key'){
            if (button.name == 'BackSpace'){
                gameObject.mathExpression.splice(gameObject.mathExpression.length - 1, 1);
                gameObject.fieldDeck.forEach(card =>{
                    if (gameObject.mathExpression.length <= card.index){
                        card.selected = false;
                        card.index = null;
                    }
                })
            }else if(button.name =='Forfeit'){
                gameObject.giveUpButton();
                gameObject.mathExpression = [];
                gameObject.fieldDeck.forEach(card =>{
                    card.selected = false;
                    card.index = null;
                })
                gameObject.moveFourToField('gameDeck', 'gameDeck');
            }else if(button.name =='Calculate'){
                let selectCheck = 0
                gameObject.fieldDeck.forEach(card =>{card.selected? selectCheck++ : null})
                if (selectCheck === 4){
                    if (mathObject.evaluate24(gameObject.mathExpression)){
                        console.log ('Good job!');
                        mathObject.player1Score += 1;
                    }else{
                        console.log ('wrong answer!');
                        mathObject.mathExpression = [];
                        gameObject.fieldDeck.forEach(card =>{
                            card.selected = false;
                            card.index = null;
                        })
                    }
                }else{
                    console.log('All cards must be selected');
                }
            }
        }
        mathObject.renderExpression(gameObject.mathExpression);
    },
//rendering expression onto display div
    renderExpression: function renderExpression(expressionArray){
        let displayExpression = expressionArray.join("").replace('*','x');
        document.querySelector('.displayMath').innerHTML = `${displayExpression}`;
    },
    unrenderExpression: function unrenderExpression(){
        document.querySelector('.displayMath').innerHTML ='';
    }
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
        symbol:"⌫",
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
    calcButton.innerHTML += `<a href='javascript:void(0)' class="button" id="${button.name}"> ${button.symbol}</a>`;
})

//create event listeners for the buttons
document.body.addEventListener("click", event => {
    const targetButton = event.target;
    if (targetButton.className.includes('card') || targetButton.parentElement.className.includes('card')){
        gameObject.fieldDeck.forEach(card =>{
            if (card.name == targetButton.id || card.name == targetButton.parentElement.id){
                mathObject.cardButton(card);
            }
        })
    }else{
        calculatorButtons.forEach(button => {
            if(button.name == targetButton.id){
                mathObject.calculate(button); //did not assign button yet
            }
        })
    }
})

document.body.addEventListener("click", event =>{
    console.log (event);
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

