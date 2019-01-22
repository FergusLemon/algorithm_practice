/*jshint esversion: 6 */
'use strict';

function findSmallest (arr) {
  let smallest = arr[0];
  let smallestIndex = 0;
  let len = arr.length;

  for(let i = 1; i < len; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
      smallestIndex = i;
    }
  }
    return smallestIndex;
}

function selectionSort (arr) {
  let newArr = [];
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let smallest = findSmallest(arr);
    newArr.push(arr.splice(smallest, 1));
  }
  return newArr.flat();
}
