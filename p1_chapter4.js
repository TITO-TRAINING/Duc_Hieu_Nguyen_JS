//Sum of a Range
const range = (start, end, step = 1) => {
    let result = []
    if (step < 0) {
        for (let i = start; i>= end; i += step) {
            result.push(i)
        }
    }
    for (let i = start; i<= end; i += step) {
        result.push(i)
    }
    return result
}

const sum = (list) => {
    let sum = 0;
    for (item of list) {
        sum += item
    }

    return sum
}

console.log(range(5,2,-1))
// Revers function

const reversInPlace = (array) => {

    for (let i = 0; i < array.length / 2; i++) {
        let temp = array[i]
        array[i] = array[array.length - 1 -i]
        array[array.length - 1 -i] = temp
    }
    return array
}
console.log(reversInPlace([1,2,3,4,5]))

//A list

const arrayToList = (array) => {
    if (!array.length) {
        return {};
    }

    let list = {
        value: array[0]
    };


    if (array.length === 1) {
        list.rest = null;
        return list;
    }

    list.rest = arrayToList(array.slice(1));

    return list;
}
