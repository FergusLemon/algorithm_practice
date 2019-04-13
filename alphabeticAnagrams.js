// My solution for Alphabetic Anagrams Kata on Codewars, avaialble at
// https://www.codewars.com/kata/53e57dada0cb0400ba000688
function listPosition(word) {
  const n = word.length;
  if (n < 2) { return n };
  const factorial = num => {
    if (num < 2) { return num}
    else {
      return num * (factorial(num -1));
    }
  };

  let characterCountObj = {};
  const characterArr = word.split('');
  const sorted = word.split('').sort();
  if (sorted === word.split('')) { return 1; };
  for (let char of characterArr) {
    if (characterCountObj[char]) {
      characterCountObj[char] += 1;
    } else {
      characterCountObj[char] = 1;
    }
  }

  const calculateDenominator = (obj) => {
    let denominator = 1;
    if (Object.keys(obj).size === 0) { return denominator; }
    for (let key in obj) {
      denominator *= factorial(obj[key]);
    }
    return denominator;
  }
  let max = Math.ceil(factorial(n) / calculateDenominator(characterCountObj));
  let min = 1;
  if (sorted.join('') === word.split('').reverse().join('')) { return max; };

  const updateCountObj = (obj, char) => {
    obj[char] && obj[char] > 1 ? obj[char] -= 1 : delete obj[char];
  };

  for (let i = 0; i < n-1; i++) {
    let char = characterArr[i];
    let lhs = sorted.indexOf(char);
    let rhs = (sorted.length -1) - (sorted.lastIndexOf(char));
    let total = lhs + rhs;
    let minIncreaseProportion = lhs / total;
    let maxReductionProportion = rhs / total;
    let currentDifference = max - min;
    sorted.splice(lhs, 1);
    updateCountObj(characterCountObj, char);
    let remainingPerms = (factorial(sorted.length) / calculateDenominator(characterCountObj)) - 1;
    let toDishOut = currentDifference - remainingPerms;
    min += Math.ceil(toDishOut * minIncreaseProportion);
    max -= Math.ceil(toDishOut * maxReductionProportion);
  };
  return min;
}
