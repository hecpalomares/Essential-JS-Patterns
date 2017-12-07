//	Abstract Factory Pattern: Encapsulate a group of individual factories with a common goal
//	Used when needs to work with multiple types of objects
//	Implement only classes that fulfill the same contract (line 34)

//	Constructor for defining new cars
function Car(options) {
	// Defaults
	this.doors = options.doors || 4;
	this.state = options.state || "new";
	this.color = options.color || "black";
}

// Constructor for defining new trucks
function Truck(options) {
	// Defaults
	this.state = options.state || "used";
	this.wheelsize = options.wheelsize || "large";
	this.color = options.color || "white"; 
}

let abstractVehicleFactory = (function() {
	
	// Storage for our vehicle types
	let types = {};

	return {
		getVehicle: function(type, customizations) {
			var Vehicle = types[type];
			return (Vehicle ? new Vehicle(customizations) : null);
		},
		registerVehicle: function(type, Vehicle) {
			let proto = Vehicle.prototype;

			//	register classes that fulfill the vehicle (either Car or Truck)
			if(proto.drive && proto.breakDown) {
      	types[type] = Vehicle;
      }
      return abstractVehicleFactory;
		}
	};
})();

Car.prototype.drive = function() {
	return console.log("I'm a car and I'm driving");
}

Car.prototype.breakDown = function() {
	return console.log("I'm breakdown, please repair at nearest car shop");
}

Truck.prototype.drive = function() {
	return console.log("I'm a truck and I'm driving");
}

Truck.prototype.breakDown = function() {
	return console.log("I'm breakdown, please repair at nearest truck shop");
}

abstractVehicleFactory.registerVehicle( "car", Car);
abstractVehicleFactory.registerVehicle( "truck", Truck);

// Instantiate a new car based on the abstract vehicle type
var redCar = abstractVehicleFactory.getVehicle( "car", {color: "red", state: "brand-new"});

// Instantiate a new truck based on the abstract vehicle type
var blueTruck = abstractVehicleFactory.getVehicle( "truck", {color: "blue", state: "old"});

console.log(redCar);
console.log(blueTruck);

console.log(redCar.drive());
console.log(redCar.breakDown());
console.log(blueTruck.drive());
console.log(blueTruck.breakDown());