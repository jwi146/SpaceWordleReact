//import dictionary words
import { DICTIONARY } from './validGuesses.js';

//the target words for the wordle
export const TARGETWORDS =[
    "LUNAR",  "SOLAR",  "COMET",  "ORBIT",  "STARS",  "SPACE",  "MOONS",  "ALIEN",
    "LIGHT",  "GIANT",  "DWARF",  "FLARE",  "CRUST",  "PHASE",  "ROBOT",  "LASER",
    "PROBE",  "BURST",  "WHITE",  "BLACK",  "HOLES",  "RINGS",  "BELTS",  "CRAFT",
    "CREWS",  "ROCKY",  "VENUS",  "TITAN",  "CERES",  "VESTA",  "EARTH", "PLUTO",  
    "ATLAS",  "ROVER",  "NADIR",  "GLOBE",  "BLAST",  "STAGE",  "NIGHT",  "SKIES"
];

//guesses which can either be targets or valid words
export const VALID_GUESSES = new Set([
  ...DICTIONARY,
  ...TARGETWORDS
]);