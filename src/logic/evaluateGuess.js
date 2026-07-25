//evaluate whether a guess is correct, has correct letters or is completely wrong

export function evaluateGuess (guess, target){

   let result = new Array(5);
   let targetLetters = target.split("");

   //first pass over the guess word to get exact matches 
   for (let i = 0; i < 5; i++){
    if (guess[i] == targetLetters[i]){
        result[i] = "correct";
        targetLetters[i] = null; //this letter has been used, stops 2nd pass from using it
    }
   }

   //second pass to check for present/absent letters
   for (let i = 0; i<5; i++){
    if (result[i] == "correct"){
        continue;
    }
    let matchIndex = targetLetters.indexOf(guess[i])
    if(matchIndex !== -1){
        result[i] = "present";
        targetLetters[matchIndex] = null;
    }
    else{
        result[i] = "absent"
    }
   }

   return result

}

console.log(evaluateGuess("LUNAR", "ARRAY"))