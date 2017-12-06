//	Command pattern: Encapsulate method invocation, requests or operations into a single object.
(function () {
	let carManager = {
		requestInfo: function(model, id) {
			return `The information for ${model} with ID ${id} is not available`;
		},
		buyVehicle: function(model, id) {
			return `You successfully purchased the item ${id}, a ${model}`;
		},
		arrangeViewing: function(model, id) {
			return `You booked a viewing of ${model}(${id})`;
		},
		calculateTax: function(model, price) {
			if(model === "Mazda") {
				price = price * 1.15;
			} else if (model === "Ford") {
				price = price * 1.05;			
			} else if (model === "Audi") {
				price = price * 1.20;			
			} else {
				price = price * 1.12;			
			}

			return `The price for ${model} after tax is $${price}`;
		}
	};

//	If the core API behind carManager changed; all objects accesing the methods (requestInfo, buyVehicle, arrangeView) will fail. This is not loosely coupling.
//	Solution, abstracting the API further: [execute method] accept any named methods, that can be performed by carManager object, along with any extra data needed for the methods.
carManager.execute = function (name) {
	return carManager[name] && carManager[name].apply(carManager, [].slice.call(arguments, 1));
};

console.log(carManager.execute("arrangeViewing", "Mazda", 112));
console.log(carManager.execute("buyVehicle", "Ford", 98));
console.log(carManager.execute("requestInfo", "Audi", 98));
console.log(carManager.execute("calculateTax", "Audi", 40000));
console.log(carManager.execute("newMethodNotAtCarManager", "Mazda", 45));	//	undefined
})();


/*Another Command Pattern example*/
(function() {
	function Basket() {
		this.myBasket = [];
	}

	Basket.prototype = {
		do: function(name) {
			//	getting the name of the function along with data needed for the methods
			let args = Array.prototype.slice.call(arguments, 1);
			let fnName = '_' + name;
			//	Verify it exist the methods that we are trying to 'do'(execute)
			if(this[fnName]){
				this[fnName].apply(this, args);
			}
		},
		//	Declaring the private methods
		_getMyBasket: function() {
			console.log(this.myBasket);
		},
		_add: function(item) {
			this.myBasket.push(item);
		},
		_remove: function(item) {
			this.myBasket.splice(this.myBasket.indexOf(item), 1);
		}
	};

	let b = new Basket;
	b.do("add", "apple");
	b.do("add", "eggs");
	b.do("add", "milks");

	b.do("getMyBasket");

	b.do("remove", "eggs");

	b.do("getMyBasket");

}());