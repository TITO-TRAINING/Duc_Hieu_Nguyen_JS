//Looping a Triangle 
console.log("---Looping a Triangle---")
var str = "#"
for (let f = 1; f<=7; f++) {
    console.log(str)
    str += '#';
}

//FizzBuzz
// console.log("---FizzBuzz---")

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
 
