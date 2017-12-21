//	Observer Pattern: Object (subject) mantains a list of objects depending on it (observers), automatically notifying them any changes of state
(function() {

	// List of dependent Observers
	function ObserverList() {
		this.observerList = [];
	}

	ObserverList.prototype.add = function(obj) {
		return this.observerList.push(obj);
	};

	// Get quantity of observers
	ObserverList.prototype.count = function() {
		return this.observerList.length;
	};

	// Get the list of the observers
	ObserverList.prototype.get = function(index) {
		if(index > -1 && index < this.observerList.length) {
			return this.observerList[index];
		}
	};

	//	Get the index of an Observer
	ObserverList.prototype.indexOf = function(obj, startIndex){
	  var i = startIndex;
	 
	  while( i < this.observerList.length ){
	    if( this.observerList[i] === obj ){
	      return i;
	    }
	    i++;
	  }
	 
	  return -1;
	};

	ObserverList.prototype.remove = function(index) {
		this.ObserverList.splice(index, 1);
	};

	// Subject with the ability to add, remove or notify observers on the observer list
	function Subject() {
		this.observers = new ObserverList();
	};

	//	Add an Observer
	Subject.prototype.addObserver = function(observer) {
		this.observers.add(observer);
	};

	//	Remove an observer from the list
	Subject.prototype.removeObserver = function(observer) {
		this.observers.removeAt(this.observers.indexOf(observer, 0));
	};

	Subject.prototype.notify = function(context) {
		let observerCount = this.observers.count();
		for(let i = 0; i < observerCount; i++) {
			this.observers.get(i).update(context);
		}
	};

	function Observer(){
  	this.update = function(){
  		// Empty function to be overriden later
  	};
	}

	// Extend an object with an extension
	function extend(obj, extension) {
		for(var key in extension){
			obj[key] = extension[key];
		}
	}

	// References to our DOM elements
	let controlCheckbox = document.querySelector('#mainCheckbox');
	let addBtn = document.querySelector('#addNewObserver');
	let container = document.querySelector('#observersContainer');

	// Concrete Subject
	// Extend the controlling checkbox with the Subject Class
	extend(controlCheckbox, new Subject());

	// Clicking the checkbox will trigger notificaions to its observers
	controlCheckbox.onclick = function() {
		controlCheckbox.notify(controlCheckbox.checked);
	};

	addBtn.onclick = addNewObserver;
	
	// Concrete Observer
	function addNewObserver() {
		let check = document.createElement("input");
		check.type = "checkbox";

		// Extend the checkbox with the Observer Class
		extend(check, new Observer());

		// Override with custom update behaivor
		check.update = function(value) {
			this.checked = value;
		};

		// Add the new observer to our list of observers, for our main subject
		controlCheckbox.addObserver(check);

		container.appendChild(check);
	}

}());