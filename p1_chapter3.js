function multiple( factory) {
    return number => number*factory
}

let twice = multiple(2)
console.log(twice(3))
// => Closure example : 6

console.log("---------------")
function recursion( n ){
    if (n == 0) {
        return 1;
    }
    else {
        return recursion(n-1)*n
    }
}

console.log(recursion(0))

//Minimum
const min = (a, b) => a > b ? b : a ;

console.log(min(5,3))

//Recursion
function isEven(x) {
    if (x < 0 ) {
          return false
    }
     else if (x % 2 == 0) {
          return true
    } else {
          return isEven(x-2)
    }
  }
console.log(isEven(-2))

//Bean Counting

function countBs( text ) {
    var total = 0;
    for (let i=0; i<= text.length; i++) {
        if (text[i]=== "B") {
            ++total
        }
    }
    return total
}

function countChar(text, c) {
    var count = 0; 
    for (var i = 0; i < s.length; i += 1) {
      if (text.charAt(i) === c)
        count += 1;
    }
    return count;
  }
console.log(countBs("BeanBBB"))