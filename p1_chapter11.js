"use strict";

async function locateScalpel(nest) {
  let current = nest.name;
  for (;;) {
    let next = await anyStorage(nest, current, "scalpel");
    if (next == current)
      return current;
    current = next;
  }
}

function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, "scalpel").then(next => {
      if (next == current) 
        return current;
      else
        return loop(next);
    });
  }
  return loop(nest.name);
}

locateScalpel(bigOak).then(console.log);
// → Butcher Shop

locateScalpel2(bigOak).then(console.log);
// → Butcher Shop



// 

async function fetchData() {
    const response = await fetch('https://example.com/api/data');
    const data = await response.json();
    return data;
}
      
async function doSomething() {
    const data = await fetchData();
    console.log(data);
  }
  