//	Creates new objects, returns objects intializaed values copied from a prototype or a sample object.
/*Example 1*/
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

/*Example 2*/
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