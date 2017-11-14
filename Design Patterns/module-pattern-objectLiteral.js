/* Object Literal Notation */
let myModule = {
	myProperty: "some value",

	//	define another object inside myModule
	myConfig: {
		useCaching: true,
		languague: "en"
	},

	//	define a very basic method
	saySomething: function() {
		console.log("Do you want some Mac&Cheese?");
	},

	// output a value considering a current configuration
	reportMyConfig: function() {
		console.log(`Caching is: ${this.myConfig.useCaching ? "enabled" : "disabled"}`);
	},

	//	override a value based on the current configuration
	updateMyConfig: function(newConfig) {

		if(typeof newConfig === "object") {
			this.myConfig = newConfig;
		}
	}
};

myModule.saySomething();
myModule.reportMyConfig();
myModule.updateMyConfig({useCaching: false, languague: "es"});

myModule.reportMyConfig();