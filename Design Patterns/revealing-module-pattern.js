let myRevealingModule = (function() {

	let privateVar = "Internal Variable";
	let publicVar = "Hello!";

	function privateFunction() {
		console.log(`${publicVar} ${privateVar}`);
	}

	function publicSetName(strName) {
		privateVar = strName;
	}

	function publicGetName() {
		privateFunction();
	}

	return {
		setName: publicSetName,
		greeting: publicVar,
		getName: publicGetName
	};

})();

myRevealingModule.setName("Hector");
myRevealingModule.getName();
console.log(myRevealingModule.greeting);

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
myRevealingModuleCounter.start();
console.log(myRevealingModuleCounter.count());	// 2
myRevealingModuleCounter.reset();
console.log(myRevealingModuleCounter.count());	// 0