// Array
const sumOdd = (...numbers) => {
    let result = 0
    for (let number of numbers) {
        if( number%2 !== 0) result += number
    }

    return result
}
//With rest parameter u can pass unlimited parameter
console.log(sumOdd(1,2,3,4,6,7,8))

// spread
var a = [2,3,5]
let [x,y] = [2,3,5]
console.log(y)