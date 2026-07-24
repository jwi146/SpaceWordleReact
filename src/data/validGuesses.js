//create js array of the plaintext words
import rawWords from './valid-guesses.txt?raw';

export const DICTIONARY = rawWords
  .split('\n')
  .map(w => w.trim().toUpperCase())
  .filter(Boolean);