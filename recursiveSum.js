rSum = (arr) => {
  if (arr.length === 0) {
    return 0;
  } else {
    return arr[0] + rSum(arr.slice(1));
    }
};
