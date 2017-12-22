//	Singleton Pattern: Restricts instantiation of a class to a single object.

// Examples: Singleton templates, a GoodSingleton and a BadSingleton.
let mySingleton = (function () {
	//	Instance stores a reference to the Singleton
	let instance;

	function init() {

		// Singleton private properties
		function privateMethod() {
			console.log("I am a private method");
		}

		let privateVariable = "Im also a priavte variable";
		let privateRandomNumber = Math.random();

		return {
			//Public methods and variables
			publicMethod: function() {
				console.log("The public can see me!");
			},
			
			publicProperty: "I am also public",
			
			getRandomNumber: function() {
				return privateRandomNumber;
			}

		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	};

}());

let myBadSingleton = (function () {
	//	Instance stores a reference to the Singleton
	let instance;

	function init() {

		// Singleton private properties
		let privateRandomNumber = Math.random();

		return {
			//Public methods and variables
			getRandomNumber: function() {
				return privateRandomNumber;
			}
		};
	}

	return {
		getInstance: function () {
			//	Always create a new Singleton instance
			instance = init();
			return instance;
		}
	};

}());

let singleA = mySingleton.getInstance();
let singleB = mySingleton.getInstance();

console.log(singleA.getRandomNumber() === singleB.getRandomNumber());	// true, both are the same instance!

let badSingleA = myBadSingleton.getInstance();
let badSingleB = myBadSingleton.getInstance();

console.log(badSingleA.getRandomNumber() === badSingleB.getRandomNumber()); //	false, they are different instances!

// Example #2: Singleton with options

// Core Concept of the Singleton is the global access to the instance (through mySingleton.getInstance())
let SingletonTester = (function () {
	
	// options: an object containing configuration options for the singleton
	function Singleton(options) {
		options = options || {};
		this.name = "SingletonTester";
		this.pointX = options.pointX || 6;
		this.pointY = options.pointY || 8;
	}

	let instance;

	let _static = {
		name: "SingletonTester",
		//	Method for getting an instance. It returns a singleton instance of a singleton object
		getInstance: function( options ) {
      if( instance === undefined ) {
        instance = new Singleton( options );
      }
      return instance;
    }
  };

  return _static;

}());

let singletonTest1 = SingletonTester.getInstance({pointX: 5, pointY: 3});
let singletonTest2 = SingletonTester.getInstance({pointX: 1, pointY: 7});
 
console.log(singletonTest1.pointX, singletonTest1.pointY);	// 5 3, instance set to 5 3
console.log(singletonTest2.pointX, singletonTest2.pointY);	// 5 3, instance already set by SingletonTest1 to 5 3

// Example #3: Singleton to a printer connection. Only allows for a single instantiation, but many instances of the same object.
// Step 1 > Declare a single instance (line 124)
// Step 2 > Declare constructor, methods and variables needed (line 126+)
// Step 3 > Check if there is some instance already declare to return, if not create a new instance and return it (line 133+)

let PrinterSingleton = (function () {
	
	let printerInstance;

	function Printer(options = {}) {
		this.name = options.name;
		this.model = options.model;
		this.place = options.place;
	}

	return {
		getInstance: function(options) {
			if(printerInstance === undefined) {
				printerInstance = new Printer(options);
			}
			return printerInstance;
		}
	};

})();

let printer1 = PrinterSingleton.getInstance({name: "Printer-Coffee-Shop-1", model: "HP1670", place: "Coffee-Shop-Winterfell"});
let printer2 = PrinterSingleton.getInstance({name: "Printer-Coffee-Shop-2", model: "HP9900", place: "Office-Kingslanding"});

console.log(printer1 === printer2);	// true, printer2 is the same instance as printer1

/*A&D*/
// Advantages: Modules will use this function exactly the same way. Force to be onlu onw instance of this class.
// Disadvantages: Tight coupling, singleton logic is overly spread among multiple parts of the codebase.
// Users: Logging Service ModA, ModB, ModC use the same intance of ModLog. Database connection.