quickSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    } else {
        let min = 0;
        let max = arr.length;
        let pivotPoint = Math.floor(Math.random() * (max - min)) + min;
        let pivot = arr[pivotPoint];
        let smaller = []; 
        let larger = [];
        for (let element of arr) {
            if (element <= pivot && arr.indexOf(element) !== pivotPoint) {
                smaller.push(element);
            } else if (element > pivot) {
                larger.push(element);
            }
        };
        return quickSort(smaller).concat([pivot]).concat(quickSort(larger));
    }
};
