//	Decorator Pattern: aim to promote code re-use. Alternative to sub-classing. [Wrapping one piece of code with another, similar to Functional Composition or HoF's].

// Example 1: Decorating Constructors With New Functionality
// Vehicle Constructor
function Vehicle(vehicleType) {
	// some defaults
	this.vehicleType = vehicleType || "car";
	this.model = "default";
	this.license = "555-6789";
}

// basic vehicle
let testInstance = new Vehicle("car");
console.log(testInstance); // Vehicle { vehicleType: 'car', model: 'default', license: '555-6789' }

// new instance of vehicle to be decorated
let truck = new Vehicle("truck");

// new functionality we are using to decorate
truck.setModel = function(modelName) {
	this.model = modelName;
};

truck.setColor = function(colorName) {
	this.color = colorName;
};

truck.setLicense = function(licenseNumber) {
	this.license = licenseNumber;
};

truck.setModel("VOLVO");
truck.setColor("Red");
truck.setLicense("123-4567");

console.log(truck); // Vehicle { vehicleType: 'truck', license: '123-4567', model: 'VOLVO', color: 'Red'}

let secondInstanceCar = new Vehicle("car");
console.log(secondInstanceCar); // Vehicle { vehicleType: 'car', model: 'default', license: '555-6789' }

// Example 2: Decorating Objects With Multiple Decorators

// Construtor to decorate
function MacBook() {
	this.cost = function() {
		return 1000;
	};
	this.screensize = function() {
		return 11.6;
	};
}

// Decorator 1
function memory(macbook) {
	let v = macbook.cost();
	macbook.cost = function() {
		return v + 100;
	};
}

// Decorator 2
function engraving(macbook) {
	let v = macbook.cost();
	macbook.cost = function() {
		return v + 200;
	};
}

// Decorator 3
function insurance(macbook) {
	let v = macbook.cost();
	macbook.cost = function() {
		return v + 300;
	};
}

let myMacbook = new MacBook();
memory(myMacbook);
engraving(myMacbook);
insurance(myMacbook);

console.log(myMacbook.cost());					// 1600
console.log(myMacbook.screensize());		// 11.6

// Decorators are overriding the MacBook() superclass .cost() function. The function .screensize() remain unchanged and intact.

// Example 3
let User = function(name) {
	this.name = name;
	this.say = function() {
		log.add("User: " + this.name);
	};
}

let DecoratedUser = function(user, street, city) {
	this.user = user;
	this.name = user.name;	// ensures the same interface
	this.street = street;
	this.city = city;

	this.say = function() {
  	log.add(`Decorated User: ${this.name} ${this.street} ${this.city}`);
 	};
}

let log = (function() {
	let log = "";

	return {
		add: function(msg) {
			log+=msg+"\n";
		},
		show: function() {
			console.log(log);
			log = "";
		}
	};
})();

function run() {
	let myUser = new User("Mike");
	myUser.say();

	let decorated = new DecoratedUser(myUser, "5th Avenue", "California");
	decorated.say();

	log.show();
}

run();