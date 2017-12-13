//	Pseudo-classical Decorators: Transparently wrap objects inside other objects of the same interface.
//	Interfaces: Way of defining the methods of an object should have. They're self-documenting and promote reusability.

//	Example #1: Implementation of interfaces

/**Code copyright Dustin Diaz and Ross Harmes, Pro JavaScript Design Patterns.**/
// Constructor.
let Interface = function (name, methods) {
  if (arguments.length != 2) {
      throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
  }
  this.name = name;
  this.methods = [];
  for (var i = 0, len = methods.length; i < len; i++) {
      if (typeof methods[i] !== 'string') {
          throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
      }
      this.methods.push(methods[i]);
  }
};

// Static class method.
Interface.ensureImplements = function (object) {
  if (arguments.length < 2) {
      throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
  }
  for (var i = 1, len = arguments.length; i < len; i++) {
      var interface = arguments[i];
      if (interface.constructor !== Interface) {
          throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");
      }
      for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
          var method = interface.methods[j];
          if (!object[method] || typeof object[method] !== 'function') {
              throw new Error("Function Interface.ensureImplements: object " + "does not implement the " + interface.name + " interface. Method " + method + " was not found.");
          }
      }
  }
};

let reminder = new Interface("List", ["summary", "placeOrder"]);

let properties = {
	name: "List #1",
	date: "12/12/2017",
	actions: {
		summary: function() {
			return "Remember to buy milk, we are almost out of it";
		},
		placeOrder: function() {
			return "We are getting some milk";
		}
	}
};


//	Create a constructor implementing the above properties and methods
function Todo(config) {
	Interface.ensureImplements(config.actions, reminder);
	this.name = config.name;
	this.methods = config.actions
}

//	Create an new instance using the Todo Constructor
let todoItem = new Todo(properties);

console.log(todoItem.name);
console.log(todoItem.methods.summary());
console.log(todoItem.methods.placeOrder());


/*Todo Example #2*/

/* Advantages*/
//	Objects can be wrapped or "decorated", without worrying the base object is modified. This patterns also avoids us needthing a large number of subclasses.

/* Disadvantages */
//	Poorrly managed can increase complexity. Introduces many small (but similar objects) into the same namespace.