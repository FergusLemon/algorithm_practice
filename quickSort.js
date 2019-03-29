quickSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    } else {
        let pivot = arr[0];
        let slicedArray = arr.slice(1);
        let smallerElements = slicedArray.filter((element) => {
            return element <= pivot;
        });
        let largerElements = slicedArray.filter((element) => {
            return element > pivot;
        });
        return quickSort(smallerElements).concat([pivot]).concat(quickSort(largerElements));
    }
};
