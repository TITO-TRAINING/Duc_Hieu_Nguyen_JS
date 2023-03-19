//flatten
const flatten = arrays => {
    return arrays.reduce((flatArray, currentArray) => {
         return flatArray.concat(currentArray);
    }, []);
};

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]


//Your our loop
function loop(value, test, update, body) { 
    
    for (let n = value; test(n); n = update(n)) {
        body(n);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);

//Everything

function every(array, test) {
    for (let element of array) {
        if (!test(element)) {
            return false;
        }
    }

    return true;
}

function every2(array, test) {
    return !array.some(element => !test(element));
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));

