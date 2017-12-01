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