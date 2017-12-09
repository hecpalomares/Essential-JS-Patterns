// Mixin Pattern

/*Sub-classing*/
//	Superclass A(Person) and Subclass B(SuperHero). All instances of B inherit the methods from A. B can define its own methods, and override the defined by A.
//	Superclass Person
let Person = function(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.gender = "male";
};

//	New instance of Person
let clark = new Person("Clark", "Kent");

//	subclass constructor called "Superhero"
let Superhero = function(firstName, lastName, powers) {
	
	// invoke superclass constructor on the new object, use .call() to invoke constructor as a method of the object to be initialized (Superhero)
	Person.call(this, firstName, lastName);

	//	store powers, a new array of traits (strings), not found in a normal "Person"
	this.powers = powers;
};

Superhero.prototype = Object.create(Person.prototype);

let superman = new Superhero("Clark", "Kent", ["flight", "superpower"]); 
console.log(superman); // Person { firstName: 'Clark', lastName: 'Kent', gender: 'male', powers: [ 'flight', 'superpower' ] }

// Superhero constructor creates an object which descends from Person. Have the attributes, methods and default values et in Person. 
// Superhero can override any inherted values.

/*Mixins*/

// Simple Car Constructor
let Car = function(settings) {
	this.model = settings.model || "no model provided";
	this.color = settings.color || "no color provided";
	this.year = settings.year || "no year provided";
};

let Spaceship = function(settings) {
	this.builder = settings.builder || "no builder provided";
	this.tripulants = settings.tripulants || "no tripulants provided";
	this.cost = settings.cost || "no cost provided";
};

// Mixin with to inhert from
let Mixin = function() {};

Mixin.prototype = {
	driveForward: function() {
		console.log("Drive Forward");
	},
	driveBackward: function() {
		console.log("Drive Backward");
	},
	driveSideways: function() {
		console.log("Drive Sideways");
	},
	liftToSpace: function() {
		console.log("Lifting to Space!");
	}
};

function augment(receivingClass, givingClass) {
	// only provide certain methods
    if(arguments[2]) {
        for(let i = 2, len = arguments.length; i < len; i++) {
        	receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
        // provide all methods
    } else {
        for(let methodName in givingClass.prototype) {
 
            // check to make sure the receiving class doesn't have a method of the same name as the one currently being proccesed by the for loop
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
            	receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }

            // Alternatively (check prototype chain as well):
            if ( !receivingClass.prototype[methodName] ) {
            	receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
}

// Augment the Car constructor to include "driveForward" and "driveBackward" only
augment(Car, Mixin, "driveForward", "driveBackward");

//	Augment the Spaceship constructor to include all methods from our mixin
augment(Spaceship, Mixin);

// Create a new Car
let myOldCar = new Car({model: "Sonic", color: "grey"});

myOldCar.driveForward();	//	Drive Forward
myOldCar.driveBackward();	// 	Drive Backward
// myOldCar.driveSideways();	//	driveSideways not a function Undefined method, not included (line 90)

console.log(myOldCar);

// Create a new Spaceship
let mySpaceShip = new Spaceship({builder: "Nasa", tripulants: 4, cost: "500000"});

mySpaceShip.driveForward();		//	Drive Forward
mySpaceShip.driveSideways();	// 	Drive Sideways
mySpaceShip.liftToSpace();		// 	Lifting to space

console.log(mySpaceShip);

/*Advantages*/
// Decrease functional repetition and increasing function re-use in a system. Avoid duplication by mantaining shared functionality. 
/*Disadvantages*/
// Prototype pollution, uncerainty regarding the origin of our functions (large systems). Strong documentation can minimize this confusion.