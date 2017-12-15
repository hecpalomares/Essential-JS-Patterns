//	Class
class ClassCar {
	drive() {
		console.log('Driving as a class');
		return '';
	}
}

const car1 = new ClassCar();
console.log(car1.drive());

console.log(typeof ClassCar);	// function, es6 classes are sugarcoated constructor functions

// Constructor
function ConstructorCar() {}

ConstructorCar.prototype.drive = function() {
	console.log('Driving as a constructor');
	return '';
};

const car2 = new ConstructorCar();
console.log(car2.drive());

// 	Factory: any function can create new objects. When it’s not a constructor function, i
//	it's called a factory function.
const proto = {
	drive() {
		console.log('Driving as a factory');
		return '';
	}
};

function factoryCar() {
	return Object.create(proto);
}

const car3 = factoryCar();
console.log(car3.drive());

// Factories are more flexible. Multiple design patterns fit the logic of it. 

// Classes have conveient syntax, but leads users to Class Inheritance. Can't upgrade to Factory Functions,
// since 'new' keywords do not work on Factories.