import Row from './Row'
//generate the game board with 6 rows of 5 tiles

export default function Board ({guesses, currentGuess}){

    let rows = [];


    //create an array of rows to make the board
    for(let i=0; i<6; i++){
        if(i<guesses.length){
            //this row is completed
            rows.push({word: guesses[i].word, result: guesses[i].result});
        }else if(i === guesses.length){
            //active guess
            rows.push({word: currentGuess, result: null});
        }else{
            //row not active yet(future)
            rows.push({word:"", result: null});
        }
    }
    return(
        <div className="board">
            {rows.map((row, i) => <Row word={row.word} result={row.result} key={i}/>)}
        </div>
    )


}