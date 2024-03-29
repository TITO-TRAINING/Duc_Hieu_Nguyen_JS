
const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];


function buildGraph(edges) {


    let graph = Object.create(null);

    function addEdge(from, to) {
 
        if (graph[from] == null) {
            graph[from] = [to];
        } 
        else {
            graph[from].push(to);
        }
    }

    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
}


const roadGraph = buildGraph(roads);

function randomPick(array) {
    /*
     * Return a randomly selected element from a given `array`.
     */
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function findRoute(graph, from, to) {

    let work = [{at: from, route: []}];

    for (let i = 0; i < work.length; i++) {
        // The search operates by taking the next item in the `work` list.
        let {at, route} =  work[i];

        for (let place of graph[at]) {
            // If one of them is the goal, a finished route can be returned. 
            if (place == to) {
                return route.concat(place);
            }

            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

// End of Utilitarian Code


// VillageState Class

class VillageState {

    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {

        if (!roadGraph[this.place].includes(destination)) {
            return this;
        }

        else {

            let parcels = this.parcels.map(p => {
                if (p.place != this.place) {
                    return p;
                }

                return { 
                    place: destination, 
                    address: p.address
                };
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

VillageState.random = function(parcelCount = 5) {

    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;  // Still needs to be initialized.
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);

        parcels.push({place, address});
    }

    return new VillageState("Post Office", parcels);
};

// End of VillageState Class


// Demonstration that the above code is behaving in an expected manner.
let first = new VillageState(
    "Post Office", 
    [{place: "Post Office", address: "Alice's House"}]
);

let next = first.move("Alice's House");

// A matching result would mean:
// The robot is correctly simulating movement to a new place.
console.log(next.place);
// → Alice's House

// The robot is correctly simulating delivery of parcels to their
// specified address.
console.log(next.parcels);
// → []

// The move() function does not modify/mutate the original state i.e.,
// it continues to be pure.
console.log(first.place);
// → Post Office

// MAIN EXECUTABLE FUNCTION

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {

        // A series of print statements for debugging purposes.
        console.log(`On turn ${turn} at ${state.place}:\n\nParcels:`);
        for (let parcel of state.parcels) {
            let {place:pickup, address} = parcel;
            console.log(`Parcel ${state.parcels.indexOf(parcel) + 1}: from ${pickup} to ${address}`)
        }
        console.log('\n');

        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Action: Moved to ${action.direction}\n`);
    }
}


// Implementation of randomRobot

function randomRobot(state) {
    
    return {direction: randomPick(roadGraph[state.place])};
}

// End of Implementation of randomRobot


// SIMULATION of RandomRobot

runRobot(VillageState.random(), randomRobot);


// End of SIMULATION of RandomRobot


// Implementation of routeRobot

// One possible route which covers every place in Meadowfield.
const mailRoute = [
    "Alice's House", "Cabin",         "Alice's House", "Bob's House",
    "Town Hall",     "Daria's House", "Ernie's House",
    "Grete's House", "Shop",          "Grete's House", "Farm", 
    "Marketplace",   "Post Office"
];

function routeRobot(state, memory) {
    
    if (memory.length == 0) {
        memory = mailRoute;
    }

    return {
        direction: memory[0],
           memory: memory.slice(1)
    };
}

// End of Implementation of routeRobot


// SIMULATION of routeRobot

runRobot(VillageState.random(), routeRobot, []);

// End of SIMULATION of routeRobot


// Implementation of goalOrientedRobot

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        console.log("Decision: Robot decides on a new route.\n");

        let parcel = parcels[0];

        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
            console.log(`Route to PICK UP Parcel 1 at ${parcel.place}: ${route}`);
        }
        else {
            route = findRoute(roadGraph, place, parcel.address);
            console.log(`Route to DELIVER Parcel 1 to ${parcel.address}: ${route}`);
        }
    } else {
        console.log("Decision: Robot continues to move in the already decided route");
    }

    return {
        direction: route[0],
        memory: route.slice(1)
    }
}

// End of Implementation of goalOrientedRobot


// SIMULATION of goalOrientedRobot

runRobot(VillageState.random(), goalOrientedRobot, []);

// End of SIMULATION of goalOrientedRobot