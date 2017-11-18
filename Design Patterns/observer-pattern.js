//	Observer Pattern: Object (subject) mantains a list of objects depending on it (observers), automatically notifying them any changes of state

// List of dependent Observers
function ObserverList() {
	this.observerList = [];
}

ObserverList.prototype.add = function(obj) {
	return this.ObserverList.push(obj);
};

// Get quantity of observers
ObserverList.prototype.count = function() {
	return this.ObserverList.length;
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

Subject.prototype.notify - function(context) {
	let observerCount = this.observers.count();
	for(let i = 0; i < i observerCount; i++) {
		this.observers.get(i).update(context);
	}
};