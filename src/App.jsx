import { useState, useEffect } from 'react'
import { TARGETWORDS, VALIDGUESSES } from './data/words'
import { evaluateGuess } from './logic/evaluateGuess'
import './App.css'
import Board from './components/Board'
import Keyboard from './components/Keyboard'

//helper function to load intial state
function getInitialGameState(){
  const saved = localStorage.getItem("spaceWordleGame");
  if (saved != null){
    return JSON.parse(saved);
  }else{
    const newTarget = TARGETWORDS[Math.floor(Math.random() * TARGETWORDS.length)];
    return {target: newTarget, guesses: [], gameStatus: "playing"};
  }
}

function App(){
  //the states for the game
  const initialState = getInitialGameState()
  const [target, setTarget] = useState(initialState.target)
  const [guesses, setGuesses] = useState(initialState.guesses)
  const [gameStatus, setGameStatus] = useState(initialState.gameStatus)
  const [currentGuess, setCurrentGuess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //function for guess submission
  function submitGuess(){
    //check if guesses are valid
    if (currentGuess.length !== 5){
      setErrorMessage("Not enough letters")
      return console.log("Invalid guess length");
    }
    if(!VALIDGUESSES.has(currentGuess)){
      setErrorMessage("Word not recognised")
      return console.log("Invalid guess");
    }

    //set error message to clear if valid
    setErrorMessage("");

    //evalute the guess and save the results of it
    const result = evaluateGuess(currentGuess, target);
    let newGuesses = [...guesses, {word: currentGuess, result}];
    setGuesses(newGuesses);
    const submittedGuess = currentGuess;
    setCurrentGuess(""); 

    //check if the current guess is the target
    if (submittedGuess === target){
      setGameStatus("won");
    }else if (newGuesses.length >=6){
      setGameStatus("lost");
    }

  }

  //funtion for handling input from the physical keyboard (on screen will also call this)
  function handleKeyInput(key){
    if (gameStatus != "playing"){
      return; //ignore input since game is over
    }

    if(key === "Enter"){
      submitGuess();
      console.log("Guess entered")
    }
    else if(key === "Backspace"){
      setCurrentGuess(prev => prev.slice(0, -1));
    }
    else if(/^[a-zA-Z]$/.test(key) && currentGuess.length < 5){
      setCurrentGuess(prev => prev + key.toUpperCase())
    }
  }

  //use effect to listen for keyboard activity 
  useEffect (()=>{
    function onKeyDown(event){
      handleKeyInput(event.key);
    }
    window.addEventListener('keydown', onKeyDown);
    return ()=> window.removeEventListener('keydown', onKeyDown)
  }, [currentGuess, gameStatus])

  //use effect to save to storage when something changes
  useEffect(() => {
    const gameState = { target, guesses, gameStatus }
    localStorage.setItem("spaceWordleGame", JSON.stringify(gameState))
  }, [target, guesses, gameStatus])

  //clear error message after a few seconds
  useEffect(() => {
    if (errorMessage) {
        const timer = setTimeout(() => setErrorMessage(""), 1500)
        return () => clearTimeout(timer)   // cleanup if it changes again before timeout fires
    }
  }, [errorMessage])

  //fucntion to restart the game
  function restartGame(){
    localStorage.removeItem("spaceWordleGame");
    const newTarget = TARGETWORDS[Math.floor(Math.random()*TARGETWORDS.length)]
    setTarget(newTarget);
    setGuesses([]);
    setGameStatus("playing");
  }

  return(
    <div className="app">
      {/*Board and keyboard with replay button*/}
      <h1 className="title">SPACE WORDLE</h1>
      <p className="subtitle">Guess the space-themed word in 6 tries</p>
      {gameStatus === "won" && (
        <p className="game-message won">🚀 You got it in {guesses.length}/6 guesses! The word was {target}</p>
      )}
      {gameStatus === "lost" && (
        <p className="game-message lost">You lost! The word was {target}</p>
      )}
      <p className="error-message">{errorMessage}</p>
      <Board guesses={guesses} currentGuess={currentGuess} hasError={!!errorMessage} />
      <Keyboard guesses={guesses} onKeyPress={handleKeyInput} />
      {gameStatus !== "playing" && (
        <button className="restart-button" onClick={restartGame}>Play Again</button>
      )}
    </div>
  )

}

export default App