"use strict";

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    "use strict";  // Enable `strict mode` inside the function body 
    while (true) {
        try {
            return primitiveMultiply(a, b);
        } catch (exception) {
            if (!(exception instanceof MultiplicatorUnitFailure))
                throw exception;
        }
    }
}

console.log(reliableMultiply(8, 8));
// → 64

// The locked boxx
"use strict";

const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    const boxWasInitiallyLocked = box.locked;
    
    if (boxWasInitiallyLocked) {
        box.unlock();
    }
  
    try {
        return body();
    }
    finally {
        if (boxWasInitiallyLocked) {
            box.lock();
        }
    }
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised: " + e);
}

console.log(box.locked);
// → true