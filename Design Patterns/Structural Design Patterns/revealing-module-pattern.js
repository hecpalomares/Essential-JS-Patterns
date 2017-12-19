//	Similar to module pattern, instead of just returning the actual public functions you return public methods as pointers to private methods.

// Example 1: general template, with function declarations
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

// Example 2: revealing module counter with function declarations
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

// Example 3: revealing module pattern with function expressions

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

// Example 4: myPhotosCollection with function expressions
/*
  1st Step: The IIFE (line 121) creates a closure protecting my private variables _photos and methods getPhotosByTheme(), addPhotoNotDuplicated()
  2nd Step: The return (line 136) reveals certain variables and methods returned in an object literal
*/

let myPhotosCollection = (function() {
  let _photos = ["myPhotoVacations1.png", "myPhotoWork1.png", "myPhotoVacations2.png", "myPhotoVacations3.png", "myPhotoWork2.png"];

  function getPhotosByTheme(theme) {
    let myPhotos = _photos.filter(photo => photo.includes(theme));
    return myPhotos;
  }

  function addPhotoNotDuplicated(photoName) {
    if(_photos.indexOf(photoName) > -1) {
      return;
    } else {
      _photos.push(photoName);  
    }
  }

  return {
    getPhotos: getPhotosByTheme,
    addPhoto: addPhotoNotDuplicated
  };

})();

console.log(myPhotosCollection._photos);    // undefined
console.log(myPhotosCollection.getPhotos("Work"));    // [ 'myPhotoWork1.png', 'myPhotoWork2.png' ]
myPhotosCollection.addPhoto("myPhotoVacations4.png");
myPhotosCollection.addPhoto("myPhotoVacations4.png");   // added once, since its duplicated
console.log(myPhotosCollection.getPhotos("Vacations")); // ['myPhotoVacations1.png', 'myPhotoVacations2.png', 'myPhotoVacations3.png', 'myPhotoVacations4.png']

/*A&D*/
// Advantages: Syntax more consistent. More clear at the end of the module which of our functions and variables may be acceesed publicly. (Readablity).
// Disadvantages: Modules are more fragile, since overriding or patching public methods reffering to private methods (behaivor).