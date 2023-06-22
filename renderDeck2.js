function Card(props){
    return (
        <button className={props.suit} onClick={()=>{props.onClick}}>
            {props.value}
        </button>
    );
}

class Expression extends React.Component {
    render(){
        return (
            <div>
                <div className="">{props.currentExpression}</div>
            </div>
        )
    }
}

class Field extends React.Component {
    renderCard(i) {
        return (
            <Card
                card ={this.props.cards[i].card}
                value={this.props.cards[i].value}
                suit={this.props.cards[i].suit}
                onClick={()=> this.props.onClick(i)} 
            />
        );
    }

    render(){
        return(
            <div>
                <div className=""></div>
                <div className="board-row">
                    {this.renderCard(0)}
                    {this.renderCard(1)}
                </div>
                <div className="board-row">
                    {this.renderCard(2)}
                    {this.renderCard(3)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history:[{
                cardHistory: Array(3).fill([]),
            }],
            currentExpression:[],
            playerScore:0,
            gameDeck:[],
            fieldDeck:[],
            graveDeck:[],
        };
    }

    handleClick(i) {
        console.log (i);
    }

    render() {
        return(
            <div className="game">
                <div className="gameBoard">
                    <Field 
                        cards={gameDeck}
                    />
                </div>
            </div>
        )
        console.log('test');

    }


}

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            suits:["spades", "diamonds", "hearts", "clubs"],
            values:["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",],
        }
    }

    newDeck(){

    }
}

// ===================================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

//====================================================



