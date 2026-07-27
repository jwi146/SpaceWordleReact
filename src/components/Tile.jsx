//individual tile that represents a letter both on the board and keyboard
//will need to reprsent status

export default function Tile({letter ="", status ="empty"}){
    return(
        <div className={`tile tile-${status}`}>
            {letter.toUpperCase()}
        </div>
    )

}