import Row from './Row'
//generate the game board with 6 rows of 5 tiles

export default function Board ({guesses, currentGuess, hasError}){

    let rows = [];


    //create an array of rows to make the board
    for(let i=0; i<6; i++){
        if(i<guesses.length){
            //this row is completed
            rows.push({word: guesses[i].word, result: guesses[i].result, shake: false });
        }else if(i === guesses.length){
            //active guess
            rows.push({word: currentGuess, result: null, shake: hasError });
        }else{
            //row not active yet(future)
            rows.push({word:"", result: null, shake: false});
        }
    }
    return(
        <div className="board">
            {rows.map((row, i) => <Row word={row.word} result={row.result} shake={row.shake} key={i}/>)}
        </div>
    )


}