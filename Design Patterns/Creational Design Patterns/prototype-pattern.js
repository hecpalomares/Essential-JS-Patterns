//	Creates new objects, returns objects intializaed values copied from a prototype or a sample object.
// Example 1
let myCar = {
	name: "Sonic Chevrolet",
	drive: function() {
		console.log("Driving");
	},
	panic: function() {
		console.log("Stop driving");
	}
};

//	Use Object.create to instantiate a new car
let yourCar1 = Object.create(myCar);

//	yourCar1 is a prototype(clone) of myCar
console.log(yourCar1.name);		// Sonic Chevrolet

let yourCar2 = Object.create(myCar);
yourCar2.name = "Mazda 6";
console.log(yourCar2.name);		// Mazda 6
console.log(yourCar1.name);  	// Sonic Chevrolet

// Example 2
//	Clones objects given a prototype object
function CustomerPrototype(proto) {
	this.proto = proto;

	this.clone = function() {
		let customer = new Customer();

		customer.firstName = proto.firstName;
		customer.lastName = proto.lastName;
		customer.status = proto.status;

		return customer;
	};
}

//	Cloned objects that are being created
function Customer(firstName, lastName, status) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.status = status;
 
	this.info = function () {
		console.log(`First name: ${this.firstName} | Last name: ${this.lastName} | Status: ${this.status}`)
	};
}

function run() {
	let alice = new Customer("Alice", "Smith", "VIP");
	let prototype = new CustomerPrototype(alice);
	let customer = prototype.clone();
	customer.info();
}

run();

// Example 3
function Book(title, author, genre, price, rating) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
    this.rating = rating;
};

//	Append getInfo and getPriceAfterTax to Book Prototype, but they are shared among all instances of myBook
Book.prototype = {
	getInfo: function() {
		return `The book ${this.title}, by ${this.author} is classified in the genre ${this.genre}. The price is $${this.price} and is currently rated with ${this.rating}.`;
	},
	getPriceAfterTax: function() {
		return "$"+(this.price * 1.0825).toFixed(2);
	},
	getMyOpinion: function() {
		return `I loved this book!`;
	}
};

let myFavoriteBook = new Book("Catcher in Rye", "J.D Salinger", "Fiction", 12.99, "5 stars");
console.log(myFavoriteBook.getInfo());
console.log(myFavoriteBook.getPriceAfterTax());	
console.log(myFavoriteBook.getMyOpinion());	// I loved this book!, not true

let myWorstBook = new Book("Losing My Virginity", "Ricahrd Branson", "Autobiography", 9.99, "3 stars");
console.log(myWorstBook.getMyOpinion());	// I loved this book!, not true

// Example 4: Creating Tree. Prototype as a object
/*
  1st step: Creating a base constructor, using es6 default parameters is recommended (line 95)
  2nd step: Modify the prototype of the Tree 'Class' (it is a function, since classes are functions in JS) (line 102+)
*/
let Tree = function(type = "Pine", size = "medium", age = 4, price = 25.00) {
	this.type = type;
	this.size = size;
	this.age = age;
	this.price = price;
}

Tree.prototype = {
	calculateAge: function() {
		return `Your ${this.type.toLowerCase()} is ${this.age} years old`;
	},
	calculatePrice: function(discount = 0) {
		if (discount !== 0) {
			this.price = this.price * (discount/100);
		}
		return `Your total would be $${this.price.toFixed(2)}`;
	},
	changeSize: function(size) {
		this.size = size;
	}
};


let myBonsai = new Tree("Bonsai", "small", undefined, 40.00);		

console.log(myBonsai); // { type: 'Bonsai', size: 'small', age: 4, price: 40 }
console.log(myBonsai.calculateAge()); // Your bonsai is 4 years old
console.log(myBonsai.calculatePrice()); //  Your total would be $40.00
console.log(myBonsai.calculatePrice(50)); // Your total would be $20.00
myBonsai.changeSize("medium");
console.log(myBonsai);		// { type: 'Bonsai', size: 'medium', age: 4, price: 20 }

let myPine = new Tree();
console.log(myPine);

// Example 5: Creating Schools + revealing module Pattern. Prototype as a function returning an object
let School = function(name, level, state, alumni) {
	this.name = name;
	this.level = level;
	this.state = state;
	this.alumni = alumni;
}

School.prototype = function() {
	
	let _getName = function() {
		return `The name of this school is ${this.name}.`
	};

	let _getLevel = function() {
		return `This maximum level of education for ${this.name} is ${this.level}.`
	};

	let _getState = function() {
		return `This school is located at ${this.state}.`;
	};

	let _getAlumni = function() {
		return `Number of alumni enrolled is ${this.alumni}.`;
	};

	let _increaseNumberAlumni = function() {
		this.alumni++;
	};

	return {
 		getName: _getName,
	 	getLevel: _getLevel,
	 	getState: _getState,
		getAlumni: _getAlumni,
		addAlumni: _increaseNumberAlumni
	};

}();

let mySchool = new School("Kennedy", "Primary School", "Nuevo Leon", 200);

console.log(mySchool);
mySchool.addAlumni();
console.log(mySchool.getAlumni());