//created the on screen qwerty keyboard for the game

//first get the status of each guess and remember the best one 
function getKeyboardStatus(guesses){
    let statusMap = {};
    const priority = {correct : 3, present : 2, absent : 1 };

    //for each letter in each guess, check its status and save its best
    guesses.forEach((guess) => {
        for(let i=0; i<5; i++){
            let letter = guess.word[i];
            let newStatus = guess.result[i];

            let existing = statusMap[letter];
            if (existing === undefined || priority[newStatus]>priority[existing]){
                statusMap[letter] = newStatus;
            }
        }
    })

    return statusMap;

}

const KEYBOARDROWS =[
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Enter","Z","X","C","V","B","N","M","Backspace"]

];

//create the keyboard on the screen
export default function Keyboard({guesses, onKeyPress}){
    const statusMap = getKeyboardStatus(guesses);

    return(
        <div className="keyboard">
            {KEYBOARDROWS.map((row, i)=> (
                <div className="keyboard-row" key={i}>
                    {row.map(key => (
                        <button key ={key} className={`key key-${statusMap[key] || "empty"}`} 
                        onClick={() => onKeyPress(key)}>
                            {key === "Backspace" ? "⌫" : key}
                        </button>
                    ))}
                </div>  
            ))}
        </div>
    )
}
