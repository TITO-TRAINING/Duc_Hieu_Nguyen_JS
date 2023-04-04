// Array

topScope.array = (...values) => values;

topScope.length = array => array.length;

topScope.element = (array, n) => array[n];

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);

function run(program) {
  // Parse the program into an AST (abstract syntax tree)
  let ast = parse(program);
  
  // Evaluate each expression in the AST
  for (let exp of ast) {
    evaluate(exp, globalScope);
  }
}

// Comment
// This is the old skipSpace. Modify it...
function skipSpace(string) {
    let skip = string.match(/^(\s|#.*)*/);
    return string.slice(skip[0].length);
}


console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}


//fixing scope

specialForms.set = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
          throw new SyntaxError("Incorrect use of set");
      }
  
      const name = args[0].name;
      const value = evaluate(args[1], scope);
    
      while (scope) {
          if (Object.hasOwnProperty.call(scope, name)) {
              scope[name] = value;
              return value;
          }
  
          scope = Object.getPrototypeOf(scope);
      }
  
      throw new ReferenceError(`Referencing an undefined binding: ${name}`);
  };
  
  run(`
  do(define(x, 4),
     define(setx, fun(val, set(x, val))),
     setx(50),
     print(x))
  `);
  // → 50
  run(`set(quux, true)`);
  // → Some kind of ReferenceError