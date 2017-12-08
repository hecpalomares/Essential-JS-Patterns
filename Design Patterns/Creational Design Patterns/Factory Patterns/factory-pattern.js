//	Factory create objects without the constructor. It provides a generic interface for creating objects.
//	Simple explanation: Factories are functions that create and return objects.

//	Constructor for defining new cars
function Car(options) {
	// Defaults
	this.doors = options.doors || 4;
	this.state = options.state || "New";
	this.color = options.color || "Black";
}

// Constructor for defining new trucks
function Truck(options) {
	this.state = options.state || "used";
	this.wheelsize = options.wheelsize || "large";
	this.color = options.color || "blue"; 
}

//	FactoryExample.js

// Define skeleton of vehicle factory
function VehicleFactory() {}

//	Define prototypes and utilities for this factory

//	Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

//	Our factory method for creating a new Vehicle instance
VehicleFactory.prototype.createVehicle = function(options) {
	
	switch(options.vehicleType){
		case "car":
			this.vehicleClass = Car;
			break;
		case "truck":
			this.vehicleClass = Truck;
			break;
	}

	return new this.vehicleClass(options);

};

let carFactory = new VehicleFactory();

let myCar = carFactory.createVehicle({vehicleType: "car", color: "yellow", doors: 6}); // Using default 'state'
let myCar2 = carFactory.createVehicle({color: "red"});	// Using default 'doors', and 'state'. Falling to default vehicleClass = Car (line 26)

console.log(myCar instanceof Car); // true (line 33)
console.log(myCar2 instanceof Car);  // true (line 26)
console.log(myCar);
console.log(myCar2);

/*Approach #1: Modify a VehicleFactory instance to use Truck Class using a options parameter, in this case vehicleType*/

let myTruck = carFactory.createVehicle({vehicleType: "truck", color: "red", wheelsize: "small"});
console.log(myTruck instanceof Truck);	// true (line 36)
console.log(myTruck);

/*Approach #2: Subclass VehicleFactory to create a factory class that builds Trucks*/

function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

let truckFactory = new TruckFactory();
let myTruck2 = truckFactory.createVehicle({state: "old and rusty", color: "white", wheelsize: "biiiiiig"});

console.log(myTruck2 instanceof Truck);	// true (line 65)
console.log(myTruck2);

/*Advantages*/
//	Our object or component setup involves a high complexlity. Generate different instances of objects depending the enviroment.
//	Working with small objects or components who share similar properties. If objects with instances to other objects are similar we can use it if they satisfy an API contract.

/*Disadvantages*/
//	Added unnecessarily complexity to the application. Due to is an abstraction of the object creation the unit testing can be a problem.