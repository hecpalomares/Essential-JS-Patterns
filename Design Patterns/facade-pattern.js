//	Facade Pattern: Provides an simplified interface, shich shields from complex functionality. "Hides Code".

//	Example 1: Listening to events crossbrowser. IE9 or lower needs attachEvent. Rest of browsers use addEventListener
var myEvent = function(el, ev, fn) {
	if(el.addEventListener) {
		el.addEventListener( ev, fn, false);
	}	else if(el.attachEvent) {			
		el.attachEvent("on" + ev, fn);
	} else {
		el["on" + ev] = fn;
	}
};

//	Example 2: Facade + Module Pattern. 
let myModule = (function() {
	let _privateObj = {
		get: function() {
			console.log(`Current value of ${this.i}`);
		},
		set: function(val) {
			this.i = val;
		},
		run: function() {
			console.log("running");
		},
		jump: function() {
			console.log("jumping");
		}
	};

	return {
		facade: function(args) {
			_privateObj.set(args.val);
			_privateObj.get();
			if(args.run) {
				_privateObj.run();
			}
			if(args.jump) {
				_privateObj.jump();
			}
		}
	};

}());

myModule.facade({run: true, jump: true, val: 10});

/*A&D*/
// Advantages: Easier to consume, it is a well designed API. You can avoid pitfalls of missing arguments by facading with returning objects. Self-documenting as well.
// Disadvantages: Performances. The cost of abstraction can cost extra calls in a upper abstraction level.
