let Subject = function() {
	observers = [];

	function subscribeObserver(observer) {
		observers.push(observer);
	}

	function unsubscribeObserver(observer) {
		let index = observers.indexOf(observer);
		if(index > -1) {
			observers.splice(index, 1);
		}
	}

	function notifyObserver(observer) {
		let index = observers.indexOf(observer);
		if(index > -1) {
			observers[index].notify(index);
		}
	}

	function notifyAllObservers() {
		for(let i = 0; i < observers.length;  i++) {
			observers[i].notify(i);
		}
	}

	return {
		addObs: subscribeObserver,
		removeObs: unsubscribeObserver,
		tellObs: notifyObserver,
		tellAllObs: notifyAllObservers
	};

};

let Observer = function() {
	return {
		notify: function(index) {
			console.log(`Observer ${index + 1} is notified.`);
		}
	};
}

let subject = new Subject();

let observer1 = new Observer();
let observer2 = new Observer();
let observer3 = new Observer();
let observer4 = new Observer();

subject.addObs(observer1);
subject.addObs(observer2);
subject.addObs(observer3);
subject.addObs(observer4);

subject.tellObs(observer2);

subject.tellAllObs();

// Event managment in AngularJS use observe pattern. 'watchers' watch variables, functions, and objects.