//	Observer Pattern: Object (subject) mantains a list of objects depending on it (observers), automatically notifying them any changes of state
function ObserverList() {
	this.observerList = [];
}

//	Add an Observer
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

//	Remove an observer from the list
ObserverList.prototype.remove = function(index) {
	this.ObserverList.splice(index, 1);
};