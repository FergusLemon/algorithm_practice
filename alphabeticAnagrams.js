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
  const reference = word.split('').sort();
  if (reference === word.split('')) { return 1; };
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
  if (reference.join('') === word.split('').reverse().join('')) { return max; };

  const updateCountObj = (obj, char) => {
    obj[char] && obj[char] > 1 ? obj[char] -= 1 : delete obj[char];
  };

  for (let i = 0; i < n-1; i++) {
    let char = characterArr[i];
    let leftHandside = reference.indexOf(char);
    let rightHandside = (reference.length -1) - (reference.lastIndexOf(char));
    let total = leftHandside + rightHandside;
    let minIncreaseProportion = leftHandside / total;
    let maxReductionProportion = rightHandside / total;
    let currentDifference = max - min;
    reference.splice(leftHandside, 1);
    updateCountObj(characterCountObj, char);
    let remainingPermutations = (factorial(reference.length) /
      calculateDenominator(characterCountObj)) - 1;
    let toDistribute = currentDifference - remainingPermutations;
    min += Math.ceil(toDistribute * minIncreaseProportion);
    max -= Math.ceil(toDistribute * maxReductionProportion);
  };
  return min;
}
