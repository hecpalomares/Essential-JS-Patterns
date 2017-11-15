//	Similar to module pattern, instead of just returning the actual public functions you return public methods as pointers to private methods.
let myRevealingModule = (function() {

	let privateVarName = "[Placeholder of a name]";
	let publicVarGreetting = "Hello!";

	function privateFunction() {
		console.log(`${privateVarName}`);
	}

	function publicSetName(strName) {
		privateVarName = strName;
	}

	function publicGetName() {
		privateFunction();
	}

	function publicGreetingName() {
		console.log(`${publicVarGreetting} ${privateVarName}`);
	}

	return {
		setName: publicSetName,
		getName: publicGetName,
		greeting: publicVarGreetting,
		greetingName: publicGreetingName
	};

})();

myRevealingModule.setName("Hector");	
console.log(myRevealingModule.greeting);	// Hello!
myRevealingModule.greetingName(); // Hello! Hector

let myRevealingModuleCounter = (function () {
	let privateCounter = 0;

	function privateFunction() {
		privateCounter++;
	}
 
	function publicFunction() {
		publicIncrement();
	}

	function publicIncrement() {
		privateFunction();
	}

	function publicSetReset() {
		privateCounter = 0;
	}

	function publicGetCount() {
		return privateCounter;
	}

	//	Reveal public pointers to private functions and properties
	return {
		start: publicFunction,
		publicIncrement: publicIncrement,
		count: publicGetCount,
		reset: publicSetReset
	};

})();

console.log(myRevealingModuleCounter.privateCounter); // undefined, not exposed
myRevealingModuleCounter.start();
myRevealingModuleCounter.publicIncrement();
console.log(myRevealingModuleCounter.count());	// 2
myRevealingModuleCounter.reset();
console.log(myRevealingModuleCounter.count());	// 0

/*A&D*/
// Advantages: Syntax more consistent. More clear at the end of the module which of our functions and variables may be acceesed publicly. (Readablity).
// Disadvantages: Modules are more fragile, since overriding or patching public methods reffering to private methods (behaivor).

let revealingModulePattern = (function(){
  
  // Private vars and functions
  let _welcome = "Welcome";
  
  var _getWelcome = function(){
    return _welcome;
  };
  
  var welcomeSomeone = function(name){
    console.log(_getWelcome() + " " + name);
  };
  
  // Public vars and functions
  return {
    sayWelcome: welcomeSomeone
  };
})();

revealingModulePattern.sayWelcome("Jimmy");

// Trying to override/patch sayWelcome doesn't work since welcomeSomeone is refrencing a private function (_getWelcome)

revealingModulePattern.sayWelcome = function(name){
  console.log(_getWelcome() + " to the store! " + name);
};

revealingModulePattern.sayWelcome("Ted");