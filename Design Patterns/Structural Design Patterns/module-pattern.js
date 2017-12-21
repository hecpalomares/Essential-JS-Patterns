/* Module Pattern */
//	Provide both private and public encapsulation. At JS used to emulate the concept of classes.
//	Classes (include public/private methods and variables inside a single object)

// Example 1: general template
let myNameSpace = (function() {
	let myPrivateVar, myPrivateMethod;

	//	A private counter variable
	myPrivateVar = 0;

	//	A private function which logs an argument
	myPrivateMethod = function(foo) {
		console.log(foo);
		console.log(myPrivateVar);
	};

	return {
		myPublicVar: "foo",

		myPublicFunction: function (bar) {

			//	Increment our private counter
			myPrivateVar++;

			//	Call out private method using bar argument
			myPrivateMethod(bar);
		}
	};
})();

/*myNameSpace.myPublicFunction("Increment Counter");
myNameSpace.myPublicFunction("Increment Counter");
myNameSpace.myPublicFunction("Increment Counter");
myNameSpace.myPublicFunction("Increment Counter");
*/

// Private functions and private variables can only be consumed inside our module. 
// As they aren't exposed to the rest of the page (only our exported API is), they're considered truly private.
// Functions are declared and named, easier to show call stacks in a debugger to discover what functions are throwing exceptions.

// Example 2: basket with private and public functions
var basketModule = (function() {
	// Private variables
	let basket = [];

	function doSomethingPrivate() {
		return console.log('Something Private');
  }
 
  function doSomethingElsePrivate() {
  	// Something Private 2
  }

  // Return an object exposed to the public
  return {
  	//	Add the items to our basket
  	addItem: function (values) {
  		basket.push(values);
  	},
  	//	Get the count of items in the basket
  	getItemCount: function() {
  		return basket.length;
  	},
  	//	Reset item basket
  	resetBasket: function() {
  		basket.length = 0;
  	},
  	// Public alias to a private function
  	doSomethingPublic: doSomethingPrivate,

  	// Get the total value of items in the basket
  	getTotal: function() {
  		var q = this.getItemCount();
  		var p = 0;
 
      while (q--) {
        p += basket[q].price;
      }
 
      return `$${p}`;
  	}
  };
})();

basketModule.addItem({
	item: "bread",
	price: 3.5
});

basketModule.addItem({
	item: "cheese",
	price: 5.5
});

basketModule.addItem({
	item: "milk",
	price: 1.5
});

console.log(basketModule.getItemCount()); // 3
console.log(basketModule.getTotal()); // $10.5
basketModule.doSomethingPublic();	

// Outputs: undefined
// The basket itself is not exposed as part of out public API
console.log(basketModule.basket);

// Outputs: undefined
// Only exist on the basketModule closure, not returned at out public API
// console.log(basket);

/*A&D*/
// Advantages: Cleaner code for developers from OO background. Private data only interacts inside the module.
// Disadvantages: Mantain both public and private properties (variables and functions). Inability to create autoamted unit tests for private members.