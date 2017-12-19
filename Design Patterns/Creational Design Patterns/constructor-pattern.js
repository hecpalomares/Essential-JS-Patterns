//	Three common ways to create an empty object
let newObject = {}; // object literal
let newObjectSquare = Object.create(Object.prototype); // Using the Object.create method
let objectNumberThree = new Object(); // Using the object constructor

//	Four ways in which keys and values are assigned to the object
//	1. Dot syntax
newObject.myKey = "Dot value";	//	set property
let x = newObject.myKey;	//	get property

//	2. Square brackets notation
newObjectSquare["squareBracket"] = "Square Bracket Value";	//	set property
let y = newObjectSquare["squareBracket"];	//	get property

//	3.	Object.defineProperty
Object.defineProperty(objectNumberThree, "someKey", {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});

// 4. Object.defineProperties
Object.defineProperties(objectNumberFour, { 
  "x": {
    value: "My X writable",
    writable: true
  },
  "y": {
    value: "My Y not writable",
    writable: false
  }
});

//	Basic Constructor
//	Cons: Makes inheritance difficult, since Car will inherit toString() function always.
//	Functions toString() are redefined for each new object created using Car Constructor
function Car(model, year, miles) {
	this.model = model;
	this.year = year;
	this.miles = miles;

	this.toString = function () {
		return `${this.model} has done ${this.miles} miles`; 
	};
}

var patriot = new Car( "Jeep Patriot", 2010, 80000 );
var sonic = new Car( "Chevrolet Sonic", 2012, 60000 );

console.log(patriot.toString());
console.log(sonic.toString());

//	Prototype Constructor
//	Pros: Multiple Car objects can be created, they all access the same prototype (containing the toString() function)
function CarPrototype(model, year, miles) {
	this.model = model;
	this.year = year;
	this.miles = miles;
}

CarPrototype.prototype.toString = function () {
	return `${this.model} has done ${this.miles} miles`; 
};

var city = new Car( "Honda City", 2017, 15000 );
var sandero = new Car( "Renault Sandero", 2015, 40000 );

console.log(city.toString());
console.log(sandero.toString());

//  Javascript doesn't have classes, supports a special constructor that works with objects. Prefixing the invocation of a Constructor Function
//  with the keyword 'new', instantiate a new object. Inside the new object the keyword 'this' reference to the newly created Object.