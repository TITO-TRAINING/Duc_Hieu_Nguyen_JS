//Vector 

class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    minus(other) {
        let otherX = this.x - other.x 
        let otherY = this.y - other.y 

        return new Vector(otherX, otherY)
    }

    plus(other) {
        let otherX = this.x + other.x 
        let otherY = this.y + other.y 
        
        return new Vector(otherX, otherY)
    }

    get length() {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }
}

// console.log(new Vector(1, 2).plus(new Vector(2, 3)))
// console.log(new Vector(3, 4).length)

//

class Group {
    constructor() {
        this.group = []
    }

    add(value) {
        if(!this.has(value)) {
            this.group.push(value)
        }
    }

    delete(value) {
        if(this.has(value)) {
            this.group.splice(this.group.indexOf(value), 1)
        }
    }

    has(value) {
        for(let element of this.group) {
            if ( element === value) {
                return true
            }
        }

        return false
    }

    static from(list) {
        let group = new Group()
        for (let element of list) {
            group.add(element)
        }
        
        return group
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

//