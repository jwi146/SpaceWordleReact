import { useState } from 'react'
import { TARGETWORDS, VALIDGUESSES } from './data/words'
import { evaluateGuess } from './logic/evaluateGuess'
import './App.css'

function App(){
  //the states for the game
  const [target, setTarget] = useState(() => TARGETWORDS[Math.floor(Math.random()*TARGETWORDS.length)]);
  const [guesses, setGuesses] = useState([]); //array of {word, result}
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing");

  //function for guess submission
  function submitGuess(){
    //check if guesses are valid
    if (currentGuess.length !== 5){
      return console.log("Invalid guess length")
    }
    if(!VALIDGUESSES.has(currentGuess)){
      return console.log("Invalid guess")
    }

    //evalute the guess and save the results of it
    const result = evaluateGuess(currentGuess, target);
    let newGuesses = [...guesses, {word: currentGuess, result}];
    setGuesses(newGuesses);
    const submittedGuess = currentGuess;
    setCurrentGuesses(""); 

    //check if the current guess is the target
    if (submittedGuess === target){
      setGameStatus("won")
    }else if (newGuesses.length >=6){
      setGameStatus("lost")
    }

  }


  return(
    <div>
      {/*Board and keyboard stuff will go here*/}
      <p>Target: {target}</p>
      <p>Status: {gameStatus}</p>
    </div>
  )

}

export default App