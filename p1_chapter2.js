//Looping a Triangle 
console.log("---Looping a Triangle---")
var str = "#"
for (let f = 1; f<=7; f++) {
    console.log(str)
    str += '#';
}

//FizzBuzz
console.log("---FizzBuzz---")

for(var i = 1; i<=100; i++) {
    if(i % 3 == 0 && i % 5 == 0) {
        console.log("FizzBug;")
    }
    if (i % 3 == 0) {
        console.log("Fizz;")
    }
    else if (i % 5 ==0){
        console.log("Buzz;")
    }
    else console.log(i)
}
 
//ChessBoard
console.log("---Chess Board---")

var n = 8;
var j = 1;
var result = ''
let evenChar = "#"
let oddChar = " "
while(j <= n*n ) {
    if (j % 2 == 0) {
        result += oddChar
    }
    else result += evenChar

    if (j % n == 0) {
        result += "\n"

        if (evenChar == "#") {
            evenChar = " "
            oddChar = "#"
        }
        else {
            evenChar = "#"
            oddChar = " "
        }
    }   
    j++
}

console.log(result)
