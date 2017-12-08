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

