import Tile from './Tile'
//create a row of 5 tile pieces for previous, current, and future guesses
export default function Row({word="", result = null, shake = false}){
    //build array of 5 tiles with their definitions
    let tiles =[]; 
    for(let i = 0; i<5; i++){
        //check if letter or status exists otherwise default it
        let letter = word[i] || "";
        let status = result?.[i] ?? "empty";
        
        tiles.push({letter, status})
    }
    return(
        //return a row of tiles
        <div className={`row ${shake ? "row-shake" : ""}`}>
            {tiles.map((tile, i) => <Tile letter ={tile.letter} status={tile.status} key={i}/>)}
        </div>
    )
}