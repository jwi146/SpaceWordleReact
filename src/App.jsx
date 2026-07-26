import { useState, useEffect } from 'react'
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
      return console.log("Invalid guess length");
    }
    if(!VALIDGUESSES.has(currentGuess)){
      return console.log("Invalid guess");
    }

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
    
  

  return(
    <div>
      {/*Board and keyboard stuff will go here*/}
      <p>Target: {target}</p>
      <p>Status: {gameStatus}</p>
      <p>Current guess: {currentGuess}</p>
    </div>
  )

}

export default App